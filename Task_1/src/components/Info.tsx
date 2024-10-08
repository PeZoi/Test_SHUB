import { InformationStation } from "../models/InformationStation";

interface Props {
	info: InformationStation;
}

export default function Information({ info }: Props) {
	return (
		<div className='flex my-10 text-lg gap-16 leading-8 mx-auto'>
			<div className='flex flex-col'>
				<p>
					<strong>Chuỗi: </strong>
					<span>{info?.chuoi}</span>
				</p>
				<p>
					<strong>Từ ngày: </strong>
					<span>{info?.tu_ngay}</span>
				</p>
				<p>
					<strong>Tổng tiền: </strong>
					<span>{info?.tong_tien}</span>
				</p>
			</div>
			<div className='flex flex-col'>
				<p>
					<strong>Trạm: </strong>
					<span>{info?.tram}</span>
				</p>
				<p>
					<strong>Đến ngày: </strong>
					<span>{info?.den_ngay}</span>
				</p>
				<p>
					<strong>Tổng lít: </strong>
					<span>{info?.tong_lit}</span>
				</p>
			</div>
		</div>
	);
}
