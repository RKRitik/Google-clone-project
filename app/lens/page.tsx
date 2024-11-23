import CropAndSearchImage from "./CropImage";
import { ImageSearchResults } from "./ImageSearchResults";

export default function LensSearch() {
  return (
    <div className="flex border-t-[1px] border-t-[#f0f0f] bg-white h-screen">
      <CropAndSearchImage />
      <ImageSearchResults />
    </div>
  );
}
