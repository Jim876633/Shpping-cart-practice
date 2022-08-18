import { useState, useEffect } from "react";
import Category from "./Category";
import Products from "./Products";

const Menu = ({ products, showCategories }) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const categories = [
        "all",
        ...new Set(products.map((item) => item.category)),
    ];
    const [categoryItems, setCategoryItems] = useState(products);
    const filterItemsHandler = (category) => {
        setCategoryIndex(categories.findIndex((item) => item === category));
        if (category === "all") {
            setCategoryItems(products);
            return;
        }
        const filterItems = products.filter(
            (item) => item.category === category
        );
        setCategoryItems(filterItems);
    };
    return (
        <div>
            <div className={`categories ${showCategories ? "show" : ""}`}>
                {categories.map((category, index) => (
                    <Category
                        categoryIndex={categoryIndex}
                        id={index}
                        key={index}
                        category={category}
                        filterItems={filterItemsHandler}
                    />
                ))}
            </div>
            <Products products={categoryItems} />
        </div>
    );
};
export default Menu;
