import { Transaction } from "../models/Transaction";
import { Table, TableColumnsType } from "antd";

interface Props {
	data: Transaction[];
}

const columns: TableColumnsType<Transaction> = [
	{
		title: "STT",
		dataIndex: "stt",
	},
	{
		title: "Ngày",
		dataIndex: "ngay",
	},
	{
		title: "Giờ",
		dataIndex: "gio",
	},
	{
		title: "Trạm",
		dataIndex: "tram",
	},
	{
		title: "Trụ bơm",
		dataIndex: "tru_bom",
	},
	{
		title: "Mặt hàng",
		dataIndex: "mat_hang",
	},
	{
		title: "Số lượng",
		dataIndex: "so_luong",
		sorter: {
			compare: (a, b) => a.so_luong - b.so_luong,
			multiple: 3,
		},
	},
	{
		title: "Đơn giá",
		dataIndex: "don_gia",
		sorter: {
			compare: (a, b) => a.don_gia - b.don_gia,
			multiple: 3,
		},
	},
	{
		title: "Thành tiền",
		dataIndex: "thanh_tien",
		sorter: {
			compare: (a, b) => a.thanh_tien - b.thanh_tien,
			multiple: 3,
		},
	},
	{
		title: "Trạng thái thanh toán",
		dataIndex: "trang_thai_TT",
	},
	{
		title: "Mã khách hàng",
		dataIndex: "ma_KH",
	},
	{
		title: "Tên khách hàng",
		dataIndex: "ten_KH",
	},
	{
		title: "Loại khách hàng",
		dataIndex: "loai_KH",
	},
	{
		title: "Ngày thanh toán",
		dataIndex: "ngay_thanh_toan",
	},
	{
		title: "Nhân viên",
		dataIndex: "nhan_vien",
	},
	{
		title: "Biên số xe",
		dataIndex: "bien_so_xe",
	},
	{
		title: "Trạng thái hoá đơn",
		dataIndex: "trang_thai_HD",
	},
];

export default function TableData({ data }: Props) {
	return (
		<Table<Transaction>
			columns={columns}
			dataSource={data.map((d, index) => {
				return { ...d, key: index };
			})}
			size='small'
			bordered={true}
		/>
	);
}
