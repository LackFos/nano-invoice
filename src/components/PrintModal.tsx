import { Modal, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Transaction } from "./TransactionForm";

interface Props {
  data: { name: string; transactions: Transaction[] };
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  printAreaRef: React.RefObject<HTMLDivElement>;
}

const PrintModal: React.FC<Props> = ({
  data,
  isOpen,
  onConfirm,
  onCancel,
  printAreaRef,
}) => {
  const columns = [
    { title: "Barang", dataIndex: "label", key: "label" },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(price),
    },
    {
      title: "Jumlah",
      dataIndex: "amount",
      key: "amount",
      render: (price: number) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(price),
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (price: number) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(price),
    },
  ];

  const totalPayment = data.transactions.reduce(
    (total, transaction) => total + transaction.subtotal!,
    0
  );

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal open={isOpen} onOk={handleConfirm} onCancel={onCancel}>
      <div ref={printAreaRef} className="flex flex-col gap-6 ml-[-16px]">
        <Title level={5}>{data.name || "Nama Pelanggan"}</Title>

        <Table
          columns={columns}
          dataSource={data.transactions.map((transaction, index) => ({
            ...transaction,
            key: index,
          }))}
          pagination={false}
        />

        <div className="flex items-center justify-between w-full">
          <div className="pl-4">
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
      </div>
    </Modal>
  );
};

export default PrintModal;
