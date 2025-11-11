/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/ui/form";
import { SignInSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import SubmitButton from "@/components/shared/SubmitButton";
import ToastNotification from "@/components/shared/ToastNotification";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";

const SignInForm = () => {
  const router = useRouter();
    const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      const res = await login(values).unwrap();
       // ✅ Extract token & user from response
      const token = res?.data?.token;
      const user = res?.data?.user;

      // ✅ Dispatch to Redux store
      dispatch(setCredentials({ token, user }));

      ToastNotification({
        title: "Successful",
        description: res?.message,
        type: "success",
      });
      router.push("/marketing");

    } catch (error: any) {
      ToastNotification({
        title: "Error",
        description: error?.data?.error,
        type: "error",
      });
      // console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your email"
          variant="h-[40px] w-full bg-white"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          variant="h-[40px] w-full bg-white"
          rightIcon={
            showPassword ? (
              <Eye className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            ) : (
              <EyeOff className="cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
            )
          }
        />

        <p onClick={() => router.push("/reset-password")} className="cursor-pointer font-jakarta text-sm">
          Forgot password?&nbsp;
          <span className="text-main-600">Reset Password </span>
        </p>
        <SubmitButton isLoading={isLoading} loadingText="Logging In..." className="w-full h-[50px] mt-2 cursor-pointer">
          Submit
        </SubmitButton>
      </form>
      <p onClick={() => router.push("/sign-up")} className="text-center cursor-pointer mt-4 font-jakarta text-base">
        Don’t have an account?&nbsp;
        <span className="text-main-600">Sign Up</span>
      </p>
    </Form>
  );
};

export default SignInForm;
