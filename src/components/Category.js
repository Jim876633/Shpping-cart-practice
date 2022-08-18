import React from "react";
const Category = ({ category, filterItems, categoryIndex, id }) => {
    return (
        <button
            id={id}
            className={`category_btn ${categoryIndex === id ? "active" : ""}`}
            onClick={() => {
                filterItems(category);
            }}
        >
            {category}
        </button>
    );
};

export default Category;
