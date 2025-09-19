import React from "react";

const SortDropdown = ({ onSelect }) => {
  const sortOptions = [
    "New products first",
    "Price, low to high",
    "Price, high to low",
  ];

  return (
    <div className="dropdown sort-dropdown">
      <h3 className="sort-dropdown__title">Sort by</h3>
      {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="sort-dropdown__option"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SortDropdown;
