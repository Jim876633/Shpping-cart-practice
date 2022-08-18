//Fake Store API：https://fakestoreapi.com/products/1
import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { useState, useEffect } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [addProducts, setAddProducts] = useState([]);
    const [showCategoriesClass, setShowCategoriesClass] = useState(false);
    const showCategoriesHandler = (IsShow) => {
        setShowCategoriesClass(IsShow);
    };
    const addProductHandler = (product, addmoreProduct) => {
        const [sameProduct] = addProducts.filter(
            (item) => item.id === product.id
        );
        if (sameProduct) {
            const newProducts = addProducts.map((item) => {
                if (addmoreProduct && item.id === product.id) {
                    item.amount += product.amount;
                } else if (!addmoreProduct && item.id === product.id) {
                    item.amount += 1;
                }
                return item;
            });
            setAddProducts(newProducts);
        } else {
            setAddProducts((prev) => [...prev, product]);
        }
    };
    const removeProductHandler = (product) => {
        if (product.amount === 1) {
            const newProducts = addProducts.filter(
                (item) => item.id !== product.id
            );
            return setAddProducts(newProducts);
        }
        const newProducts = addProducts.map((item) => {
            if (item.id === product.id) {
                item.amount -= 1;
                return item;
            } else {
                return item;
            }
        });

        setAddProducts(newProducts);
    };
    const fetchProducts = async () => {
        try {
            const res = await fetch("https://fakestoreapi.com/products/");
            const data = await res.json();
            setProducts(data);
            setLoading(false);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    if (loading) {
        return (
            <div>
                <Header />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <ProductCtx.Provider
            value={{
                product: addProducts,
                addProductHandler: addProductHandler,
                removeProductHandler: removeProductHandler,
            }}
        >
            <Header showCategoriesHandler={showCategoriesHandler} />
            <Menu products={products} showCategories={showCategoriesClass} />
        </ProductCtx.Provider>
    );
}
export const ProductCtx = React.createContext({
    product: [],
    addProductHandler: () => {},
    removeProductHandler: () => {},
});
export default App;
