"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import Input from "@/components/reused/Input";
import Button from "@/components/reused/Button";
import Dropdown from "@/components/reused/Dropdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+\d{1,3}\d{10}$/, "Please enter phone number"),
    password: z
      .string()
      .min(
        8,
        "Create a password which has at least 8 characters and includes at least 1 upper case letter. 1 lower case letter and 1 number."
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter and 1 number"
      )
      .max(25, "Password cant exceed 25 characters"),
    confirmPassword: z.string().min(1, "Please confirm password"),
    region: z.string().min(1, "Please select region"),
    privacy: z.literal(true, { message: "Please accept privacy policy" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must be same",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      region: "",
      privacy: true,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          phone: data.phone,
          password: data.password,
          region: data.region,
          avatar: "https://i.ibb.co/0jjGpHKz/indian-5154773.png",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.log(result.message);
        return;
      }

      reset();
      router.push("/register/thankyou");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center px-10 py-[77px] gap-8"
      >
        <h1 className="text-4xl font-bold ">
          <span className="text-[#F29145]">Nexus</span>
          <span>Hub</span>
        </h1>
        <div className="bg-[#262626] border border-[#383B42] flex flex-col p-6 rounded gap-8 max-w-md">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl">Create Account</h2>
            <hr className="text-[#383B42]" />
          </div>
          <div className="flex flex-col gap-6">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Your Email"
                  error={fieldState.error?.message}
                  isError={true}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  label="Mobile Number"
                  placeholder="+(Code country) 9 digit mobile number"
                  error={fieldState.error?.message}
                  isError={true}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Password"
                  error={fieldState.error?.message}
                  isError={true}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  error={fieldState.error?.message}
                  isError={true}
                />
              )}
            />
            <Controller
              name="region"
              control={control}
              render={({ field, fieldState }) => (
                <Dropdown
                  {...field}
                  label="Country or region"
                  variant="countries"
                  size="large"
                  error={fieldState.error?.message}
                  isError={true}
                />
              )}
            />
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-4">
                <Controller
                  name="privacy"
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <p className="text-wrap">
                  By creating an account and check, you agree to the{" "}
                  <span className="text-[#F29145]">Conditions of Use</span> and{" "}
                  <span className="text-[#F29145]">Privacy Notice.</span>
                </p>
              </div>
              <p
                className={`${
                  errors.privacy ? "opacity-100" : "opacity-0"
                } text-[#EF4444] text-[12px] h-5`}
              >
                {errors.privacy?.message}
              </p>
            </div>
            <Button
              type="submit"
              desc="Create Account"
              className="w-full! max-w-none!"
            />
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};
export default RegisterPage;
