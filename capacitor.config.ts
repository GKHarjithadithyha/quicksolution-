import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.quicksolution.app',
  appName: 'Quick Solution',
  webDir: 'dist',
  android: {
    backgroundColor: '#F7F9F4',
    allowMixedContent: true
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
