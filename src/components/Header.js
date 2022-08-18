import { useState, useContext } from "react";
import { AiOutlineShop, AiOutlineShoppingCart } from "react-icons/ai";
import { FaPlusCircle, FaMinusCircle, FaBars } from "react-icons/fa";
import { ProductCtx } from "../App";
const Header = ({ showCategoriesHandler }) => {
    const { product, removeProductHandler, addProductHandler } =
        useContext(ProductCtx);
    const totalPrice = product.reduce(
        (total, item) => total + item.price * item.amount,
        0
    );
    const [showModal, setShowModal] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    return (
        <header>
            <div className="logo">
                <a href="#">
                    <AiOutlineShop />
                </a>
            </div>
            <button
                className="categories_bar"
                onClick={() => {
                    setShowCategories(() => !showCategories);
                    showCategoriesHandler(!showCategories);
                }}
            >
                <FaBars />
            </button>
            <button
                className="basket"
                onClick={() => {
                    setShowCategories(() => false);
                    showCategoriesHandler(false);
                    setShowModal(!showModal);
                }}
            >
                <AiOutlineShoppingCart className="basket_icon" />
                <span className="basket_number">{product.length}</span>
            </button>
            <div className={`modal ${showModal ? "show" : ""}`}>
                {product.length === 0 ? (
                    <p className="modal_emptyText">No products exist</p>
                ) : (
                    product.map((item) => {
                        const { id, title, image, price, amount } = item;
                        return (
                            <div className="modal_product" key={id}>
                                <div className="modal_image">
                                    <img src={image} alt={title} />
                                </div>
                                <span className="modal_price">$ {price}</span>
                                <button
                                    className="modal_minusBtn"
                                    onClick={() => removeProductHandler(item)}
                                >
                                    <FaMinusCircle className="minusIcon" />
                                </button>
                                <span className="modal_amount">{amount}</span>
                                <button
                                    className="modal_addBtn"
                                    onClick={() =>
                                        addProductHandler(item, false)
                                    }
                                >
                                    <FaPlusCircle className="addIcon" />
                                </button>
                            </div>
                        );
                    })
                )}
                <div className="modal_total">
                    {product.length !== 0
                        ? `Total : $ ${totalPrice.toFixed(2)}`
                        : ""}
                </div>
            </div>
        </header>
    );
};
export default Header;
