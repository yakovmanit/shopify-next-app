import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset';

export default {
  schema: 'https://shopify.dev/storefront-graphql-direct-proxy/2025-10',
  documents: ['./src/**/*.{js,ts,jsx,tsx}'],
  projects: {
    // Default Storefront API
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: '2025-10',
      documents: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/lib/shopify/**/*.{js,ts}',
        './src/services/**/*.{js,ts}',
        './src/redux/api/**/*.{js,ts}',
      ],
      outputDir: './src/types/storefront',
    }),

    // Admin API
    admin: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: '2025-10',
      documents: [
        './src/app/api/**/*.{js,ts}',
        './src/lib/shopify/admin/**/*.{js,ts}',
      ],
      outputDir: './src/types/admin',
    }),
  },
};
