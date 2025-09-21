import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

const FilterDropdown = ({ initialValues, onApply }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    setMinPrice(initialValues.minPrice || "");
    setMaxPrice(initialValues.maxPrice || "");
  }, [initialValues]);

  const handleApply = (e) => {
    e.stopPropagation();
    onApply({ minPrice, maxPrice });
  };

  return (
    <div
      className="dropdown filter-dropdown"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="filter-dropdown__title">Select price</h3>
      <div className="filter-dropdown__inputs">
        <Input
          type="number"
          id="minPrice"
          className="form-group__input"
          placeholder="From"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type="number"
          id="maxPrice"
          className="form-group__input"
          placeholder="To"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <Button
        onClick={handleApply}
        variant="primary"
        className="filter-dropdown__apply-button"
      >
        Apply
      </Button>
    </div>
  );
};

export default FilterDropdown;
