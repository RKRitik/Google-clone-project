import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const LOCAL_SEARCH_KEY = "ls-serch-key";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function addSearchToLs(term: string): void {
  // Retrieve the existing terms from localStorage
  const storedTerms = JSON.parse(
    localStorage.getItem(LOCAL_SEARCH_KEY) || "[]"
  );

  // Ensure the term doesn't already exist
  if (!storedTerms.includes(term)) {
    // Add the new term to the beginning of the list
    storedTerms.unshift(term);

    // Keep only the latest 10 terms
    const limitedTerms = storedTerms.slice(0, 10);

    // Save back to localStorage
    localStorage.setItem(LOCAL_SEARCH_KEY, JSON.stringify(limitedTerms));
  }
}

export function searchFromLs(term?: string, max_count: number): string[] {
  // Retrieve the existing terms from localStorage
  const storedTerms = JSON.parse(
    localStorage.getItem(LOCAL_SEARCH_KEY) || "[]"
  );

  if (term) {
    // Filter the terms containing the provided search term
    return storedTerms
      .filter((storedTerm: string) =>
        storedTerm.toLowerCase().includes(term.toLowerCase())
      )
      .slice(0, max_count); // Limit to 10 results
  }

  // If no term is provided, return the latest 10 terms
  return storedTerms.slice(0, max_count);
}

export function deleteKeywordFromLS(term: string): void {
  // Retrieve the stored keywords from localStorage
  const storedTerms = JSON.parse(
    localStorage.getItem(LOCAL_SEARCH_KEY) || "[]"
  );

  // Check if the term exists in the stored list
  if (Array.isArray(storedTerms)) {
    const updatedTerms = storedTerms.filter(
      (keyword: string) => keyword !== term
    );

    // Update localStorage with the filtered list
    localStorage.setItem(LOCAL_SEARCH_KEY, JSON.stringify(updatedTerms));
  }
}

