import React, { useState } from "react";

interface Props<T> {
	children: React.ReactNode;
	value: T;
	label: string;
}

export default function FloatLabel<T>({ children, label, value }: Props<T>) {
	const [focus, setFocus] = useState(false);

	const labelClass =
		focus || value || Number.isNaN(value)
			? "absolute left-3 top-1.5 text-[10px] font-normal pointer-events-none transition-all duration-200"
			: "absolute left-3 top-4 text-[15px] font-normal pointer-events-none transition-all duration-200";

	return (
		<div
			className='relative '
			onBlur={() => setFocus(false)}
			onFocus={() => setFocus(true)}
		>
			{children}
			<label className={labelClass + " text-gray-500 font-semibold"}>
				{label}
			</label>
		</div>
	);
}
