interface Section {
  title: string;
  contents: {
    href: string;
    title: string;
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
    title: 'Introduction',
    contents: [
      { href: '/getting-started/', title: 'Getting Started' },
      { href: '/faq/', title: 'Frequently Asked Questions' },
      { href: '/security/', title: 'Reporting a Vulnerability' }
    ]
  },
  {
    title: 'Translation Contribution',
    contents: [
      {
        href: '/how-to-translate-files/',
        title: 'Work on translating resources'
      },
      {
        href: '/how-to-proofread-files/',
        title: 'Work on proofreading translations'
      }
    ]
  },
  {
    title: 'Code Contribution',
    contents: [
      {
        href: '/how-to-setup-freecodecamp-locally/',
        title: 'Set up freeCodeCamp'
      },
      { href: '/codebase-best-practices/', title: 'Follow best-practices' },
      {
        href: '/how-to-contribute-to-the-codebase/',
        title: 'Work on Codebase'
      },
      {
        href: '/how-to-work-on-coding-challenges/',
        title: 'Work on Coding Challenges'
      },
      {
        href: '/how-to-work-on-quizzes/',
        title: 'Work on Quizzes'
      },
      {
        href: '/curriculum-help/',
        title: 'Use the Curriculum Helpers'
      },
      {
        href: '/how-to-work-on-the-component-library/',
        title: 'Work on Component Library'
      },
      {
        href: '/how-to-work-on-practice-projects/',
        title: 'Work on Practice Projects'
      },
      {
        href: '/how-to-setup-freecodecamp-mobile-app-locally/',
        title: 'Work on Mobile app'
      },
      {
        href: '/how-to-work-on-tutorials-that-use-coderoad/',
        title: 'Work on tutorials with CodeRoad'
      },
      {
        href: '/how-to-work-on-localized-client-webapp/',
        title: 'Work on Localized Web App'
      },
      {
        href: '/how-to-add-playwright-tests/',
        title: 'Work on Playwright Tests'
      },
      {
        href: '/how-to-help-with-video-challenges/',
        title: 'Work on Video Challenges'
      },
      {
        href: '/how-to-work-on-the-docs-theme/',
        title: 'Work on Documentation'
      },
      {
        href: '/how-to-open-a-pull-request/',
        title: 'Open a pull request'
      }
    ]
  },
  {
    title: 'Additional Guides',
    contents: [
      {
        href: '/curriculum-file-structure/',
        title: 'Understand the curriculum file structure'
      },
      {
        href: '/how-to-catch-outgoing-emails-locally/',
        title: 'Debug outgoing emails locally'
      },
      {
        href: '/how-to-setup-wsl/',
        title: 'Set up freeCodeCamp on Windows (WSL)'
      },
      {
        href: '/how-to-use-docker-on-windows-home/',
        title: 'Use Docker on Windows Home'
      },
      { href: '/user-token-workflow/', title: 'User Token Workflow' },
      {
        href: '/troubleshooting-development-issues/',
        title: 'Troubleshooting Development Issues'
      },
      {
        href: '/authors-analytics-manual/',
        title: 'Authors Analytics Manual'
      }
    ]
  },
  {
    title: 'Flight Manuals (for Staff & Mods)',
    addSeparator: true,
    contents: [
      { href: '/moderator-handbook/', title: 'Moderator Handbook' },
      { href: '/reply-templates/', title: 'Reply Templates' },
      {
        href: '/language-lead-handbook/',
        title: 'Language Lead Handbook'
      },
      {
        href: '/courses-vscode-extension/',
        title: 'Courses VSCode Extension'
      },
      {
        href: '/how-to-enable-new-languages/',
        title: 'Enable New Language'
      }
    ]
  },
  {
    title: 'Our Community',
    addSeparator: true,
    contents: [
      {
        href: 'https://github.com/freecodecamp/freecodecamp',
        title: 'GitHub',
        strong: true,
        external: true
      },
      {
        href: 'https://freecodecamp.org/forum/c/contributors',
        title: 'Discourse Forum',
        strong: true,
        external: true
      },
      {
        href: 'https://discord.gg/PRyKn3Vbay',
        title: 'Chat Server',
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
