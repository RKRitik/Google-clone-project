import { Button } from "@/components/ui/button";
import { AllGoogleApps, CurrentUserInfo } from "@/app/header/index";

export default function LensHeader() {
  return (
    <div className="p-[8px] flex justify-between items-center bg-white">
      <GoogleLogo />
      <div className="flex items-center">
        <Button>Upload</Button>
        <div className="flex gap-2 pl-[30px]">
          <AllGoogleApps />
          <CurrentUserInfo />
        </div>
      </div>
    </div>
  );
}

function GoogleLogo() {
  return (
    <a href={"/"} className="flex text-[22px] font-medium pl-[12px]">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </a>
  );
}
