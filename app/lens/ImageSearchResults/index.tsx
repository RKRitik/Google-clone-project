import { Button } from "@/components/ui/button";
import Image from "next/image";

export async function ImageSearchResults() {
  const imageSearchResults = await generateImageSearchResults();
  return (
    <div className="p-[24px] pb-[75px] relative overflow-scroll w-1/2 bg-white grid grid-cols-4 gap-4">
      {imageSearchResults.map((result, index) => (
        <a
          className="flex flex-col justify-center cursor-pointer"
          href={result.link}
          key={result.title}
        >
          <Image
            className="rounded-xl"
            width={result.width}
            height={result.height}
            alt={"img" + index}
            src={result.image}
          ></Image>
          <div className="text-[rgb(60,64,67)] text-[12px]">{result.title}</div>
        </a>
      ))}
      <FeedbackBanner />
    </div>
  );
}

function FeedbackBanner() {
  return (
    <div className="fixed flex pl-[24px] w-[50%] items-center bg-white bottom-[0px] border-t-[1px] border-[rgba(241,243,244,255)] justify-between px-[16px]">
      <div className="text-slate-400 font-medium text-[14px]">
        Did you find these results useful?
      </div>
      <div className="flex">
        <Button variant="secondary">Yes</Button>
        <Button variant="secondary">No</Button>
      </div>
    </div>
  );
}

const generateImageSearchResults = async (responseCount = 50) => {
  const randomColor = () =>
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
  const blobToBase64 = async (blob: Blob): Promise<string> => {
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${blob.type};base64,${base64}`;
  };

  const fetchImage = async (index: number) => {
    const width = 200 + index * 20; // Example of varying width
    const height = 400 + index * 10; // Example of varying height
    const bgColor = randomColor(); // Random background color
    const textColor = randomColor(); // Random text color
    const link = `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}?text=Lorem Ipsum Random${index}`;

    const response = await fetch(link);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);

    return {
      id: index,
      title: `Lorem Ipsum Random ${index + 1}`,
      link: `/random/${index + 1}`,
      image: base64,
      width,
      height,
    };
  };

  // Generate 'responseCount' number of image requests concurrently
  const results = await Promise.all(
    Array.from({ length: responseCount }, (_, index) => fetchImage(index))
  );

  return results;
};
