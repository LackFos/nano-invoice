import { useCallback, useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Text from "antd/es/typography/Text";
import { Button, Flex, InputNumber, Select } from "antd";
import { ProductContext } from "../context/ProductContext";

export interface Transaction {
  productId: [number, number] | undefined;
  label: string | undefined;
  amount: number | undefined;
  totalPrice: number | undefined;
}

interface Props {
  onAdd: (transaction: Transaction) => void;
}

const initialTransaction: Transaction = {
  productId: undefined,
  label: undefined,
  amount: undefined,
  totalPrice: undefined,
};

const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const { products } = useContext(ProductContext);
  const [transaction, setTransaction] = useState<Transaction>(initialTransaction);

  const handleTransactionChange = useCallback(<K extends keyof typeof transaction>(field: K, value: (typeof transaction)[K]) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: value,
    }));
  }, []);

  const handleAddTransaction = (transaction: Transaction) => {
    if (!transaction.productId || !transaction.amount || !transaction.totalPrice || !transaction.label) {
      alert("Please fill all the fields");
    } else {
      onAdd(transaction);
      setTransaction(initialTransaction);
    }
  };

  const selectedProduct = transaction.productId ? products[transaction.productId[0]] : undefined;
  const selectedSubproduct = selectedProduct?.subItems[transaction.productId![1]];

  useEffect(() => {
    if (selectedProduct && selectedSubproduct) {
      setTransaction((prev) => ({
        ...prev,
        label: `${selectedProduct.name} - ${selectedSubproduct.name}`,
      }));
    }

    if (selectedSubproduct && transaction.amount) {
      setTransaction((prev) => ({
        ...prev,
        totalPrice: transaction.amount! * selectedSubproduct.price,
      }));
    }
  }, [selectedSubproduct, selectedProduct, transaction, handleTransactionChange]);

  return (
    <Flex gap={16} vertical={true}>
      <Flex gap={8}>
        <div className='relative w-full'>
          <Select
            className='w-full'
            placeholder='Jenis Barang'
            options={products.map((product, productIndex) => ({
              label: <span>{product.name}</span>,
              title: product.name,
              options: product.subItems.map((sub, subIndex) => ({
                label: sub.name,
                value: [productIndex, subIndex],
              })),
            }))}
            onSelect={(value) => handleTransactionChange("productId", value as [number, number])} // Type assertion
          />

          {transaction.label && <Text className='absolute left-3 top-1/2 -translate-y-1/2'>{transaction.label}</Text>}
        </div>

        <InputNumber
          onChange={(value) => handleTransactionChange("amount", Number(value))}
          value={transaction.amount}
          formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "")}
          parser={(value) => (value ? (value.replace(/\.\s?|(\.)/g, "") as unknown as number) : 0)}
          className='w-full'
          prefix='¥ '
          placeholder='Jumlah Dibeli'
        />

        <InputNumber
          disabled={true}
          value={transaction.totalPrice}
          formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "")}
          parser={(value) => (value ? (value.replace(/\.\s?|(\.)/g, "") as unknown as number) : 0)}
          className='w-full'
          prefix='Rp '
          placeholder='Total Harga'
        />
      </Flex>

      <Button onClick={() => handleAddTransaction(transaction)} className='bg-gray-300'>
        <PlusOutlined /> Tambah
      </Button>
    </Flex>
  );
};

export default TransactionForm;
