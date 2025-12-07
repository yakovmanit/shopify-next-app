import {ShopifyData} from "@/lib";
import {CREATE_CUSTOMER_MUTATION} from "@/constants/queries";
import {CreateCustomerMutation} from "@/types/storefront/storefront.generated";

export async function createCustomer(email: string, password: string, firstName?: string, lastName?: string) {
  const variables = {
    input: {
      email,
      password,
      firstName,
      lastName,
    },
  };

  const response: CreateCustomerMutation = await ShopifyData(CREATE_CUSTOMER_MUTATION, variables);

  return response?.customerCreate?.customer;
}