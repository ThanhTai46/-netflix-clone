import React, { useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
interface InputProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  id?: string;
  showPassword?: boolean;
  label: string;
  type: "text" | "email" | "number" | "password";
  register: any;
}

const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  showPassword,
  type,
  register,
  ...props
}) => {
  const [togglePassword, setTogglePassword] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          id={name}
          type={type === "password" && togglePassword === true ? "text" : type}
          {...register(name)}
          name={name}
          {...props}
          className="block rounded-sm px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700
        appearance-none focus:outline-none focus:ring-0 peer
    "
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3"
        >
          {label}
        </label>
        {showPassword && (
          <span
            className="text-[#8c8c8c] absolute top-1/4 right-3  
          peer-placeholder-shown
          cursor-pointer"
            onClick={() => setTogglePassword(!togglePassword)}
          >
            {togglePassword ? "HIDE" : "SHOW"}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
