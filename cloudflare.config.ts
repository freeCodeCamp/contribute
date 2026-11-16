import { defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'contribute',
    compatibilityDate: '2025-10-07',
    workersDev: false,
    previewUrls: true,
    placement: {
      mode: 'smart'
    },
    observability: {
      enabled: false,
      headSamplingRate: 1,
      logs: {
        enabled: true,
        headSamplingRate: 0.2,
        persist: true,
        invocationLogs: true
      },
      traces: {
        enabled: false,
        persist: true,
        headSamplingRate: 1
      }
    },
    assets: {
      notFoundHandling: '404-page'
    },
    domains: ['contribute.freecodecamp.org']
  }
});
