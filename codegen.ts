import type {CodegenConfig} from '@graphql-codegen/cli';
import {pluckConfig, preset} from '@shopify/hydrogen-codegen';

export default {
  overwrite: true,
  pluckConfig,
  generates: {
    './src/types/generated/storefrontapi.generated.d.ts': {
      preset,
      schema: './schemas/storefront.schema.json',
      documents:['./src/constants/queries/storefront/**/*.{ts,tsx,js,jsx}'],
    },
    './src/types/generated/customeraccountapi.generated.d.ts': {
      preset,
      schema: './schemas/customer-account.schema.json',
      documents: ['./src/constants/queries/customer-account/*.{ts,tsx,js,jsx}'],
    },
  },
} as CodegenConfig;