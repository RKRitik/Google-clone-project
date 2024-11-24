"use client"; // Add this line at the top
import MicIcon from "@/public/mic_icon.svg";
import LensIcon from "@/public/lens_icon.svg";
import SearchIcon from "@/public/search_icon.svg";
import ClockIcon from "@/public/clock.svg";
import Trending from "@/public/trending.svg";

import { useRouter } from "next/navigation";
import { useOnClickOutside } from "usehooks-ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  addSearchToLs,
  debounce,
  deleteKeywordFromLS,
  searchFromLs,
} from "@/lib/utils";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function onSearch() {
    if (!query) {
      return;
    }
    addSearchToLs(query);
    router.push(`/search?q=${query}`);
  }

  return (
    <div className="w-auto max-w-[584px] mx-auto mb-[8px] p-[20px]">
      <SearchInput query={query} setQuery={setQuery} />
      <SearchButtons onSearch={onSearch} />
    </div>
  );
}

function SearchButtons({
  className = "",
  btnClass = "",
  onSearch = () => {},
}: {
  className?: string;
  btnClass?: string;
  onSearch: () => void;
}) {
  return (
    <div className={`flex items-center justify-center pt-[18px] ${className} `}>
      <Button onClick={onSearch} className={`mx-[4px] my-[11px] ${btnClass}`}>
        Google Search
      </Button>
      <Button onClick={onSearch} className={`mx-[4px] my-[11px] ${btnClass}`}>
        I&apos;m Feeling Lucky
      </Button>
    </div>
  );
}

