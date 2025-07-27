import Button from "@/components/common/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import { authbg } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((content) => {
      return {
        ...content,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <AuthLayout>
      <div className="login w-full">
        <h2 className="md:text-2xl">Welcome back,</h2>
        <p className="text-gray-300 text-sm md:text-base">Sign in to your account</p>
        <form className="my-6 space-y-3" onSubmit={handleSubmit}>
          <div className="email flex flex-col gap-">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={form.email}
              placeholder="Enter your email address"
              type="text"
              id="email"
              className="border border-gray-300 p-2 rounded-md text-sm md:text-base w-full"
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <span className="border border-gray-300 rounded-md  flex items-center">
              <input
                name="password"
                value={form.password}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                id="password"
                className=" p-2 text-sm md:text-base w-full outline-none"
                onChange={handleChange}
              />
              {showPassword ? (
                <BiHide
                  size={20}
                  className="cursor-pointer mr-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <BiShow
                  size={20}
                  className="cursor-pointer mr-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </span>
          </div>
          <p className="text-right">Forgot password?</p>
          <Button
            name="Sign in"
            styles="bg-blue-500 w-full py-2 rounded-lg cursor-pointer shadow-md tracking-tight"
            action={() => router.push("/")}
          />
          <div className="flex items-center justify-center my-5">
            <p>
              Don't have an account?{" "}
              <Link href={`/auth/signup`} className="text-sky-500">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
