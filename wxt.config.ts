import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      extensionApi : "chrome",
      "manifest_version": 2,
      "name": "WordScope",
      "version": "1.0.0",
      "description": "A simple example of a WXT extension using React.",
      permissions: [
        "storage",
        "tabs"],
    };
  },
});
