import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/lib";
import toast from "react-hot-toast";
import {LoginResponse, TLoginSchema} from "@/types";
import axios from "axios";

const domain = process.env.NEXT_PUBLIC_HEADLESS_WEB_URL;

interface Props {
  closeAuthPopup: Dispatch<SetStateAction<boolean>>;
  setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
}

export const LoginForm: React.FC<Props> = ({ closeAuthPopup, setAuthMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const res = await axios.post<LoginResponse>(`${domain}/api/auth/login`, {
        email: data.email,
        password: data.password
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success("Successfully logged in!");

      closeAuthPopup(false);
      reset();

    } catch (error) {
      toast.error("Failed to login. Please try again.");

      console.log("Login error: ", error);
    }

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm text-gray-700 mb-1">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm pt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Password</label>
        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm pt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Sign In
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don&#39;t have an account?{" "}
        <button
          disabled={isSubmitting}
          type="button"
          className="text-black font-medium hover:underline"
          onClick={() => setAuthMode("register")}
        >
          Sign In
        </button>
      </p>
    </form>
  );
};
