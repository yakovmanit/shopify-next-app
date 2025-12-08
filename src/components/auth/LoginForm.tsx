'use client'

import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/lib";
import toast from "react-hot-toast";
import {TLoginSchema} from "@/types";
import {login} from "@/services";
import { useRouter } from "next/navigation";

interface Props {
  closeAuthPopup: Dispatch<SetStateAction<boolean>>;
  setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
}

export const LoginForm: React.FC<Props> = ({ closeAuthPopup, setAuthMode }) => {
  const router = useRouter();

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
      const res = await login(data.email, data.password);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success("Successfully logged in!");

      closeAuthPopup(false);
      reset();

      // To update server-side rendered components
      router.refresh();

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
