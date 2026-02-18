import React, { InputHTMLAttributes, memo } from "react";
import Label from "./Label";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  about?: string;
  alert?: string;
  children?: React.ReactNode;
};

const Input: React.FC<InputProps> = memo(
  ({
    label = "",
    about = "",
    alert = "",
    children,
    id = label?.toLowerCase().replaceAll(" ", "-"),
    autoComplete = "off",
    ...restInputProps
  }) => (
    <div className="flex flex-col">
      <Label about={about} label={label} htmlFor={id} />
      <div className="relative w-full">
        <input id={id} autoComplete={autoComplete} {...restInputProps} />
        {children && (
          <div className="absolute right-1.5 bottom-1.5">{children}</div>
        )}
      </div>
      {alert && <p className="text-red-500 text-xs mt-1">{alert}</p>}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
