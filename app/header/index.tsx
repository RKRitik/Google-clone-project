import Image from "next/image";
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
          <Image src={"/9dot.png"} alt="9dot" height={32} width={32} />
          <div className="flex items-center justify-center h-[40px] p-[8px] w-[40px] rounded-full bg-violet-700 text-white font-semibold text-[15px]">
            R
          </div>
        </div>
      </div>
    </div>
  );
}
