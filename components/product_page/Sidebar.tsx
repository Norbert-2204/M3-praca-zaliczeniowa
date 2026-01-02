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
  const [filter, setFilter] = useState("all");
  const [selectCurrency, setSelectCurrency] = useState("usd");

  const handleLoadMore = () => {
    setLoadMore((prev) => !prev);
  };

  return (
    <div className="max-w-[363px] min-w-[320px] flex flex-col p-4 sm:p-10 sticky right-0 gap-13">
      <div>
        <Dropdown
          variant="custom"
          options={[
            { label: "Category", value: "category" },
            { label: "Brand", value: "brand" },
          ]}
          value={selectFilter}
          onChange={(val) => setSelectFilter(String(val))}
          isDark={true}
        />
        {selectFilter === "category" ? (
          <div className="flex flex-col gap-5 p-2">
            <Input
              variant="checkbox"
              label="All"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
            <Input
              variant="checkbox"
              label="Mouse"
              checked={filter === "mouse"}
              onChange={() => setFilter("mouse")}
            />
            <Input
              variant="checkbox"
              label="Keyboard"
              checked={filter === "keyboard"}
              onChange={() => setFilter("keyboard")}
            />
            <Input
              variant="checkbox"
              label="Monitor"
              checked={filter === "monitor"}
              onChange={() => setFilter("monitor")}
            />
            <Input
              variant="checkbox"
              label="Headphone"
              checked={filter === "headphone"}
              onChange={() => setFilter("headphone")}
            />
            {loadMore ? (
              <div className="flex flex-col gap-5 ">
                <Input
                  variant="checkbox"
                  label="Webcam"
                  checked={filter === "webcam"}
                  onChange={() => setFilter("webcam")}
                />
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
            <Input
              variant="checkbox"
              label="All"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
            <Input
              variant="checkbox"
              label="ROG"
              checked={filter === "rog"}
              onChange={() => setFilter("rog")}
            />
            <Input
              variant="checkbox"
              label="AOC"
              checked={filter === "aoc"}
              onChange={() => setFilter("aoc")}
            />
            <Input
              variant="checkbox"
              label="Rexus"
              checked={filter === "rexus"}
              onChange={() => setFilter("rexus")}
            />
            <Input
              variant="checkbox"
              label="Razer"
              checked={filter === "razer"}
              onChange={() => setFilter("razer")}
            />
            {loadMore ? (
              <div className="flex flex-col gap-5 ">
                <Input
                  variant="checkbox"
                  label="JBL"
                  checked={filter === "jbl"}
                  onChange={() => setFilter("jbl")}
                />
                <Input
                  variant="checkbox"
                  label="Logitech"
                  checked={filter === "logitech"}
                  onChange={() => setFilter("logitech")}
                />
                <Input
                  variant="checkbox"
                  label="Other"
                  checked={filter === "other"}
                  onChange={() => setFilter("other")}
                />
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
        <Dropdown
          variant="custom"
          options={[{ label: "Price", value: "price" }]}
        />
        <div className="flex items-start w-full">
          <Input
            className="bg-[#262626] rounded-none max-w-[145px]"
            sizes="dropdown"
            placeholder="$ 10.00"
          />
          <Dropdown
            variant="custom"
            size="input"
            options={[
              { label: "USD", value: "usd" },
              { label: "EUR", value: "eur" },
            ]}
            value={selectCurrency}
            onChange={(val) => setSelectCurrency(String(val))}
            fullWidth={false}
            className="bg-[#262626]! border border-[#616674]"
          />
        </div>
        <div className="flex items-start w-full">
          <Input
            className="bg-[#262626] rounded-none max-w-[145px]"
            sizes="dropdown"
            placeholder="$ 20.00"
          />
          <Dropdown
            variant="custom"
            size="input"
            options={[
              { label: "USD", value: "usd" },
              { label: "EUR", value: "eur" },
            ]}
            value={selectCurrency}
            onChange={(val) => setSelectCurrency(String(val))}
            fullWidth={false}
            className="bg-[#262626]! border border-[#616674] "
          />
        </div>
      </div>
    </div>
  );
};
export default SideBar;
