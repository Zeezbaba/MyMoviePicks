import Button from "@/components/common/Button";
import AuthLayout from "@/components/layout/AuthLayout";
import usePost from "@/hooks/usePost";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { BiHide, BiLoaderCircle, BiShow } from "react-icons/bi";

interface LoginData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [form, setForm] = useState<LoginData>({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { postRequest, data, error, loading } = usePost();
  const [createdResponse, setCreatedResponse] = useState<boolean>(false);
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

 
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postRequest(
      "/users/register/",
      form,
      "Account created successfully",
      "Error occured creating account",
      "/auth/login"
    );
  };

  return (
    <AuthLayout>
      <div className="login w-full">
        <h2 className="md:text-2xl">Welcome to My Movie Picks,</h2>
        <p className="text-gray-300 text-sm md:text-base">
          Create an account on My Movie Picks to enjoy trending movies
        </p>
        <form className="my-6 space-y-3" onSubmit={handleSubmit}>
          <div className="email flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={form.username}
              placeholder="Enter your username"
              type="text"
              id="username"
              className="border border-gray-300 p-2 rounded-md text-base w-full"
              onChange={handleChange}
            />
          </div>
          <div className="email flex flex-col gap-">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={form.email}
              placeholder="Enter your email address"
              type="text"
              id="email"
              className="border border-gray-300 p-2 rounded-md text-base w-full"
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
                className=" p-2 text-base w-full outline-none"
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

          <Button
            name="Sign up"
            styles={`${
              loading && "opacity-50"
            } bg-blue-500 w-full py-2 rounded-lg cursor-pointer shadow-md tracking-tight my-3 flex flex-row items-center justify-center gap-2`}
            icon={
              <BiLoaderCircle
                size={20}
                color="white"
                className={`${loading ? "animate-spin" : "hidden"}`}
              />
            }
          />
          <div className="flex items-center justify-center my-5">
            <p>
              Already have an account?{" "}
              <Link href={`/auth/login`} className="text-sky-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
