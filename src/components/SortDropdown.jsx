import React from "react";

// Updated sort options to match the design
const SORT_OPTIONS = [
  { value: "created_at", label: "New products first" },
  { value: "price", label: "Price, low to high" },
  { value: "-price", label: "Price, high to low" },
];

const SortDropdown = ({ activeSort, onSelect }) => {
  return (
    <div className="sort-dropdown" onClick={(e) => e.stopPropagation()}>
      <h3 className="sort-dropdown__title">Sort by</h3>
      {SORT_OPTIONS.map((option) => (
        <div
          key={option.value}
          className={`sort-dropdown__item ${
            activeSort === option.value ? "sort-dropdown__item--active" : ""
          }`}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SortDropdown;
