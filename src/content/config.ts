import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({
    type: 'data',
    schema: i18nSchema({
      extend: z.object({
        'sidebar.gettingStarted': z.string(),
        'sidebar.introduction': z.string(),
        'sidebar.faq': z.string(),
        'sidebar.report_vulnerability': z.string(),
        'sidebar.translation_contribution': z.string(),
        'sidebar.translate_resources': z.string(),
        'sidebar.proofread_translations': z.string(),
        'sidebar.code_contribution': z.string(),
        'sidebar.setup_freecodecamp': z.string(),
        'sidebar.best_practices': z.string(),
        'sidebar.work_on_codebase': z.string(),
        'sidebar.work_on_coding_challenges': z.string(),
        'sidebar.work_on_quizzes': z.string(),
        'sidebar.use_the_curriculum_helpers': z.string(),
        'sidebar.work_on_component_library': z.string(),
        'sidebar.work_on_practice_projects': z.string(),
        'sidebar.work_on_mobile_app': z.string(),
        'sidebar.coderoad': z.string(),
        'sidebar.work_on_webapp': z.string(),
        'sidebar.work_on_playwright_tests': z.string(),
        'sidebar.work_on_video_challenges': z.string(),
        'sidebar.work_on_documentation': z.string(),
        'sidebar.open_a_pull_request': z.string(),
        'sidebar.additional_guides': z.string(),
        'sidebar.file_structure': z.string(),
        'sidebar.debug_outgoing_emails_locally': z.string(),
        'sidebar.setup_fcc_on_wsl': z.string(),
        'sidebar.docker_on_windows_home': z.string(),
        'sidebar.user_token_workflow': z.string(),
        'sidebar.troubleshooting_development_issues': z.string(),
        'sidebar.authors_analytics_manual': z.string(),
        'sidebar.flight_manuals': z.string(),
        'sidebar.moderator_handbook': z.string(),
        'sidebar.reply_templates': z.string(),
        'sidebar.language_lead_handbook': z.string(),
        'sidebar.devops_handbook': z.string(),
        'sidebar.courses_vscode_extension': z.string(),
        'sidebar.enable_new_language': z.string(),
        'sidebar.our_community': z.string(),
        'sidebar.github': z.string(),
        'sidebar.discourse_forum': z.string(),
        'sidebar.chat_server': z.string()
      })
    })
  })
};
