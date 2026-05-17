import { shopifyApiProject, ApiType } from '@shopify/api-codegen-preset';
import { preset as hydrogenPreset, pluckConfig } from '@shopify/hydrogen-codegen';

// TODO: migrate Storefront API from proxy to @shopify/hydrogen-codegen
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
        './src/constants/**/**/*.{js,ts}',
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

    // Customer Account API - hydrogen-codegen
    customer: {
      schema: './schemas/customer-account.schema.json',
      documents: ['./src/constantsAccount/**/*.{js,ts}'],
      extensions: {
        codegen: {
          pluckConfig,
          generates: {
            'src/types/customer/customer.generated.d.ts': { preset: hydrogenPreset },
          },
        },
      },
    },
  },
};
