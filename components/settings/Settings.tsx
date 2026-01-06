import { useAuth } from "@/context/AuthContext";
import { useAlert } from "@/context/AlertContext";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Image from "next/image";
import Button from "../reused/Button";
import Input from "../reused/Input";
import Dropdown from "../reused/Dropdown";

const settingsSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "Name must have at least 3 letters")
      .optional(),
    lastName: z
      .string()
      .min(3, "Last name must have at least 3 letters")
      .optional(),
    email: z.string().email("Invalid email").optional(),
    address: z
      .string()
      .min(8, "Address must have at least 8 characters")
      .optional(),
    phone: z
      .string()
      .regex(
        /^\+\d{1,3}\d{10}$/,
        "Please enter phone number with country code (+..)"
      )
      .optional(),
    region: z.string(),
    password: z.string().optional(),
    newPassword: z
      .string()
      .max(25, "Password can't exceed 25 characters")
      .optional()
      .refine(
        (val) =>
          !val ||
          (val.length >= 8 &&
            /[A-Z]/.test(val) &&
            /[a-z]/.test(val) &&
            /\d/.test(val)),
        {
          message:
            "Password must be at least 8 characters, include 1 uppercase, 1 lowercase and 1 number",
        }
      ),
  })
  .refine(
    (data) => {
      if (data.newPassword) return !!data.password;
      return true;
    },
    {
      message: "Current password is required to set a new password",
      path: ["password"],
    }
  );

type RegisterForm = z.infer<typeof settingsSchema>;

const Settings = () => {
  const { user } = useAuth();
  const { addAlert } = useAlert();

  const maskPhone = (phone?: string) => {
    if (!phone) return "";

    const visibleDigits = 2;
    const maskedLength = phone.length - visibleDigits;

    return "*".repeat(maskedLength) + phone.slice(-visibleDigits);
  };

  const { handleSubmit, control, reset, setError } = useForm<RegisterForm>({
    resolver: zodResolver(settingsSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      address: user?.address,
      phone: maskPhone(user?.phone),
      region: user?.region,
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof settingsSchema>) => {
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.error === "Invalid password") {
          setError("password", {
            type: "manual",
            message: "Current password is incorrect",
          });
          return addAlert("Current password is incorrect", "fail");
        }
        return addAlert(result.error || "Something went wrong", "fail");
      }

      addAlert("Profile updated successfully");
      reset({
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        address: result.user.address,
        phone: result.user.phone,
        region: result.user.region,
        password: undefined,
        newPassword: undefined,
      });
    } catch (error) {
      console.error(error);
      addAlert("Server error", "fail");
    }
  };

  const updateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch("/api/user/avatar", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok)
      return addAlert(result.error || "Failed to update avatar", "fail");

    addAlert("Avatar updated successfully");
  };

  return (
    <div className="flex flex-col gap-12 p-6 bg-[#262626] border border-[#383B42] w-full max-w-[972px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">My Profile</h1>
        <p>Organize profile info for account control and security</p>
        <hr className="text-[#383B42] w-full" />
      </div>
      <div className="flex gap-12">
        <div className="flex flex-col items-center gap-6 ">
          <div className="rounded-full">
            {user?.avatar && (
              <Image
                src={user.avatar}
                alt="avatar"
                width={220}
                height={220}
                className="object-cover rounded-full"
              />
            )}
          </div>
          <div className="relative">
            <Button
              desc="Upload photo"
              variant="ghost"
              colors="white"
              sizes="averageReverse"
              className="border rounded"
            />
            <Input
              onChange={updateAvatar}
              type="file"
              className="absolute opacity-0 top-0 z-10 cursor-pointer"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full"
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Name"
                isError={true}
                settings={true}
                className="max-w-[400px]"
                placeholder={user?.firstName}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Last name"
                className="max-w-[400px]"
                settings={true}
                isError={true}
                placeholder={user?.lastName}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Email"
                className="max-w-[400px]"
                settings={true}
                isError={true}
                placeholder={user?.email}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Address"
                className="max-w-[400px]"
                settings={true}
                isError={true}
                placeholder={user?.address}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                label="Phone"
                className="max-w-[400px]"
                settings={true}
                isError={true}
                placeholder={maskPhone(user?.phone)}
                error={fieldState.error?.message}
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
                defaultValue={user?.region}
                isUpdate={true}
              />
            )}
          />
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="Password"
                    className="max-w-[400px]"
                    settings={true}
                    isError={true}
                    type="password"
                    placeholder="Current password"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    label="New Password"
                    className="max-w-[400px]"
                    settings={true}
                    isError={true}
                    type="password"
                    placeholder="New password"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="flex gap-4 self-end">
              <Button
                desc="Reset"
                colors="white"
                variant="ghost"
                className="border border-[#41444F] w-[132px]"
                sizes="averageReverse"
              />
              <Button desc="Update profile" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Settings;