export function SearchInput({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  function handleMic() {
    router.push("/lens");
  }
  function handleFocus() {
    setDropdownOpen(true);
  }
  function handleClickOutside() {
    setDropdownOpen(false);
  }
  useOnClickOutside(ref, handleClickOutside);
  return (
    <div
      ref={ref}
      className={`flex relative ${
        dropdownOpen
          ? "bg-[#303134] rounded-t-[24px] "
          : "bg-[#4d5156] hover:bg-[#5f6368] rounded-[24px]"
      } pr-[8px] `}
    >
      <Image
        className="mx-[14px] fill-[#e8e8e8]"
        height="18"
        width="18"
        src={SearchIcon}
        alt="Search Icon"
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        className={`py-[11px] shadow-sm border-none active:outline-none focus:outline-none bg-transparent w-[582px]`}
      />
      {dropdownOpen && <SearchDropdown searchQuery={query} />}
      <RenderMicIcon onClick={handleMic} />
      <RenderLensIcon onClick={handleMic} />
    </div>
  );
}

function SearchDropdown({ searchQuery = "" }: { searchQuery: string }) {
  const MAX_LIST_ITEMS = 10;
  const [recommendations, setRecommendations] = useState<
    { word: string; score: number; tags?: string[] }[]
  >([]);
  const [localSearchSaved, setLocalSearchSaved] = useState<string[]>(() =>
    searchFromLs("", MAX_LIST_ITEMS)
  );
  const router = useRouter();
  const [trending, setTrending] = useState<string[]>([]);

  const debouncedFetch = useMemo(() => {
    return debounce((query: string, limit: number) => {
      fetchRecommendations(query, limit);
    }, 400);
  }, []);

  const fetchRecommendations = async (
    query: string,
    limit: number
  ): Promise<number> => {
    if (!query.trim()) {
      setRecommendations([]);
      return 0;
    }
    try {
      const response = await fetch(
        `https://api.datamuse.com/words?ml=${query}&max=${limit}`
      );
      const data = await response.json();
      setRecommendations(data);
      return data.length; // Return the count of recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]);
      return 0;
    }
  };
  // Fetch trending words
  const fetchTrendingWords = useCallback(
    async (limit: number, searchQuery?: string) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${
            searchQuery || ""
          }&limit=${limit}`
        );
        let data = await response.json();
        data = data.products?.map(
          (product: { id: number; title: string }) => product.title
        );
        setTrending(data.slice(0, limit));
      } catch (error) {
        console.error("Error fetching trending words:", error);
        setTrending([]);
      }
    },
    []
  );

  useEffect(() => {
    const updateLists = async () => {
      // Fetch local results
      const localResults = searchFromLs(searchQuery || "", MAX_LIST_ITEMS);
      setLocalSearchSaved(localResults);

      let remainingSlots = MAX_LIST_ITEMS - localResults.length;
      let fetchedRecommendations;
      if (remainingSlots > 0) {
        fetchedRecommendations = await fetchRecommendations(
          searchQuery,
          remainingSlots
        );
        remainingSlots -= fetchedRecommendations;
      }
      if (remainingSlots > 1) {
        const trendingWordCount = remainingSlots - 1; // Reserve one row for the header
        fetchTrendingWords(trendingWordCount, searchQuery);
      } else {
        setTrending([]);
      }
    };

    updateLists();
  }, [searchQuery, debouncedFetch, fetchTrendingWords]);

  const handleDelete = (val: string) => {
    deleteKeywordFromLS(val); // Delete from local storage
    setLocalSearchSaved((prev) => prev.filter((item) => item !== val)); // Update state
  };

  function handleSearch(text: string) {
    if (!text) {
      return;
    }
    addSearchToLs(text);
    router.replace(`/search?q=${text}`);
  }

  return (
    <div className="absolute z-[5] top-[100%] bg-[#303134] w-full rounded-b-[24px] ">
      <div className="border-t-[1px] border-[#5f6368] mx-[14px] mb-[2px]"></div>
      <div className="h-[300px] text-[16px]">
        {localSearchSaved.map((val) => (
          <div
            onClick={handleSearch.bind(null, val)}
            className="flex items-center py-[4px] gap-[13px] hover:bg-[#3c4043] group px-[14px] rounded-[3px]"
            key={val}
          >
            <Image
              src={ClockIcon}
              className="fill-[#c4c4c4] stroke-[#c4c4c4] ml-[1px]"
              height="18"
              width="18"
              alt="clock"
            />
            <span className="text-[#c58af9]">{val}</span>
            <a
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(val);
              }}
              className="cursor-pointer hidden ml-auto hover:underline text-[#e8e8e8]/50 text-[12px] group-hover:flex"
            >
              Delete
            </a>
          </div>
        ))}
        {recommendations.map((val) => (
          <div
            onClick={handleSearch.bind(null, val.word)}
            className="flex justify-start items-center gap-[13px] hover:bg-[#3c4043] py-[4px] px-[14px] rounded-[3px]"
            key={val.word}
          >
            <Image
              className="fill-[#e8e8e8] ml-[1px]"
              height="18"
              width="18"
              src={SearchIcon}
              alt="Search Icon"
            />
            <div>{val.word}</div>
          </div>
        ))}
        {!!trending.length && (
          <div className="flex justify-start items-center hover:bg-[#3c4043] gap-[13px] py-[6px] px-[14px] rounded-[3px]">
            Trending Searches
          </div>
        )}
        {trending.map((val) => (
          <div
            onClick={handleSearch.bind(null, val)}
            className="flex justify-start items-center gap-[13px] hover:bg-[#3c4043] py-[6px] px-[14px] rounded-[3px]"
            key={val}
          >
            <Image
              className="fill-[#e8e8e8]"
              height="18"
              width="18"
              src={Trending}
              alt="Trending Icon"
            />
            {val}
          </div>
        ))}
      </div>
      <SearchButtons
        onSearch={handleSearch.bind(null, searchQuery)}
        btnClass="bg-[#3c4043]"
        className="pt-[0px] mt-auto"
      />
    </div>
  );
}

function RenderMicIcon({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            onClick={onClick}
            className="cursor-pointer mx-[8px]"
            height="24"
            width="24"
            src={MicIcon}
            alt="Mic Icon"
          />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-[12px] p-[4px] bg-black text-slate-300"
        >
          Search by voice
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function RenderLensIcon({ onClick }: { onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            onClick={onClick}
            className="cursor-pointer ml-[8px] mr-[16px]"
            height="24"
            width="24"
            src={LensIcon}
            alt="Lens Icon"
          />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-[12px] p-[4px] bg-black border-[0.5px] text-slate-300"
        >
          Search by Image
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
