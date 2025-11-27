export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  handle: string;
  description: string;
  currencyCode: string;
}

export type ProductOption = {
  id: string;
  name: string;
  optionValues: {
    id: string;
    name: string;
  }[];
};