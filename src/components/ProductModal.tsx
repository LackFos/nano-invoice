import { Flex, InputNumber, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ProductModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel }) => {
  const { products, setProducts } = useContext(ProductContext);

  const handleProductChange = (productIndex: number, subItemIndex: number, price: number) => {
    const updatedProducts = products?.map((product, index) => {
      if (index === productIndex) {
        return {
          ...product,
          subItems: product.subItems.map((subItem, index) => {
            if (index === subItemIndex) {
              return {
                ...subItem,
                price,
              };
            }
            return subItem;
          }),
        };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const handleConfirm = () => {
    localStorage.setItem("products", JSON.stringify(products));
    onConfirm();
  };

  return (
    <Modal title='Setting (Rate)' open={isOpen} onOk={handleConfirm} onCancel={onCancel}>
      <Flex className='pt-4' gap={24} vertical={true}>
        {products &&
          products.map((rate, index) => (
            <Flex key={index} vertical={true}>
              <Title level={5}>{rate.name}</Title>
              <Flex gap={8}>
                {rate.subItems.map((subItem, subItemIndex) => (
                  <div key={index} className='w-full'>
                    <p>{subItem.name}</p>
                    <InputNumber
                      className='w-full'
                      value={subItem.price}
                      formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "")}
                      parser={(value) => (value ? (value.replace(/\.\s?|(\.)/g, "") as unknown as number) : 0)}
                      onChange={(value) => handleProductChange(index, subItemIndex, Number(value))}
                      prefix='Rp'
                    />
                  </div>
                ))}
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Modal>
  );
};

export default ProductModal;
