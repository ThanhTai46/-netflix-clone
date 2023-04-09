/* eslint-disable @next/next/no-img-element */
// import { apiPath } from "@/common/path";
import Input from "@/components/common/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupScheme } from "@/lib/schema";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupScheme),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  console.log("errors: ", errors);

  const onSubmit = (data: FormData) => {
    console.log("errors: ", errors);

    console.log(data);
  };
  // const handleRegister = useCallback(async () => {
  //   try {
  //     await axios.post(apiPath.register, {
  //       email,
  //       password,
  //       username,
  //     });
  //   } catch (err) {
  //     console.log("err: ", err);
  //   }
  // }, [email, password, username]);
  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpeg')] 
  bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black lg:bg-opacity-50 w-full h-full">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Create an account"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                {variant === "register" && (
                  <>
                    <Input
                      register={register}
                      name="username"
                      label="Username"
                      id="username"
                      type="text"
                    />
                    {errors && (
                      <span className="text-red-500 text-xs">
                        {errors?.username?.message}
                      </span>
                    )}
                  </>
                )}
                <Input
                  register={register}
                  name="email"
                  label="Email"
                  id="email"
                  type="email"
                />
                {errors && (
                  <span className="text-red-500 text-xs">
                    {errors?.email?.message}
                  </span>
                )}
                <Input
                  register={register}
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                />
                {errors && (
                  <span className="text-red-500 text-xs">
                    {errors?.password?.message}
                  </span>
                )}
              </div>
              <button
                // onClick={handleR}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Register"}
              </button>
            </form>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
