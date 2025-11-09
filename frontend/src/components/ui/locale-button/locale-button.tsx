import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const LocalButton: React.FC<ButtonProps> = ({
  variant = "secondary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "px-3 py-1 rounded-md transition-all";
  const variantStyles = {
    primary: "bg-black text-white",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
  };

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
