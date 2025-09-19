import React from "react";

const cleanLabel = (label) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = label;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Pagination = ({ paginationData, onPageChange }) => {
  if (
    !paginationData ||
    !paginationData.links ||
    paginationData.links.length <= 3
  ) {
    return null;
  }

  const { current_page, last_page, links } = paginationData;

  let pageLinks = [];
  if (links.length > 7) {
    pageLinks.push(links[0]);
    pageLinks.push(links[1]);

    if (current_page > 3) {
      pageLinks.push({
        url: null,
        label: "...",
        active: false,
        isEllipsis: true,
      });
    }

    for (let i = current_page - 1; i <= current_page + 1; i++) {
      if (i > 1 && i < last_page) {
        pageLinks.push(links[i]);
      }
    }

    if (current_page < last_page - 2) {
      pageLinks.push({
        url: null,
        label: "...",
        active: false,
        isEllipsis: true,
      });
    }

    pageLinks.push(links[last_page]);
    pageLinks.push(links[links.length - 1]);
  } else {
    pageLinks = links;
  }

  return (
    <nav className="pagination-container">
      {pageLinks.map((link, index) => {
        const label = cleanLabel(link.label);
        const isPrev = label.includes("Previous");
        const isNext = label.includes("Next");

        if (link.isEllipsis) {
          return (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          );
        }

        return (
          <button
            key={link.label}
            disabled={!link.url}
            onClick={() => link.url && onPageChange(link.url)}
            className={`
                            pagination-button 
                            ${link.active ? "pagination-button--active" : ""}
                            ${!link.url ? "pagination-button--disabled" : ""}
                        `}
          >
            {isPrev ? "‹" : isNext ? "›" : label}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
