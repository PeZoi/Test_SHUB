import { Button, DatePicker, Form, Input, message, Select } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import FloatLabel from "./components/FloatLabel";
import { useForm } from "antd/es/form/Form";
import type { FormProps } from "antd";

interface FormType {
	thoi_gian: string;
	so_luong: number;
	tru: string;
	doanh_thu: number;
	don_gia: number;
}

export default function App() {
	const [form] = useForm();

	const onFinish: FormProps<FormType>["onFinish"] = (values) => {
		message.success("Cập nhật thành công");
		console.log("Success:", values);
		form.resetFields();
	};

	return (
		<Form form={form} onFinish={onFinish}>
			<div>
				<div className='h-28 shadow-lg '>
					<div className='w-[50%] mx-auto flex justify-between my-5'>
						<div>
							<p className='flex items-center gap-2 cursor-pointer group'>
								<FaArrowLeft />
								<span className='font-semibold group-hover:ml-1 transition-all'>
									Đóng
								</span>
							</p>
							<h3 className='text-4xl font-bold mt-3'>Nhập giao dịch</h3>
						</div>
						<div>
							<Button type='primary' htmlType='submit'>
								Cập nhật
							</Button>
						</div>
					</div>
				</div>
				<div className='w-[50%] mx-auto my-5 font-semibold text-gray-500 flex flex-col'>
					<Form.Item
						name={"thoi_gian"}
						rules={[
							{
								required: true,
								message: "Thời gian không được để trống",
							},
						]}
					>
						<FloatLabel
							label='Thời gian'
							value={form.getFieldValue("thoi_gian")}
						>
							<DatePicker
								name={"thoi_gian"}
								format={"DD/MM/YYYY HH:mm:ss"}
								className='w-full h-10'
								showTime
								placeholder=''
								onChange={(_, dateString) => {
									form.setFieldsValue({ thoi_gian: dateString });
								}}
							/>
						</FloatLabel>
					</Form.Item>
					<Form.Item
						name={"so_luong"}
						rules={[
							{
								required: true,
								message: "Số lượng không được để trống",
							},
							{
								type: "number",
								message: "Số lượng phải là con số",
								validateTrigger: "onBlur",
							},
						]}
					>
						<FloatLabel
							label='Số lượng'
							value={form.getFieldValue("so_luong")}
						>
							<Input
								name={"so_luong"}
								onChange={(e) => {
									form.setFieldsValue({ so_luong: +e.target.value });
								}}
							/>
						</FloatLabel>
					</Form.Item>
					<Form.Item
						name={"tru"}
						rules={[
							{
								required: true,
								message: "Trụ không được để trống",
							},
						]}
					>
						<FloatLabel label='Trụ' value={form.getFieldValue("tru")}>
							<Select
								className='w-full font-semibold text-gray-500'
								defaultValue={""}
								options={[
									{ value: "tru_1", label: "Trụ 1" },
									{ value: "tru_2", label: "Trụ 2" },
									{ value: "tru_3", label: "Trụ 3" },
								]}
								onChange={(value) => {
									form.setFieldsValue({ tru: value });
								}}
							/>
						</FloatLabel>
					</Form.Item>
					<Form.Item
						name={"doanh_thu"}
						rules={[
							{
								required: true,
								message: "Doanh thu không được để trống",
							},
							{ type: "number", message: "Doanh thu phải là con số" },
						]}
					>
						<FloatLabel
							label='Doanh thu'
							value={form.getFieldValue("doanh_thu")}
						>
							<Input
								onChange={(e) => {
									form.setFieldsValue({ doanh_thu: +e.target.value });
								}}
							/>
						</FloatLabel>
					</Form.Item>
					<Form.Item
						name={"don_gia"}
						rules={[
							{ required: true, message: "Đơn giá không được để trống" },
							{ type: "number", message: "Đơn giá phải là con số" },
						]}
					>
						<FloatLabel
							label='Đơn giá'
							value={form.getFieldValue("don_gia")}
						>
							<Input
								onChange={(e) => {
									form.setFieldsValue({ don_gia: +e.target.value });
								}}
							/>
						</FloatLabel>
					</Form.Item>
				</div>
			</div>
		</Form>
	);
}
