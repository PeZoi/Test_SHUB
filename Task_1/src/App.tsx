import { useState } from "react";
import { Button, message, TimePicker, Upload } from "antd";
import type { UploadProps } from "antd";
import { MdOutlineFileUpload } from "react-icons/md";
import { compareTime, formatPrice, handleExcelData } from "./utils/function";
import { InformationStation } from "./models/InformationStation";
import { Transaction } from "./models/Transaction";
import Information from "./components/Info";
import TableData from "./components/TableData";
import { NoUndefinedRangeValueType } from "rc-picker/lib/PickerInput/RangePicker";
import dayjs from "dayjs";
import { FaDownload } from "react-icons/fa";

export default function App() {
	document.title = "Task 1: DATA REPORT";
	const [fileData, setFileData] = useState<File | undefined>();
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState<InformationStation>();
	const [data, setData] = useState<Transaction[]>([]);
	const [totalAmount, setTotalAmount] = useState(0);

	const Props: UploadProps = {
		onRemove: () => {
			setFileData(undefined);
			setInfo(undefined);
			setData([]);
		},
		beforeUpload: (file) => {
			const isExcel =
				file.name.endsWith(".xls") ||
				file.name.endsWith(".xlsx") ||
				file.name.endsWith(".csv");
			if (!isExcel) {
				message.error(`${file.name} is not a excel file`);
				return Upload.LIST_IGNORE;
			}
			setFileData(file);
			return false;
		},
	};

	const handleLoadData = () => {
		if (!fileData) {
			message.error("Please upload a file data");
			return;
		}
		setLoading(true);
		handleExcelData(fileData)
			.then((res) => {
				setLoading(false);
				setInfo(res.info);
				setData(res.data);
				message.success("Load data successfully!");
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				message.error("Load data failed!");
			});
	};

	const handlePickTime = (
		e: NoUndefinedRangeValueType<dayjs.Dayjs> | null
	) => {
		const newData = data.filter((value) => {
			const timeTarget = dayjs(`1970-01-01 ${value.gio}`);
			const timeFrom = dayjs(
				`1970-01-01 ${e?.[0]?.get("hour")}:${e?.[0]?.get(
					"minute"
				)}:${e?.[0]?.get("second")}`
			);
			const timeTo = dayjs(
				`1970-01-01 ${e?.[1]?.get("hour")}:${e?.[1]?.get(
					"minute"
				)}:${e?.[1]?.get("second")}`
			);

			const check = compareTime(timeFrom, timeTo, timeTarget);
			return check;
		});
		const total = newData.reduce(
			(amount, data) => amount + data.thanh_tien,
			0
		);
		setTotalAmount(total);
		setData(newData);
	};

	return (
		<div className='px-10'>
			<div className='w-[80%] mx-auto h-fit bg-gray-100 p-10 rounded-lg mt-10'>
				<h1 className='font-semibold text-4xl text-center mb-5'>
					TASK 1: DATA REPORT
				</h1>
				<hr />
				{info ? (
					<Information info={info} />
				) : (
					<p className='my-5 ml-5'>No data, please upload file data!</p>
				)}
				<hr />
				<div className='flex items-center justify-between my-5'>
					<div className='flex gap-5'>
						<Upload {...Props}>
							<Button icon={<MdOutlineFileUpload />}>
								Select File Data (*.xls, *.xlsx, *.csv)
							</Button>
						</Upload>
						<Button
							type='primary'
							loading={loading}
							onClick={handleLoadData}
						>
							Load Data
						</Button>
					</div>

					<a href='/data.xlsx' download>
						<Button type='primary' icon={<FaDownload />}>
							Download Sample Data File
						</Button>
					</a>
				</div>
				{info && (
					<>
						<hr />
						<div className='my-5 flex items-center justify-between'>
							<div>
								<span className='mr-5'>Select time period:</span>
								<TimePicker.RangePicker
									size='middle'
									onChange={(e) => handlePickTime(e)}
								/>
							</div>
							<div>
								<p className='text-lg'>
									<strong>Thành tiền: </strong>
									<span>{formatPrice(totalAmount)}</span>
								</p>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='mt-5'>
				<TableData data={data}></TableData>
			</div>
		</div>
	);
}
