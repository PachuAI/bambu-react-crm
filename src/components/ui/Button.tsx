import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "primary", className = "", ...rest }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-neutral-200 hover:bg-neutral-300 text-neutral-900",
    ghost: "bg-transparent hover:bg-neutral-100 text-neutral-900",
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;