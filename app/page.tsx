import Image from "next/image";
import Searchbar from "./common-components/searchbar";
import LanguageSwitch from "./common-components/Languageswitch";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex max-h-[92px] h-full">
        <Image
          alt="Google Image"
          className="mt-auto"
          height={92}
          width={272}
          src={
            "https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png"
          }
        />
      </div>
      <Searchbar />
      <LanguageSwitch />
    </div>
  );
}

