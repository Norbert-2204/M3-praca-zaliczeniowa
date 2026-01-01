"use client";

import { useState } from "react";

import Button from "../reused/Button";
import Input from "../reused/Input";
import Dropdown from "../reused/Dropdown";
import PlusSmall from "@/icons/plusSmall";
import MinusSmall from "@/icons/minusSmall";

const SideBar = () => {
  const [loadMore, setLoadMore] = useState(false);
  const [selectFilter, setSelectFilter] = useState("category");
  const [selectCurrency, setSelectCurrency] = useState("usd");

  const handleLoadMore = () => {
    setLoadMore((prev) => !prev);
  };

  return (
    <div className="max-w-[363px] min-w-[320px] flex flex-col p-10 sticky right-0 gap-13">
      <div>
        <Dropdown
          variant="custom"
          options={[
            { label: "Category", value: "category" },
            { label: "Brand", value: "brand" },
          ]}
          value={selectFilter}
          onChange={(val) => setSelectFilter(val)}
        />
        {selectFilter === "category" ? (
          <div className="flex flex-col gap-5 p-2">
            <Input variant="checkbox" label="All" />
            <Input variant="checkbox" label="Mouse" />
            <Input variant="checkbox" label="Keyboard" />
            <Input variant="checkbox" label="Monitor" />
            <Input variant="checkbox" label="Headphone" />
            {loadMore ? (
              <div className="flex flex-col gap-5 ">
                <Input variant="checkbox" label="Webcam" />
                <Button
                  onClick={handleLoadMore}
                  variant="ghost"
                  desc={loadMore ? "Load less" : "Load more"}
                  icon={loadMore ? <MinusSmall /> : <PlusSmall />}
                  className="text-[#E7E7E7]! justify-start text-base p-0!"
                />
              </div>
            ) : (
              <Button
                onClick={handleLoadMore}
                variant="ghost"
                desc={loadMore ? "Load less" : "Load more"}
                icon={loadMore ? <MinusSmall /> : <PlusSmall />}
                className="text-[#E7E7E7]! justify-start text-base p-0!"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5 p-2">
            <Input variant="checkbox" label="All" />
            <Input variant="checkbox" label="ROG" />
            <Input variant="checkbox" label="AOC" />
            <Input variant="checkbox" label="Rexus" />
            <Input variant="checkbox" label="Razer" />
            {loadMore ? (
              <div className="flex flex-col gap-5 ">
                <Input variant="checkbox" label="JBL" />
                <Input variant="checkbox" label="Logitech" />
                <Input variant="checkbox" label="Other" />
                <Button
                  onClick={handleLoadMore}
                  variant="ghost"
                  desc={loadMore ? "Load less" : "Load more"}
                  icon={loadMore ? <MinusSmall /> : <PlusSmall />}
                  className="text-[#E7E7E7]! justify-start text-base p-0!"
                />
              </div>
            ) : (
              <Button
                onClick={handleLoadMore}
                variant="ghost"
                desc={loadMore ? "Load less" : "Load more"}
                icon={loadMore ? <MinusSmall /> : <PlusSmall />}
                className="text-[#E7E7E7]! justify-start text-base p-0!"
              />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 px-2.5">
        <Dropdown variant="custom" />
        <div className="flex items-start ">
          <Input className="bg-[#262626] rounded-none" sizes="dropdown" />
          <Dropdown
            variant="custom"
            size="input"
            className="bg-[#262626]! border border-[#616674] w-[107px]!"
          />
        </div>
        <div className="flex">
          <Input className="bg-[#262626] rounded-none" sizes="dropdown" />
          <Dropdown
            variant="custom"
            size="input"
            className="bg-[#262626]! border border-[#616674] w-[107px]!"
          />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
