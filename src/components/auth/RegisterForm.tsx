import React, {Dispatch, SetStateAction} from 'react';
import {useForm} from "react-hook-form";
import {TSignUpSchema} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {sighUpSchema} from "@/lib";
import {createCustomer} from "@/services";
import toast from "react-hot-toast";

interface Props {
  closeAuthPopup: Dispatch<SetStateAction<boolean>>;
  setAuthMode: Dispatch<SetStateAction<"login" | "register">>;
}

export const RegisterForm: React.FC<Props> = ({ closeAuthPopup, setAuthMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(sighUpSchema)
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const createCustomerRes = await createCustomer(data.email, data.password, data.firstName, data.lastName);

    if (createCustomerRes) {
      toast.success('Account created successfully!');
    } else {
      toast.error('Failed to create account. Please try again.');
    }

    closeAuthPopup(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm text-gray-700 mb-1">First Name</label>
        <input
          {
            ...register("firstName")
          }
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          placeholder="John"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Last Name</label>
        <input
          {
            ...register("lastName")
          }
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black outline-none"
          placeholder="Doe"
        />
      </div>

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
          placeholder="Create a password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm pt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
      >
        Create Account
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          disabled={isSubmitting}
          type="button"
          className="text-black font-medium hover:underline"
          onClick={() => setAuthMode("login")}
        >
          Sign In
        </button>
      </p>
    </form>
  );
};
