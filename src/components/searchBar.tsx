import React from "react";

interface searchBarProps {
  placeholderText: string;
  handleSearch: (e: any) => void;
  searchVal: string;
  isSticky: boolean;
}

export default function SearchBar({
  handleSearch,
  placeholderText,
  searchVal,
  isSticky = false,
}: searchBarProps) {
  return (
    <input
      onChange={handleSearch}
      placeholder={placeholderText}
      value={searchVal}
      data-default=""
      className={`roboto mb3 f5 f4-ns normal ba br3 pa2  ${
        isSticky && "sticky"
      }`}
    />
  );
}
