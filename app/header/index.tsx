import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export default function Header() {
  const links1 = [
    { name: "About", link: "/ll" },
    { name: "Store", link: "/sss" },
  ];
  const links2 = [
    { name: "Gmail", link: "/ll" },
    { name: "Images", link: "/sss" },
  ];
  return (
    <div className="w-full text-[14px] text-[#E8E8E8] p-[6px]">
      <div className="flex flex-col md:justify-around sm:flex-col md:flex-row lg:justify-between">
        <div className="flex justify-center  items-center gap-[10px] md:justify-start pl-[15px]">
          {links1.map((link) => (
            <a href={link.link} className="hover:underline" key={link.name}>
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex gap-[15px] items-center justify-center md:justify-start">
          {links2.map((link) => (
            <a href={link.link} className="hover:underline" key={link.name}>
              {link.name}
            </a>
          ))}
          <AllGoogleApps />
          <CurrentUserInfo />
        </div>
      </div>
    </div>
  );
}
function GoogleAccountTooltipInfo() {
  return (
    <div className="border-none">
      <div>Google Account</div>
      <div className="opacity-50">Ritik Khatri</div>
      <div className="opacity-50">khatri.ritik16@gmail.com</div>
    </div>
  );
}

export function AllGoogleApps() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="rounded-full p-[4px] hover:bg-slate-400/50 transition-all duration-300 ">
          <Image
            src={"/9.png"}
            className="p-[4px]"
            alt="9dot"
            height={32}
            width={32}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-none">
          Google apps
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function CurrentUserInfo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="p-[4px]">
            <div className="flex items-center hover:ring-4 ring-slate-400/50 transition-all duration-300 justify-center h-[40px] p-[8px] w-[40px] rounded-full bg-violet-700 text-white font-semibold text-[15px]">
              R
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-none">
          <GoogleAccountTooltipInfo />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
