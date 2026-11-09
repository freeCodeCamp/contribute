import { mount } from '@cloudflare/nimbus-docs/client';
import type {
  SearchProvider,
  SearchResult
} from '@cloudflare/nimbus-docs/types';
import { provider } from './providers/pagefind';

export interface SearchConfig {
  input: HTMLInputElement;
  resultsContainer: HTMLElement;
  emptyState: HTMLElement;
  provider: SearchProvider;
  onNavigate?: () => void;
}

export interface SearchInstance {
  reset(): Promise<void>;
  destroy(): void;
}

export function initSearch(config: SearchConfig): SearchInstance {
  const { input, resultsContainer, emptyState, provider, onNavigate } = config;

  let initialized = false;
  let activeIndex = -1;
  let resultIdCounter = 0;
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let activeController: AbortController | undefined;

  function getOptions(): HTMLElement[] {
    return Array.from(
      resultsContainer.querySelectorAll<HTMLElement>("[role='option']")
    );
  }

  function updateActive(newIndex: number): void {
    const options = getOptions();
    if (options.length === 0) {
      activeIndex = -1;
      input.removeAttribute('aria-activedescendant');
      return;
    }
    activeIndex = Math.max(-1, Math.min(newIndex, options.length - 1));
    options.forEach((option, index) => {
      if (index === activeIndex) {
        option.setAttribute('data-highlighted', '');
        option.scrollIntoView({ block: 'nearest' });
        input.setAttribute('aria-activedescendant', option.id);
      } else {
        option.removeAttribute('data-highlighted');
      }
    });
    if (activeIndex < 0) input.removeAttribute('aria-activedescendant');
  }

  function clearResults(): void {
    for (const result of resultsContainer.querySelectorAll("[role='option']"))
      result.remove();
    resultsContainer.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function resultOption(href: string, className: string): HTMLAnchorElement {
    const option = document.createElement('a');
    option.id = `search-result-${resultIdCounter++}`;
    option.setAttribute('role', 'option');
    option.tabIndex = -1;
    option.href = href;
    option.className = `block no-underline transition-colors hover:bg-accent data-[highlighted]:bg-accent data-[highlighted]:outline-2 data-[highlighted]:-outline-offset-2 data-[highlighted]:outline-ring ${className}`;
    option.addEventListener('click', () => onNavigate?.());
    return option;
  }

  function buildResult(result: SearchResult): HTMLElement[] {
    const page = resultOption(result.url, 'rounded-lg px-2 py-2');
    const title = document.createElement('span');
    title.className = 'block truncate text-base font-semibold text-foreground';
    title.textContent = result.title;
    page.appendChild(title);

    if (result.snippet) {
      const snippet = document.createElement('span');
      snippet.className =
        'mt-1 block line-clamp-2 text-sm text-muted-foreground';
      snippet.innerHTML = result.snippet;
      page.appendChild(snippet);
    }

    const sections = (result.subResults ?? []).slice(0, 3).map(sub => {
      const section = resultOption(
        sub.url,
        'ms-5 truncate border-s border-border py-1 ps-3 text-sm text-muted-foreground hover:text-foreground'
      );
      section.textContent = sub.title;
      section.setAttribute('aria-label', `${sub.title}, in ${result.title}`);
      return section;
    });

    return [page, ...sections];
  }

  async function ensureInitialized(): Promise<boolean> {
    if (initialized) return true;
    try {
      await provider.init?.();
      initialized = true;
      return true;
    } catch {
      emptyState.textContent = import.meta.env.DEV
        ? 'Search is available after a production build.'
        : 'Search could not load. Check your connection and reload the page. If it persists, ask the site owner to rebuild and deploy the search index.';
      return false;
    }
  }

  async function runSearch(query: string): Promise<void> {
    activeController?.abort();
    activeController = new AbortController();
    const signal = activeController.signal;

    emptyState.classList.remove('sr-only');
    emptyState.textContent = 'Searching…';
    clearResults();

    if (!(await ensureInitialized()) || signal.aborted) return;

    try {
      const results = await provider.search(query, { signal });
      if (signal.aborted) return;

      clearResults();
      activeIndex = -1;

      if (results.length === 0) {
        emptyState.classList.remove('sr-only');
        emptyState.textContent = 'No results found.';
        return;
      }

      emptyState.classList.add('sr-only');
      emptyState.textContent =
        results.length === 1 ? '1 result' : `${results.length} results`;
      input.setAttribute('aria-expanded', 'true');
      for (const result of results)
        resultsContainer.append(...buildResult(result));
      resultsContainer.hidden = false;
    } catch {
      if (signal.aborted) return;
      clearResults();
      emptyState.classList.remove('sr-only');
      emptyState.textContent = 'Search is temporarily unavailable.';
    }
  }

  function handleInput(): void {
    activeController?.abort();
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim();
      if (!query) {
        clearResults();
        emptyState.classList.remove('sr-only');
        emptyState.textContent = 'Type to search…';
        return;
      }
      void runSearch(query);
    }, 150);
  }

  function handleKeydown(event: KeyboardEvent): void {
    const options = getOptions();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      updateActive(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      updateActive(activeIndex - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      updateActive(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      updateActive(options.length - 1);
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      options[activeIndex]?.click();
    }
  }

  input.addEventListener('input', handleInput);
  input.addEventListener('keydown', handleKeydown);

  return {
    async reset() {
      activeController?.abort();
      if (debounceTimer) clearTimeout(debounceTimer);
      input.value = '';
      input.focus();
      activeIndex = -1;
      clearResults();
      emptyState.classList.remove('sr-only');
      emptyState.textContent = 'Type to search…';
      await ensureInitialized();
    },
    destroy() {
      activeController?.abort();
      if (debounceTimer) clearTimeout(debounceTimer);
      input.removeEventListener('input', handleInput);
      input.removeEventListener('keydown', handleKeydown);
    }
  };
}

// ---------------------------------------------------------------------------
// Bootstrap — imported for its side effects by SearchDialog.astro
// (`import "./search.client"`). Wires each dialog through mount() and binds the
// global open shortcut once.
// ---------------------------------------------------------------------------

type SearchDialogElement = HTMLDialogElement & {
  __openSearchDialog?: () => void;
};

function primaryDialog(): SearchDialogElement | null {
  return document.querySelector<SearchDialogElement>(
    '[data-search-dialog][data-search-ready]'
  );
}

let globalsBound = false;

function bindGlobals() {
  if (globalsBound) return;
  globalsBound = true;

  document.addEventListener('click', event => {
    const trigger = (event.target as Element | null)?.closest(
      '[data-search-trigger]'
    );
    if (!trigger) return;
    primaryDialog()?.__openSearchDialog?.();
  });

  document.addEventListener('keydown', event => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k')
      return;
    const dialog = primaryDialog();
    if (!dialog) return;
    event.preventDefault();
    if (dialog.open) dialog.close();
    else dialog.__openSearchDialog?.();
  });
}

// Per-element wiring: idempotent discovery now and on astro:page-load, teardown
// on astro:before-swap. Replaces the hand-rolled data-search-ready init loop;
// data-search-ready is now just the "wired" marker primaryDialog() selects on.
mount('[data-search-dialog]', root => {
  const dialog = root as SearchDialogElement;
  dialog.setAttribute('data-search-ready', 'true');

  const input = dialog.querySelector<HTMLInputElement>('[data-search-input]');
  const resultsContainer = dialog.querySelector<HTMLElement>(
    '[data-search-results]'
  );
  const emptyState = dialog.querySelector<HTMLElement>('[data-search-empty]');
  if (!input || !resultsContainer || !emptyState) return () => {};

  const search = initSearch({
    input,
    resultsContainer,
    emptyState,
    provider,
    onNavigate: () => dialog.close()
  });

  dialog.__openSearchDialog = () => {
    if (!dialog.open) dialog.showModal();
    void search.reset();
  };

  return () => search.destroy();
});

bindGlobals();
