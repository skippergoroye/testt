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

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [login, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      router.push("/marketing")
       ToastNotification({
        title: "Successful",
        description: "Login SUccessfully",
        type: "success",
      });
      console.log(values)
    } catch (error) {
      console.log(error)
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
        <SubmitButton loadingText="Logging In..." className="w-full h-[50px] mt-2 cursor-pointer">
          Submit
        </SubmitButton>
      </form>
      <p onClick={() => router.push("/sign-up")} className="text-center cursor-pointer mt-4 font-jakarta text-base">
        Don’t have an account?&nbsp;
        <span className="text-main-600">Sign up</span>
      </p>
    </Form>
  );
};

export default SignInForm;
