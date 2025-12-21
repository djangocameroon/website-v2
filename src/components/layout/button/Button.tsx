import { ReactNode } from "react";
import { cn } from "@/utils/constants";

interface ButtonProps {
	backgroundColor?: string;
	children: ReactNode;
	onClick?: () => void;
	capitalize?: boolean;
	outline?: boolean;
	spacing?: boolean;
	className?: string;
	type?: "submit" | "reset" | "button";
	disabled?: boolean;
}

const Button = ({
	outline = false,
	children,
	backgroundColor = "bg-primary",
	spacing = true,
	capitalize = true,
	className = "",
	type,
	disabled,
}: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			type={type}
			// className={` ${
			//   outline === true ? 'btn-outline' : ''
			// } capitalize py-5 my-4 px-7 rounded-2xl whitespace-nowrap transition-all hover:-translate-y-2 text-white md:text-[1.125rem] leading-[18px] font-medium nohemi-font ${backgroundColor} `}
			className={cn(
				"py-5 px-7 rounded-2xl whitespace-nowrap transition-all hover:-translate-y-2 text-white md:text-[1.125rem] max-md:text-base leading-[18px] font-medium nohemi-font disabled:bg-[#5F6368]",
				backgroundColor,
				className,
				{
					"btn-outline": outline,
					"my-4": spacing,
					"capitalize": capitalize
				}
			)}
		>
			{children}
		</button>
	);
};

export default Button;
