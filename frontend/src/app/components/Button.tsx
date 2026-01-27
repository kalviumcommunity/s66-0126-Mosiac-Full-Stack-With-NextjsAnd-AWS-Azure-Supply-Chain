import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  type = "button",
  className = "",
  variant = "primary",
  ...props
}: ButtonProps): React.ReactElement {
  const baseStyles = "font-bold py-2 px-4 rounded transition duration-200";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white",
    secondary: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white",
    outline: "border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
