"use client";
import { registerAdminAccount, registerUserAccount } from "@/actions/auth";
import InputWithLabel from "@/components/atom/InputWithLabel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUpPage() {
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
      const response = await registerUserAccount(form);

      if (response) {
        alert("Buat Akun User Berhasil!");
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <main className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="flex flex-row gap-x-44 justify-between">
        <div className="flex flex-col gap-y-24 mt-5 w-[380px]">

          <div className="flex flex-row gap-x-5 items-center">
            <img src="/gambar/logobpbatam.png" className="h-[72px]"/>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold leading-snug tracking-wide text-[#202020]">Register</h1>
              <p className="text-base font-medium leading-normal tracking-wide text-[#3C3C3C]">User access</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-12">
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
              Register
              </Button>
              </form>
            </div>
          </div>
        </div>

        <div>
          <img src="/gambar/Port Illustration.png" className="h-[650px] w-[410px]"/>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
