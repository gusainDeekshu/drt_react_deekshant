"use client";
import { FC, useState, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(term);
    }
  };

  return (
    <input
      className="w-full p-3 rounded-lg border border-slate-600 bg-slate-900 text-white"
      placeholder="Search by Name or NORAD ID"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
