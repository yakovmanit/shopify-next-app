import {Maybe} from "@/types/storefront/storefront.types";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  handle: string;
  description: string;
  currencyCode: string;
  variants: {
    id: string;
    title: string;
    quantityAvailable:  Maybe<number> | undefined;
  }[]
}

export type ProductOption = {
  id: string;
  name: string;
  optionValues: {
    id: string;
    name: string;
  }[];
};