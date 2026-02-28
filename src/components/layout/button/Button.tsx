import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/utils/constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({
		outline = false,
		children,
		backgroundColor = "bg-primary",
		spacing = true,
		capitalize = true,
		className = "",
		type,
		disabled,
		...props
	}, ref) => {
		return (
			<button
				disabled={disabled}
				type={type}
				ref={ref}
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
				{...props}
			>
				{children}
			</button>
		);
	});

Button.displayName = "Button"

export default Button;
