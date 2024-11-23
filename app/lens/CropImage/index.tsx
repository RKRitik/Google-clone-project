import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CropAndSearchImage() {
  //set state, search mode -> search, text, translate or put in href
  return (
    <div className="flex flex-col w-1/2 bg-black relative px-[24px] pt-[24px] pb-[84px]">
      <div className="flex w-full">
        <Button className="mx-auto">Find image source</Button>
      </div>
      <ImageCropComponent />
      <SearchTypeSelection />
    </div>
  );
}

function ImageCropComponent() {
  return (
    <div className="w-full bg-purple-600 mt-[24px] h-full">Image here</div>
  );
}

function SearchTypeSelection() {
  return (
    <div className="w-full mt-[24px] flex">
      <Tabs defaultValue="search" className="mx-auto">
        <TabsList>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="translate">Translate</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
