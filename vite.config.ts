import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about.html'),
          services: resolve(__dirname, 'services.html'),
          listings: resolve(__dirname, 'listings.html'),
          propertyDetails: resolve(__dirname, 'property-details.html'),
          commercial: resolve(__dirname, 'commercial.html'),
          residential: resolve(__dirname, 'residential.html'),
          gallery: resolve(__dirname, 'gallery.html'),
          video: resolve(__dirname, 'video.html'),
          contact: resolve(__dirname, 'contact.html'),
          requestListing: resolve(__dirname, 'request-listing.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms: resolve(__dirname, 'terms.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: false,
    },
  };
});
