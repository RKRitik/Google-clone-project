export default function Footer() {
  const topLink = {
    name: "India",
    link: "/india",
  };
  const links1 = [
    {
      name: "Advertising",
      link: "/ll",
    },
    {
      name: "Business",
      link: "/b",
    },
    {
      name: "How Search works",
      link: "/llaa",
    },
  ];
  const links2 = [
    {
      name: "Privacy",
      link: "/ll",
    },
    {
      name: "Terms",
      link: "/b",
    },
    {
      name: "Settings",
      link: "/llaa",
    },
  ];
  return (
    <div className="fixed bottom-[0px] w-full text-[14px] text-[#E8E8E8] bg-[#171717]">
      <div className="px-[30px] py-[15px]  border-b-[1px] border-b-[#313335] text-[15px]">
        {topLink.name}
      </div>
      <div className="flex flex-col px-[20px] md:justify-around sm:flex-col md:flex-row lg:justify-between">
        <div className="flex justify-center md:justify-start">
          {links1.map((link) => (
            <a
              href={link.link}
              className="p-[15px] hover:underline"
              key={link.name}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex justify-center md:justify-start">
          {links2.map((link) => (
            <a
              href={link.link}
              className="p-[15px] hover:underline"
              key={link.name}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
