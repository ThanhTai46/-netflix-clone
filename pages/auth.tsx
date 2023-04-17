/* eslint-disable @next/next/no-img-element */
// import { apiPath } from "@/common/path";
import Input from "@/components/common/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupScheme } from "@/lib/schema";
import { toast } from "react-toastify";
import { configToast } from "@/common/common";
import { apiPath } from "@/common/path";
import { message } from "@/common/message";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { NextPageContext } from "next";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function Auth() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signupScheme),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [variant, setVariant] = useState("login");
  const email = getValues("email");
  const password = getValues("password");

  const session = getSession();
  console.log("session: ", session);
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const onSubmit = async (data: FormData) => {
    await handleRegister(data);
    await reset({
      username: "",
      email: "",
      password: "",
    });
  };

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      router.push("/profiles");
      toast.success(message.LOGIN_SUCCESS, configToast);
    } catch (error) {
      toast.error(message.ERROR, configToast);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues("email"), getValues("password")]);
  const handleRegister = useCallback(
    async (data: FormData) => {
      try {
        await axios.post(apiPath.register, {
          ...data,
        });
        toast.success(message.REGISTER_SUCCESS, configToast);

        login();
      } catch (err) {
        toast.error(message.ERROR, configToast);
      }
    },
    [login]
  );

  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpeg')] 
  bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black lg:bg-opacity-50 w-full h-full">
        <nav className="px-12 py-5">
          <img
            onClick={() => router.push("/")}
            src="/images/logo.png"
            alt="logo"
            className="h-12 cursor-pointer"
          />
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
                  showPassword
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
                onClick={
                  variant === "login" ? () => login() : () => handleRegister
                }
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Login" : "Register"}
              </button>

              <div className="flex flex-row items-center justify-center gap-4 mt-8">
                <div
                  className="w-10 h-10 rounded-full bg-white flex justify-center items-center hover:opacity-80 cursor-pointer transition"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/profiles",
                    })
                  }
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  className="w-10 h-10 rounded-full bg-white flex justify-center items-center hover:opacity-80 cursor-pointer transition"
                  onClick={() =>
                    signIn("facebook", {
                      callbackUrl: "/profiles",
                    })
                  }
                >
                  <BsFacebook size={30} className="text-[#3F51B5]" />
                </div>
              </div>
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
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}
