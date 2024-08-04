"use client";
import { loginAdminAccount } from "@/actions/auth";
import InputWithLabel from "@/components/atom/InputWithLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("hello")
      const response = await loginAdminAccount(form);
      if (response) {
        alert("Login Berhasil!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      alert(error)
      router.refresh();
    }
  }
  return (
    <main className="container mx-auto flex justify-center h-screen md:h-auto md:min-h-screen pt-8 pb-8">
      <div className="flex flex-row gap-x-44 justify-between items-start">
        <div className="flex flex-col gap-y-16 w-[380px]">

          <div className="flex flex-row gap-x-5 items-center">
            <img src="/gambar/logobpbatam.png" className="h-[72px]"/>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold leading-snug tracking-wide text-[#202020]">Login</h1>
              <p className="text-base font-medium leading-normal tracking-wide text-[#3C3C3C]">Admin access</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-8">
            {/* form email & password */}
            <div className="flex flex-col gap-y-12">
              <form onSubmit={handleSubmit}>
                <div>
                  <InputWithLabel
                    className={"border-b-2 focus:outline-none"}
                    name={"email"}
                    value={form.email}
                    onChange={handleChange}
                    isRequired={true}
                    label={"Email"}
                    placeholder={"example@gmail.com"}
                  />
                  <InputWithLabel
                    className={"border-b-2 focus:outline-none"}
                    name={"password"}
                    value={form.password}
                    onChange={handleChange}
                    label={"Password"}
                    placeholder={"********"}
                    type={"password"}
                    isRequired={true}
                  />
                </div>
              </form>
            </div>

             {/* Button login & register */}
            <div>
              <form className="flex flex-row gap-x-6 items-center" onSubmit={handleSubmit}>
              <Button
              type={"submit"}
              className={"text-base font-semibold px-10 py-3 rounded-2xl border-white border hover:bg-[#2563C8]"}
              >
              Login
              </Button>
              <Link href={"/admin/signup"} className="text-base font-semibold leading-normal text-[#2C71E1] hover:text-[#282828]">
              Signup
              </Link>
              </form>
            </div>
          </div>
        </div>

        <div>
          <img src="/gambar/Port Illustration.png" className="h-[540px] w-[330px]"/>
        </div>
      </div>
      
      {/* <form
        onSubmit={handleSubmit}
        className="p-8 bg-primary text-white rounded-xl w-3/4 flex flex-col justify-center items-center"
      >
        <h1 className="text-2xl font-semibold">Login Admin Account</h1>
        <div className="w-full ">
          <InputWithLabel
            name={"email"}
            value={form.email}
            onChange={handleChange}
            isRequired={true}
            label={"Email"}
            placeholder={"example@gmail.com"}
          />
          <InputWithLabel
            name={"password"}
            value={form.password}
            onChange={handleChange}
            label={"Password"}
            placeholder={"********"}
            type={"password"}
            isRequired={true}
          />
        </div>
        <Button
          type={"submit"}
          className={"border-white border hover:bg-zinc-600"}
        >
          Login
        </Button>
      </form> */}
    </main>
  );
}

export default LoginPage;
