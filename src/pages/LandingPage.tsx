import { DeleteOutlined, PrinterOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Flex, Input, InputNumber } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import TransactionForm, { Transaction } from "../components/TransactionForm";
import ProductModal from "../components/ProductModal";
import PrintModal from "../components/PrintModal";

interface FormData {
  name: string;
  transactions: Transaction[];
}

const LandingPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    transactions: [],
  });

  const [isOpen, setIsOpen] = useState({
    productModal: false,
    printModal: false,
  });

  const handleOpenModal = (modal: keyof typeof isOpen) => {
    setIsOpen((prev) => ({
      ...prev,
      [modal]: true,
    }));
  };

  const handleHideModal = (modal: keyof typeof isOpen) => {
    setIsOpen((prev) => ({
      ...prev,
      [modal]: false,
    }));
  };

  const handleFormDataChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    return setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTransaction = (transaction: Transaction) => {
    setFormData((prev) => ({
      ...prev,
      transactions: [...prev.transactions, transaction],
    }));
  };

  const handleDeleteTransaction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((_, i) => i !== index),
    }));
  };

  const totalPayment = formData.transactions.reduce((total, transaction) => total + transaction.subtotal!, 0);

  return (
    <>
      <ProductModal
        isOpen={isOpen.productModal}
        onConfirm={() => handleHideModal("productModal")}
        onCancel={() => handleHideModal("productModal")}
      />

      <PrintModal
        data={formData}
        isOpen={isOpen.printModal}
        onConfirm={() => handleHideModal("printModal")}
        onCancel={() => handleHideModal("printModal")}
      />

      <div className='flex justify-center bg-[#F8F8F8] p-4 min-h-screen'>
        <main className='max-w-[1140px] flex flex-col w-full bg-white rounded-3xl shadow-sm p-10 gap-12 overflow-auto'>
          <Flex vertical={true} gap={8}>
            <Title type='secondary' level={5}>
              Detail Pelanggan
            </Title>
            <Input
              placeholder='Masukkan Nama Pelanggan'
              value={formData.name}
              onChange={(e) => handleFormDataChange("name", e.target.value)}
            />
          </Flex>

          <Flex vertical={true} gap={8}>
            <Title type='secondary' level={5}>
              Detail Transaksi
            </Title>

            <div className='flex flex-col gap-10'>
              {formData.transactions.length > 0 && (
                <ul className='flex flex-col gap-2'>
                  {formData.transactions.map((transaction, index) => (
                    <li key={index} className='flex gap-2'>
                      <Input disabled={true} value={transaction.label} className='w-full' />

                      <InputNumber
                        disabled={true}
                        value={transaction.amount}
                        className='w-full'
                        prefix='Rp'
                        formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "")}
                        parser={(value) => (value ? (value.replace(/\.\s?|(\.)/g, "") as unknown as number) : 0)}
                      />

                      <InputNumber
                        disabled={true}
                        value={transaction.subtotal}
                        className='w-full'
                        prefix='Rp'
                        formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "")}
                        parser={(value) => (value ? (value.replace(/\.\s?|(\.)/g, "") as unknown as number) : 0)}
                      />

                      <Button danger shape='circle' icon={<DeleteOutlined />} onClick={() => handleDeleteTransaction(index)} />
                    </li>
                  ))}
                </ul>
              )}

              <TransactionForm onAdd={(transaction) => handleAddTransaction(transaction)} />
            </div>
          </Flex>

          <div className='w-full flex justify-between items-center'>
            <div>
              <Title level={4}>Total Pembayaran</Title>
            </div>
            <div>
              <Title level={4}>
                {totalPayment.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Title>
            </div>
          </div>

          <Button onClick={() => handleOpenModal("printModal")} type='primary' size='large'>
            <PrinterOutlined /> Print
          </Button>

          <Button
            onClick={() => handleOpenModal("productModal")}
            className='fixed right-10 bottom-10 shadow-xl'
            type='primary'
            size='large'
            shape='circle'
            icon={<SettingOutlined />}
          />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
