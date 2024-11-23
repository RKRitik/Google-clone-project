"use client";
import MicIcon from "@/public/mic_icon.svg";
import LensIcon from "@/public/lens_icon.svg";
import SearchIcon from "@/public/search_icon.svg";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function Searchbar() {
  return (
    <div className="w-auto max-w-[584px] mx-auto mb-[8px] p-[20px]">
      <SearchInput />
      <SearchButtons />
    </div>
  );
}

function SearchButtons({
  className = "",
  btnClass = "",
}: {
  className?: string;
  btnClass?: string;
}) {
  return (
    <div className={`flex items-center justify-center pt-[18px] ${className} `}>
      <Button className={`mx-[4px] my-[11px] ${btnClass}`}>
        Google Search
      </Button>
      <Button className={`mx-[4px] my-[11px] ${btnClass}`}>
        I&apos;m Feeling Lucky
      </Button>
    </div>
  );
}

export function SearchInput() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function handleMic() {
    alert("mic");
  }
  function handleFocus() {
    setDropdownOpen(true);
  }
  function handleBlur() {
    setDropdownOpen(false);
  }
  return (
    <div
      className={`flex relative ${
        dropdownOpen
          ? "bg-[#303134] rounded-t-[24px] "
          : "bg-[#4d5156] hover:bg-[#5f6368] rounded-[24px]"
      } pr-[8px] `}
    >
      <Image
        className="mx-[14px] fill-[#e8e8e8]"
        height="18"
        width="18"
        src={SearchIcon}
        alt="Search Icon"
      />
      <input
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`py-[11px] border-none active:outline-none focus:outline-none bg-transparent w-[582px]`}
      />
      {dropdownOpen && <SearchDropdown />}
      <RenderMicIcon onClick={handleMic} />
      <RenderLensIcon onClick={handleMic} />
    </div>
  );
}

function SearchDropdown() {
  const remmondations = [
    "12",
    "wasdsad12",
    "asdasdasdasd22",
    "222",
    "11111",
    "222",
    "222222",
  ];
  return (
    <div className="absolute z-[5] top-[100%] bg-[#303134] w-full rounded-b-[24px] ">
      <div className="h-[300px] px-[14px]">
        {remmondations.map((val) => (
          <div key={val}>{val}</div>
        ))}
      </div>
      <SearchButtons btnClass="bg-[#3c4043]" className="pt-[0px] mt-auto" />
    </div>
  );
}

function RenderMicIcon({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            onClick={onClick}
            className="cursor-pointer mx-[8px]"
            height="24"
            width="24"
            src={MicIcon}
            alt="Mic Icon"
          />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-[12px] p-[4px] bg-black text-slate-300"
        >
          Search by voice
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function RenderLensIcon({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            onClick={onClick}
            className="cursor-pointer ml-[8px] mr-[16px]"
            height="24"
            width="24"
            src={LensIcon}
            alt="Lens Icon"
          />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-[12px] p-[4px] bg-black border-[0.5px] text-slate-300"
        >
          Search by Image
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
