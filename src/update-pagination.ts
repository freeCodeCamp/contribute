import { type CollectionEntry } from 'astro:content';

interface Section {
  title: keyof CollectionEntry<'i18n'>['data'];
  contents: {
    href: string;
    title: keyof CollectionEntry<'i18n'>['data'];
    strong?: boolean;
    external?: boolean;
  }[];
  addSeparator?: boolean;
}

interface Pagination {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}

export const content: Section[] = [
  {
    title: 'sidebar.introduction',
    contents: [
      { href: '/getting-started/', title: 'sidebar.gettingStarted' },
      { href: '/faq/', title: 'sidebar.faq' },
      { href: '/security/', title: 'sidebar.report_vulnerability' }
    ]
  },
  {
    title: 'sidebar.translation_contribution',
    contents: [
      {
        href: '/how-to-translate-files/',
        title: 'sidebar.translate_resources'
      },
      {
        href: '/how-to-proofread-files/',
        title: 'sidebar.proofread_translations'
      }
    ]
  },
  {
    title: 'sidebar.code_contribution',
    contents: [
      {
        href: '/how-to-setup-freecodecamp-locally/',
        title: 'sidebar.setup_freecodecamp'
      },
      { href: '/codebase-best-practices/', title: 'sidebar.best_practices' },
      {
        href: '/how-to-contribute-to-the-codebase/',
        title: 'sidebar.work_on_codebase'
      },
      {
        href: '/how-to-work-on-coding-challenges/',
        title: 'sidebar.work_on_coding_challenges'
      },
      {
        href: '/curriculum-help/',
        title: 'sidebar.use_the_curriculum_helpers'
      },
      {
        href: '/how-to-work-on-the-component-library/',
        title: 'sidebar.work_on_component_library'
      },
      {
        href: '/how-to-work-on-practice-projects/',
        title: 'sidebar.work_on_practice_projects'
      },
      {
        href: '/how-to-setup-freecodecamp-mobile-app-locally/',
        title: 'sidebar.work_on_mobile_app'
      },
      {
        href: '/how-to-work-on-tutorials-that-use-coderoad/',
        title: 'sidebar.coderoad'
      },
      {
        href: '/how-to-work-on-localized-client-webapp/',
        title: 'sidebar.work_on_webapp'
      },
      {
        href: '/how-to-add-playwright-tests/',
        title: 'sidebar.work_on_playwright_tests'
      },
      {
        href: '/how-to-help-with-video-challenges/',
        title: 'sidebar.work_on_video_challenges'
      },
      {
        href: '/how-to-work-on-the-docs-theme/',
        title: 'sidebar.work_on_documentation'
      },
      {
        href: '/how-to-open-a-pull-request/',
        title: 'sidebar.open_a_pull_request'
      }
    ]
  },
  {
    title: 'sidebar.additional_guides',
    contents: [
      { href: '/curriculum-file-structure/', title: 'sidebar.file_structure' },
      {
        href: '/how-to-catch-outgoing-emails-locally/',
        title: 'sidebar.debug_outgoing_emails_locally'
      },
      { href: '/how-to-setup-wsl/', title: 'sidebar.setup_fcc_on_wsl' },
      {
        href: '/how-to-use-docker-on-windows-home/',
        title: 'sidebar.docker_on_windows_home'
      },
      { href: '/user-token-workflow/', title: 'sidebar.user_token_workflow' },
      {
        href: '/troubleshooting-development-issues/',
        title: 'sidebar.troubleshooting_development_issues'
      },
      {
        href: '/authors-analytics-manual/',
        title: 'sidebar.authors_analytics_manual'
      }
    ]
  },
  {
    title: 'sidebar.flight_manuals',
    addSeparator: true,
    contents: [
      { href: '/moderator-handbook/', title: 'sidebar.moderator_handbook' },
      { href: '/reply-templates/', title: 'sidebar.reply_templates' },
      {
        href: '/language-lead-handbook/',
        title: 'sidebar.language_lead_handbook'
      },
      { href: '/devops/', title: 'sidebar.devops_handbook' },
      {
        href: '/courses-vscode-extension/',
        title: 'sidebar.courses_vscode_extension'
      },
      {
        href: '/how-to-enable-new-languages/',
        title: 'sidebar.enable_new_language'
      }
    ]
  },
  {
    title: 'sidebar.our_community',
    addSeparator: true,
    contents: [
      {
        href: 'https://github.com/freecodecamp/freecodecamp',
        title: 'sidebar.github',
        strong: true,
        external: true
      },
      {
        href: 'https://freecodecamp.org/forum/c/contributors',
        title: 'sidebar.discourse_forum',
        strong: true,
        external: true
      },
      {
        href: 'https://discord.gg/PRyKn3Vbay',
        title: 'sidebar.chat_server',
        strong: true,
        external: true
      }
    ]
  }
];

export function updatePagination(
  url: { pathname: string },
  pagination: Pagination
) {
  const pageEntries = content.flatMap(entry => entry.contents);
  const currentPageIndex = pageEntries.findIndex(
    link => link.href == url.pathname
  );
  const next = pageEntries[currentPageIndex + (1 % pageEntries.length)];
  const prev = pageEntries[currentPageIndex - 1 > 0 ? currentPageIndex - 1 : 0];

  if (pagination.prev != null) {
    pagination.prev.label = prev.title.toString();
    pagination.prev.href = prev.href;
  }

  if (pagination.next != null) {
    pagination.next.label = next.title.toString();
    pagination.next.href = next.href;
  }
}
