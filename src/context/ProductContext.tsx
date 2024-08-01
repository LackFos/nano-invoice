import { createContext, useEffect, useState } from "react";
import { Product } from "../interfaces";

export const ProductContext = createContext<{ products: Product[]; setProducts: (products: Product[]) => void }>({
  products: [],
  setProducts: () => {},
});

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductsChange = (products: Product[]) => {
    setProducts(products);
  };

  useEffect(() => {
    const setting = localStorage.getItem("products");

    if (!setting) {
      const defaultSetting = [
        {
          name: "Alipay",
          subItems: [
            { name: "Same Day", price: 2240 },
            { name: "Keep", price: 2255 },
          ],
        },
        {
          name: "Bank",
          subItems: [
            { name: "Same Day", price: 2240 },
            { name: "Keep", price: 2255 },
          ],
        },
      ];

      localStorage.setItem("products", JSON.stringify(defaultSetting));
    }

    setProducts(JSON.parse(localStorage.getItem("products")!));
  }, []);

  return <ProductContext.Provider value={{ products, setProducts: handleProductsChange }}>{children}</ProductContext.Provider>;
};
