import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const FilterDropdown = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(priceRange);
  };

  return (
    <div className="dropdown filter-dropdown">
      <h3 className="filter-dropdown__title">Select price</h3>
      <div className="filter-dropdown__inputs">
        <Input
          id="from"
          name="from"
          label="From *"
          type="number"
          value={priceRange.from}
          onChange={handleChange}
        />
        <Input
          id="to"
          name="to"
          label="To *"
          type="number"
          value={priceRange.to}
          onChange={handleChange}
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
