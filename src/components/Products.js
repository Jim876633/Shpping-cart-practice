import React, { useContext, useRef, useState } from "react";
import { ProductCtx } from "../App";
const Products = ({ products }) => {
    const { addProductHandler } = useContext(ProductCtx);
    const [amountIsValid, setAmountIsValid] = useState(false);
    const refValue = useRef([]);
    const onSubmitHandler = (index, item) => {
        const enterdAmount = refValue.current[index].value;
        const enterdAmountNumber = +enterdAmount;
        if (
            enterdAmount.trim().length === 0 ||
            enterdAmountNumber < 1 ||
            enterdAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }
        setAmountIsValid(true);
        addProductHandler(
            {
                ...item,
                amount: enterdAmountNumber,
            },
            true
        );
    };
    return (
        <div className="products">
            {products.map((item, index) => {
                return (
                    <section key={item.id} className="product">
                        <div className="product_image">
                            <img src={item.image} alt="" className="image" />
                        </div>
                        <div className="product_text">
                            <h2 className="product_title">{item.title}</h2>
                            <p className="product_desc">
                                {item.description.length + item.title.length <=
                                180
                                    ? item.description
                                    : item.description.substring(0, 180) +
                                      "..."}
                            </p>
                        </div>
                        <form
                            className="product_add"
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmitHandler(index, item);
                            }}
                        >
                            <p className="product_price">
                                Price : ${item.price.toFixed(2)}
                            </p>
                            <input
                                type="number"
                                id={item.id}
                                defaultValue="1"
                                max="5"
                                min="1"
                                step="1"
                                ref={(el) => (refValue.current[index] = el)}
                            />
                            <button className="addBtn">Add</button>
                        </form>
                    </section>
                );
            })}
        </div>
    );
};

export default Products;
