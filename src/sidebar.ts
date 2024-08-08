import english from './i18n/english.json';
import chinese from './i18n/chinese.json';
import chineseTraditional from './i18n/chinese-traditional.json';
import spanish from './i18n/spanish.json';
import german from './i18n/german.json';
import italian from './i18n/italian.json';
import japanese from './i18n/japanese.json';
import portuguese from './i18n/portuguese.json';
import ukrainian from './i18n/ukrainian.json';

export const sidebar = [
  {
    label: english['Getting Started'],
    translations: {
      de: german['Getting Started'],
      es: spanish['Getting Started'],
      it: italian['Getting Started'],
      jp: japanese['Getting Started'],
      pt: portuguese['Getting Started'],
      uk: ukrainian['Getting Started'],
      zh: chinese['Getting Started'],
      'zh-Tw': chineseTraditional['Getting Started']
    },
    items: [
      {
        label: english['Introduction'],
        translations: {
          de: german['Introduction'],
          es: spanish['Introduction'],
          it: italian['Introduction'],
          jp: japanese['Introduction'],
          pt: portuguese['Introduction'],
          uk: ukrainian['Introduction'],
          zh: chinese['Introduction'],
          'zh-Tw': chineseTraditional['Introduction']
        },
        link: '/intro'
      },
      {
        label: english['Frequently Asked Questions'],
        translations: {
          de: german['Frequently Asked Questions'],
          es: spanish['Frequently Asked Questions'],
          it: italian['Frequently Asked Questions'],
          jp: japanese['Frequently Asked Questions'],
          pt: portuguese['Frequently Asked Questions'],
          uk: ukrainian['Frequently Asked Questions'],
          zh: chinese['Frequently Asked Questions'],
          'zh-Tw': chineseTraditional['Frequently Asked Questions']
        },
        link: '/faq'
      },
      {
        label: english['Reporting a Vulnerability'],
        translations: {
          de: german['Reporting a Vulnerability'],
          es: spanish['Reporting a Vulnerability'],
          it: italian['Reporting a Vulnerability'],
          jp: japanese['Reporting a Vulnerability'],
          pt: portuguese['Reporting a Vulnerability'],
          uk: ukrainian['Reporting a Vulnerability'],
          zh: chinese['Reporting a Vulnerability'],
          'zh-Tw': chineseTraditional['Reporting a Vulnerability']
        },
        link: 'security'
      }
    ]
  },
  {
    label: english['Translation Contribution'],
    translations: {
      de: german['Translation Contribution'],
      es: spanish['Translation Contribution'],
      it: italian['Translation Contribution'],
      jp: japanese['Translation Contribution'],
      pt: portuguese['Translation Contribution'],
      uk: ukrainian['Translation Contribution'],
      zh: chinese['Translation Contribution'],
      'zh-Tw': chineseTraditional['Translation Contribution']
    },
    items: [
      {
        label: english['Work on translating resources'],
        translations: {
          de: german['Work on translating resources'],
          es: spanish['Work on translating resources'],
          it: italian['Work on translating resources'],
          jp: japanese['Work on translating resources'],
          pt: portuguese['Work on translating resources'],
          uk: ukrainian['Work on translating resources'],
          zh: chinese['Work on translating resources'],
          'zh-Tw': chineseTraditional['Work on translating resources']
        },
        link: 'how-to-translate-files'
      },
      {
        label: english['Work on proofreading translations'],
        translations: {
          de: german['Work on proofreading translations'],
          es: spanish['Work on proofreading translations'],
          it: italian['Work on proofreading translations'],
          jp: japanese['Work on proofreading translations'],
          pt: portuguese['Work on proofreading translations'],
          uk: ukrainian['Work on proofreading translations'],
          zh: chinese['Work on proofreading translations'],
          'zh-Tw': chineseTraditional['Work on proofreading translations']
        },
        link: 'how-to-proofread-files'
      }
    ]
  },
  {
    label: english['Code Contribution'],
    translations: {
      de: german['Code Contribution'],
      es: spanish['Code Contribution'],
      it: italian['Code Contribution'],
      jp: japanese['Code Contribution'],
      pt: portuguese['Code Contribution'],
      uk: ukrainian['Code Contribution'],
      zh: chinese['Code Contribution'],
      'zh-Tw': chineseTraditional['Code Contribution']
    },
    items: [
      {
        label: english['Set up freeCodeCamp'],
        translations: {
          de: german['Set up freeCodeCamp'],
          es: spanish['Set up freeCodeCamp'],
          it: italian['Set up freeCodeCamp'],
          jp: japanese['Set up freeCodeCamp'],
          pt: portuguese['Set up freeCodeCamp'],
          uk: ukrainian['Set up freeCodeCamp'],
          zh: chinese['Set up freeCodeCamp'],
          'zh-Tw': chineseTraditional['Set up freeCodeCamp']
        },
        link: 'how-to-setup-freecodecamp-locally'
      },
      {
        label: english['Codebase Commands'],
        link: 'curriculum-commands'
      },
      {
        label: english['Follow best-practices'],
        translations: {
          de: german['Follow best-practices'],
          es: spanish['Follow best-practices'],
          it: italian['Follow best-practices'],
          jp: japanese['Follow best-practices'],
          pt: portuguese['Follow best-practices'],
          uk: ukrainian['Follow best-practices'],
          zh: chinese['Follow best-practices'],
          'zh-Tw': chineseTraditional['Follow best-practices']
        },
        link: 'codebase-best-practices'
      },
      {
        label: english['Work on Codebase'],
        translations: {
          de: german['Work on Codebase'],
          es: spanish['Work on Codebase'],
          it: italian['Work on Codebase'],
          jp: japanese['Work on Codebase'],
          pt: portuguese['Work on Codebase'],
          uk: ukrainian['Work on Codebase'],
          zh: chinese['Work on Codebase'],
          'zh-Tw': chineseTraditional['Work on Codebase']
        },
        link: 'how-to-contribute-to-the-codebase'
      },
      {
        label: english['Work on Coding Challenges'],
        translations: {
          de: german['Work on Coding Challenges'],
          es: spanish['Work on Coding Challenges'],
          it: italian['Work on Coding Challenges'],
          jp: japanese['Work on Coding Challenges'],
          pt: portuguese['Work on Coding Challenges'],
          uk: ukrainian['Work on Coding Challenges'],
          zh: chinese['Work on Coding Challenges'],
          'zh-Tw': chineseTraditional['Work on Coding Challenges']
        },
        link: 'how-to-work-on-coding-challenges'
      },
      {
        label: english['Use the Curriculum Helpers'],
        translations: {
          de: german['Use the Curriculum Helpers'],
          es: spanish['Use the Curriculum Helpers'],
          it: italian['Use the Curriculum Helpers'],
          jp: japanese['Use the Curriculum Helpers'],
          pt: portuguese['Use the Curriculum Helpers'],
          uk: ukrainian['Use the Curriculum Helpers'],
          zh: chinese['Use the Curriculum Helpers'],
          'zh-Tw': chineseTraditional['Use the Curriculum Helpers']
        },
        link: 'curriculum-help'
      },
      {
        label: english['Work on Component Library'],
        translations: {
          de: german['Work on Component Library'],
          es: spanish['Work on Component Library'],
          it: italian['Work on Component Library'],
          jp: japanese['Work on Component Library'],
          pt: portuguese['Work on Component Library'],
          uk: ukrainian['Work on Component Library'],
          zh: chinese['Work on Component Library'],
          'zh-Tw': chineseTraditional['Work on Component Library']
        },
        link: 'how-to-work-on-the-component-library'
      },
      {
        label: english['Work on Practice Projects'],
        translations: {
          de: german['Work on Practice Projects'],
          es: spanish['Work on Practice Projects'],
          it: italian['Work on Practice Projects'],
          jp: japanese['Work on Practice Projects'],
          pt: portuguese['Work on Practice Projects'],
          uk: ukrainian['Work on Practice Projects'],
          zh: chinese['Work on Practice Projects'],
          'zh-Tw': chineseTraditional['Work on Practice Projects']
        },
        link: 'how-to-work-on-practice-projects'
      },
      {
        label: english['Work on Mobile app'],
        translations: {
          de: german['Work on Mobile app'],
          es: spanish['Work on Mobile app'],
          it: italian['Work on Mobile app'],
          jp: japanese['Work on Mobile app'],
          pt: portuguese['Work on Mobile app'],
          uk: ukrainian['Work on Mobile app'],
          zh: chinese['Work on Mobile app'],
          'zh-Tw': chineseTraditional['Work on Mobile app']
        },
        link: 'how-to-setup-freecodecamp-mobile-app-locally'
      },
      {
        label: english['Work on tutorials with CodeRoad'],
        translations: {
          de: german['Work on tutorials with CodeRoad'],
          es: spanish['Work on tutorials with CodeRoad'],
          it: italian['Work on tutorials with CodeRoad'],
          jp: japanese['Work on tutorials with CodeRoad'],
          pt: portuguese['Work on tutorials with CodeRoad'],
          uk: ukrainian['Work on tutorials with CodeRoad'],
          zh: chinese['Work on tutorials with CodeRoad'],
          'zh-Tw': chineseTraditional['Work on tutorials with CodeRoad']
        },
        link: 'how-to-work-on-tutorials-that-use-coderoad'
      },
      {
        label: english['Work on Localized Web App'],
        translations: {
          de: german['Work on Localized Web App'],
          es: spanish['Work on Localized Web App'],
          it: italian['Work on Localized Web App'],
          jp: japanese['Work on Localized Web App'],
          pt: portuguese['Work on Localized Web App'],
          uk: ukrainian['Work on Localized Web App'],
          zh: chinese['Work on Localized Web App'],
          'zh-Tw': chineseTraditional['Work on Localized Web App']
        },
        link: 'how-to-work-on-localized-client-webapp'
      },
      {
        label: english['Work on Playwright Tests'],
        translations: {
          de: german['Work on Playwright Tests'],
          es: spanish['Work on Playwright Tests'],
          it: italian['Work on Playwright Tests'],
          jp: japanese['Work on Playwright Tests'],
          pt: portuguese['Work on Playwright Tests'],
          uk: ukrainian['Work on Playwright Tests'],
          zh: chinese['Work on Playwright Tests'],
          'zh-Tw': chineseTraditional['Work on Playwright Tests']
        },
        link: 'how-to-add-playwright-tests'
      },
      {
        label: english['Work on Video Challenges'],
        translations: {
          de: german['Work on Video Challenges'],
          es: spanish['Work on Video Challenges'],
          it: italian['Work on Video Challenges'],
          jp: japanese['Work on Video Challenges'],
          pt: portuguese['Work on Video Challenges'],
          uk: ukrainian['Work on Video Challenges'],
          zh: chinese['Work on Video Challenges'],
          'zh-Tw': chineseTraditional['Work on Video Challenges']
        },
        link: 'how-to-help-with-video-challenges'
      },
      {
        label: english['Work on Documentation'],
        translations: {
          de: german['Work on Documentation'],
          es: spanish['Work on Documentation'],
          it: italian['Work on Documentation'],
          jp: japanese['Work on Documentation'],
          pt: portuguese['Work on Documentation'],
          uk: ukrainian['Work on Documentation'],
          zh: chinese['Work on Documentation'],
          'zh-Tw': chineseTraditional['Work on Documentation']
        },
        link: 'how-to-work-on-the-docs-theme'
      },
      {
        label: english['Open a pull request'],
        translations: {
          de: german['Open a pull request'],
          es: spanish['Open a pull request'],
          it: italian['Open a pull request'],
          jp: japanese['Open a pull request'],
          pt: portuguese['Open a pull request'],
          uk: ukrainian['Open a pull request'],
          zh: chinese['Open a pull request'],
          'zh-Tw': chineseTraditional['Open a pull request']
        },
        link: 'how-to-open-a-pull-request'
      }
    ]
  },
  {
    label: english['Additional Guides'],
    translations: {
      de: german['Additional Guides'],
      es: spanish['Additional Guides'],
      it: italian['Additional Guides'],
      jp: japanese['Additional Guides'],
      pt: portuguese['Additional Guides'],
      uk: ukrainian['Additional Guides'],
      zh: chinese['Additional Guides'],
      'zh-Tw': chineseTraditional['Additional Guides']
    },
    items: [
      {
        label: english['Understand the curriculum file structure'],
        translations: {
          de: german['Understand the curriculum file structure'],
          es: spanish['Understand the curriculum file structure'],
          it: italian['Understand the curriculum file structure'],
          jp: japanese['Understand the curriculum file structure'],
          pt: portuguese['Understand the curriculum file structure'],
          uk: ukrainian['Understand the curriculum file structure'],
          zh: chinese['Understand the curriculum file structure'],
          'zh-Tw':
            chineseTraditional['Understand the curriculum file structure']
        },
        link: 'curriculum-file-structure'
      },
      {
        label: english['Debug outgoing emails locally'],
        translations: {
          de: german['Debug outgoing emails locally'],
          es: spanish['Debug outgoing emails locally'],
          it: italian['Debug outgoing emails locally'],
          jp: japanese['Debug outgoing emails locally'],
          pt: portuguese['Debug outgoing emails locally'],
          uk: ukrainian['Debug outgoing emails locally'],
          zh: chinese['Debug outgoing emails locally'],
          'zh-Tw': chineseTraditional['Debug outgoing emails locally']
        },
        link: 'how-to-catch-outgoing-emails-locally'
      },
      {
        label: english['Set up freeCodeCamp on Windows (WSL)'],
        translations: {
          de: german['Set up freeCodeCamp on Windows (WSL)'],
          es: spanish['Set up freeCodeCamp on Windows (WSL)'],
          it: italian['Set up freeCodeCamp on Windows (WSL)'],
          jp: japanese['Set up freeCodeCamp on Windows (WSL)'],
          pt: portuguese['Set up freeCodeCamp on Windows (WSL)'],
          uk: ukrainian['Set up freeCodeCamp on Windows (WSL)'],
          zh: chinese['Set up freeCodeCamp on Windows (WSL)'],
          'zh-Tw': chineseTraditional['Set up freeCodeCamp on Windows (WSL)']
        },
        link: 'how-to-setup-wsl'
      },
      {
        label: english['Use Docker on Windows Home'],
        translations: {
          de: german['Use Docker on Windows Home'],
          es: spanish['Use Docker on Windows Home'],
          it: italian['Use Docker on Windows Home'],
          jp: japanese['Use Docker on Windows Home'],
          pt: portuguese['Use Docker on Windows Home'],
          uk: ukrainian['Use Docker on Windows Home'],
          zh: chinese['Use Docker on Windows Home'],
          'zh-Tw': chineseTraditional['Use Docker on Windows Home']
        },
        link: 'how-to-use-docker-on-windows-home'
      },
      {
        label: english['User Token Workflow'],
        translations: {
          de: german['User Token Workflow'],
          es: spanish['User Token Workflow'],
          it: italian['User Token Workflow'],
          jp: japanese['User Token Workflow'],
          pt: portuguese['User Token Workflow'],
          uk: ukrainian['User Token Workflow'],
          zh: chinese['User Token Workflow'],
          'zh-Tw': chineseTraditional['User Token Workflow']
        },
        link: 'user-token-workflow'
      },
      {
        label: english['Troubleshooting Development Issues'],
        translations: {
          de: german['Troubleshooting Development Issues'],
          es: spanish['Troubleshooting Development Issues'],
          it: italian['Troubleshooting Development Issues'],
          jp: japanese['Troubleshooting Development Issues'],
          pt: portuguese['Troubleshooting Development Issues'],
          uk: ukrainian['Troubleshooting Development Issues'],
          zh: chinese['Troubleshooting Development Issues'],
          'zh-Tw': chineseTraditional['Troubleshooting Development Issues']
        },
        link: 'troubleshooting-development-issues'
      },
      {
        label: english['Authors Analytics Manual'],
        translations: {
          de: german['Authors Analytics Manual'],
          es: spanish['Authors Analytics Manual'],
          it: italian['Authors Analytics Manual'],
          jp: japanese['Authors Analytics Manual'],
          pt: portuguese['Authors Analytics Manual'],
          uk: ukrainian['Authors Analytics Manual'],
          zh: chinese['Authors Analytics Manual'],
          'zh-Tw': chineseTraditional['Authors Analytics Manual']
        },
        link: 'authors-analytics-manual'
      }
    ]
  },
  {
    label: english['Flight Manuals (for Staff & Mods)'],
    translations: {
      de: german['Flight Manuals (for Staff & Mods)'],
      es: spanish['Flight Manuals (for Staff & Mods)'],
      it: italian['Flight Manuals (for Staff & Mods)'],
      jp: japanese['Flight Manuals (for Staff & Mods)'],
      pt: portuguese['Flight Manuals (for Staff & Mods)'],
      uk: ukrainian['Flight Manuals (for Staff & Mods)'],
      zh: chinese['Flight Manuals (for Staff & Mods)'],
      'zh-Tw': chineseTraditional['Flight Manuals (for Staff & Mods)']
    },
    items: [
      {
        label: english['Moderator Handbook'],
        translations: {
          de: german['Moderator Handbook'],
          es: spanish['Moderator Handbook'],
          it: italian['Moderator Handbook'],
          jp: japanese['Moderator Handbook'],
          pt: portuguese['Moderator Handbook'],
          uk: ukrainian['Moderator Handbook'],
          zh: chinese['Moderator Handbook'],
          'zh-Tw': chineseTraditional['Moderator Handbook']
        },
        link: 'moderator-handbook'
      },
      {
        label: english['Reply Templates'],
        translations: {
          de: german['Reply Templates'],
          es: spanish['Reply Templates'],
          it: italian['Reply Templates'],
          jp: japanese['Reply Templates'],
          pt: portuguese['Reply Templates'],
          uk: ukrainian['Reply Templates'],
          zh: chinese['Reply Templates'],
          'zh-Tw': chineseTraditional['Reply Templates']
        },
        link: 'reply-templates'
      },
      {
        label: english['Language Lead Handbook'],
        translations: {
          de: german['Language Lead Handbook'],
          es: spanish['Language Lead Handbook'],
          it: italian['Language Lead Handbook'],
          jp: japanese['Language Lead Handbook'],
          pt: portuguese['Language Lead Handbook'],
          uk: ukrainian['Language Lead Handbook'],
          zh: chinese['Language Lead Handbook'],
          'zh-Tw': chineseTraditional['Language Lead Handbook']
        },
        link: 'language-lead-handbook'
      },
      {
        label: english['DevOps Handbook'],
        translations: {
          de: german['DevOps Handbook'],
          es: spanish['DevOps Handbook'],
          it: italian['DevOps Handbook'],
          jp: japanese['DevOps Handbook'],
          pt: portuguese['DevOps Handbook'],
          uk: ukrainian['DevOps Handbook'],
          zh: chinese['DevOps Handbook'],
          'zh-Tw': chineseTraditional['DevOps Handbook']
        },
        link: 'devops'
      },
      {
        label: english['Courses VSCode Extension'],
        translations: {
          de: german['Courses VSCode Extension'],
          es: spanish['Courses VSCode Extension'],
          it: italian['Courses VSCode Extension'],
          jp: japanese['Courses VSCode Extension'],
          pt: portuguese['Courses VSCode Extension'],
          uk: ukrainian['Courses VSCode Extension'],
          zh: chinese['Courses VSCode Extension'],
          'zh-Tw': chineseTraditional['Courses VSCode Extension']
        },
        link: 'courses-vscode-extension'
      },
      {
        label: english['Enable New Language'],
        translations: {
          de: german['Enable New Language'],
          es: spanish['Enable New Language'],
          it: italian['Enable New Language'],
          jp: japanese['Enable New Language'],
          pt: portuguese['Enable New Language'],
          uk: ukrainian['Enable New Language'],
          zh: chinese['Enable New Language'],
          'zh-Tw': chineseTraditional['Enable New Language']
        },
        link: 'how-to-enable-new-languages'
      }
    ]
  },
  {
    label: english['Our Community'],
    translations: {
      de: german['Our Community'],
      es: spanish['Our Community'],
      it: italian['Our Community'],
      jp: japanese['Our Community'],
      pt: portuguese['Our Community'],
      uk: ukrainian['Our Community'],
      zh: chinese['Our Community'],
      'zh-Tw': chineseTraditional['Our Community']
    },
    items: [
      {
        label: english['GitHub'],
        translations: {
          de: german['GitHub'],
          es: spanish['GitHub'],
          it: italian['GitHub'],
          jp: japanese['GitHub'],
          uk: ukrainian['GitHub'],
          zh: chinese['GitHub'],
          'zh-Tw': chineseTraditional['GitHub']
        },
        link: 'https://github.com/freecodecamp/freecodecamp'
      },
      {
        label: english['Discourse Forum'],
        translations: {
          de: german['Discourse Forum'],
          es: spanish['Discourse Forum'],
          it: italian['Discourse Forum'],
          jp: japanese['Discourse Forum'],
          pt: portuguese['Discourse Forum'],
          uk: ukrainian['Discourse Forum'],
          zh: chinese['Discourse Forum'],
          'zh-Tw': chineseTraditional['Discourse Forum']
        },
        link: 'https://freecodecamp.org/forum/c/contributors'
      },
      {
        label: english['Chat Server'],
        translations: {
          de: german['Chat Server'],
          es: spanish['Chat Server'],
          it: italian['Chat Server'],
          jp: japanese['Chat Server'],
          pt: portuguese['Chat Server'],
          uk: ukrainian['Chat Server'],
          zh: chinese['Chat Server'],
          'zh-Tw': chineseTraditional['Chat Server']
        },
        link: 'https://discord.gg/PRyKn3Vbay'
      }
    ]
  }
];
