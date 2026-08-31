import { defineConfig } from 'wxt';

// https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'WordScope',
    version: '1.0.0',
    description: 'A simple example of a WXT extension using React.',
    permissions: [
      'activeTab',
      'scripting',
      'contextMenus',
      'storage',
      'tabs',
    ],
  },
});