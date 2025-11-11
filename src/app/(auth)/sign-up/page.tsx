"use client";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";
import TextBox from "@/components/auth/TextBox";
import Link from "next/link";
import SignUpForm from "./_components/SignUpForm";

const SignUp = () => {
  return (
    <div className="mx-auto flex flex-col py-10 px-6 lg:px-16 w-[600px]">
      <Link href="/">
        <Image src={Logo} height={1000} width={1000} alt="patient" className="h-10 w-fit" />
      </Link>

      <div className="mt-10">
       <TextBox
  title="Welcome back"
  description="Sign up to access a smart email dashboard with fast search, filters, and caching."
  variant="mt-0 text-center justify-center items-center"
/>

        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
