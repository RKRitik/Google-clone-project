import { Button } from "@/components/ui/button";

export default function Searchbar() {
  return (
    <div className="w-auto max-w-[584px] mx-auto mb-[8px] p-[20px]">
      <SearchInput />
      <div className="flex items-center justify-center pt-[18px] ">
        <Button className="mx-[4px] my-[11px]">Google Search</Button>
        <Button className="mx-[4px] my-[11px]">I&apos;m Feeling Lucky</Button>
      </div>
    </div>
  );
}

export function SearchInput() {
  return <input className="w-[582px]" />;
}
