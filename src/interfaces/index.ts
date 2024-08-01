export interface Product {
  name: string;
  subItems: {
    name: string;
    price: number;
  }[];
}
