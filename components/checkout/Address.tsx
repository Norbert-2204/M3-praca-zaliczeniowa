"use client";
import { useEffect, useState } from "react";
import Button from "../reused/Button";
import Dropdown from "../reused/Dropdown";
import { countriesWithPostal } from "@/utils/countries";
import Input from "../reused/Input";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useCheckoutAddress } from "@/context/AddressContext";

const Address = () => {
  const { user } = useAuth();
  const { setCheckoutAddress } = useCheckoutAddress();
  const [isSelected, setIsSelected] = useState("exist");
  const [countryCode, setCountryCode] = useState<string>("");
  const [newAddress, setNewAddress] = useState("");
  const [saveAsMain, setSaveAsMain] = useState(false);

  const userCountry = countriesWithPostal.find((c) => c.code === user?.region);

  const selectedCountry = countriesWithPostal.find(
    (c) => c.code === countryCode
  );

  useEffect(() => {
    if (user?.address && user?.region && isSelected === "exist") {
      setCheckoutAddress({
        mode: "exist",
        address: user.address,
        country: user.region,
      });
    }
  }, [user, isSelected, setCheckoutAddress]);

  useEffect(() => {
    if (isSelected === "new") {
      setCheckoutAddress({
        mode: "new",
        address: newAddress,
        country: countryCode,
        saveAsMain,
      });
    }
  }, [isSelected, newAddress, countryCode, saveAsMain, setCheckoutAddress]);

  return (
    <div className="flex w-full flex-col gap-8 p-6  border border-[#383B42] bg-[#262626] rounded">
      <div className="flex w-full justify-between">
        <div
          onClick={() => setIsSelected("exist")}
          className={`flex border-b-2 w-full justify-center cursor-pointer ${
            isSelected === "exist"
              ? "border-[#F29145] text-[#F29145]"
              : "text-[#B0B0B0] border-[#383B42]"
          }`}
        >
          <h2 className="text-lg">Existing address</h2>
        </div>
        <div
          onClick={() => setIsSelected("new")}
          className={`flex border-b-2 w-full justify-center cursor-pointer ${
            isSelected === "new"
              ? "border-[#F29145] text-[#F29145]"
              : "text-[#B0B0B0] border-[#383B42]"
          }`}
        >
          <h2 className="text-lg">New address</h2>
        </div>
      </div>
      {isSelected === "exist" ? (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <h3 className="text-lg">Address</h3>
              <Button
                desc="Main address"
                colors="white"
                bgColors="dark"
                className="py-2.5! px-1.5! cursor-default!"
              />
            </div>
            <h3 className="text-lg">
              {user?.address || <Link href={"/settings"}>Update profile</Link>}
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">Country</h3>
              <h3>
                {user?.region || <Link href={"/settings"}>Update profile</Link>}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">Province</h3>
              <h3>
                {userCountry?.province || (
                  <Link href={"/settings"}>Update profile</Link>
                )}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">City</h3>
              <h3 className="text-lg">
                {userCountry?.capital || (
                  <Link href={"/settings"}>Update profile</Link>
                )}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg">Postal code</h3>
              <h3 className="text-lg">
                {userCountry?.postalCode || (
                  <Link href={"/settings"}>Update profile</Link>
                )}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 ">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col sm:flex-row gap-[41px]">
              <Dropdown
                variant="countries"
                onChange={(value) => setCountryCode(String(value))}
              />
              <Dropdown
                variant="custom2"
                options={
                  selectedCountry
                    ? [
                        {
                          label: selectedCountry.province,
                          value: selectedCountry.province,
                        },
                      ]
                    : []
                }
              />
            </div>
            <div className="flex flex-col sm:flex-row  gap-[41px]">
              <Dropdown
                variant="custom2"
                options={
                  selectedCountry
                    ? [
                        {
                          label: selectedCountry.capital,
                          value: selectedCountry.capital,
                        },
                      ]
                    : []
                }
              />
              <Dropdown
                variant="custom2"
                options={
                  selectedCountry
                    ? [
                        {
                          label: selectedCountry.postalCode,
                          value: selectedCountry.postalCode,
                        },
                      ]
                    : []
                }
              />
            </div>
          </div>
          <div className="h-[130px]">
            <Input
              placeholder="Input complete address"
              variant="textfield"
              sizes="textfield"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-4 ">
            <Input
              variant="checkbox"
              checked={saveAsMain}
              onChange={() => {
                const newVal = !saveAsMain;
                setSaveAsMain(newVal);

                if (newVal) {
                  setCheckoutAddress({
                    mode: "new",
                    address: user?.address || "",
                    country: user?.region || "",
                    saveAsMain: true,
                  });
                }
              }}
            />
            <h3 className="text-lg">Make it the main address</h3>
          </div>
        </div>
      )}
    </div>
  );
};
export default Address;
