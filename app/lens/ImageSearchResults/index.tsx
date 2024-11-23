import { Button } from "@/components/ui/button";

export function ImageSearchResults() {
  const imageSearchResults = generateImageSearchResults();
  return (
    <div className="max-h-screen pl-[24px] relative overflow-scroll w-1/2 bg-yellow-700 grid grid-cols-4 gap-4">
      {imageSearchResults.map((result) => (
        <div className="h-[50px]" key={result.title}>
          {result.title}
        </div>
      ))}
      <FeedbackBanner />
    </div>
  );
}

function FeedbackBanner() {
  return (
    <div className="fixed flex pl-[24px] w-[50%] items-center bg-white  bottom-[0px] justify-between">
      <div className="text-slate-400 font-medium text-[14px]">
        Did you find these results useful?
      </div>
      <div className="flex">
        <Button>Yes</Button>
        <Button>No</Button>
      </div>
    </div>
  );
}

const generateImageSearchResults = () => {
  const results = Array.from({ length: 200 }, (_, index) => ({
    title: `Image Title ${index + 1}`,
    description: `This is a description for Image ${
      index + 1
    }. It provides brief details about the image.`,
    link: `https://example.com/image${index + 1}.jpg`,
  }));
  return results;
};
