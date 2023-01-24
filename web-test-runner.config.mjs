// import { playwrightLauncher } from '@web/test-runner-playwright';
import { fromRollup } from '@web/dev-server-rollup';
import { resolveTypescriptPaths as tp } from 'rollup-plugin-typescript-paths';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMetaAssets as ma } from '@web/rollup-plugin-import-meta-assets';

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];
const resolveTypescriptPaths = fromRollup(tp);
const importMetaAssets = fromRollup(ma);

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: 'specs/**/*Spec.ts',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  plugins: [
    resolveTypescriptPaths(),
    esbuildPlugin({ ts: true }),
    importMetaAssets({
      include: ['**/*.{svg,jpg,png}'],
      warnOnError: true,
    }),
  ]

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // See documentation for all available options
});
