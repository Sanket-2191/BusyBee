import { useDispatch, useSelector } from "react-redux";
import { storeSelector } from "../reducers/storeReducer";
import { addToCart, removeFromCart } from "../reducers/cartReducer";

export const Product = ({ product, fromCart }) => {

    const dispatch = useDispatch();

    // // Find product by id
    // const product = products.find(p => p.id === id);

    if (!product) return <p>Product not found</p>; // Handle case where product is not found

    return (
        <div className="card card-compact bg-slate-600 w-[25%] shadow-xl m-2">
            <figure>
                <img
                    src={product.image || 'fallback-image-url.jpg'} // Fallback for missing image
                    alt={product.title || 'Product image'}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p>
                {fromCart && <div className="card-actions justify-end">
                    <div className="w-[100%] flex justify-around items-center" >
                        <button className="btn btn-primary" onClick={() => dispatch(removeFromCart({ productId: product.id, remove: false }))}>-</button>
                        {product.quantity}
                        <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>+</button>
                    </div>

                </div>}
                <div>
                    ${product.price}
                </div>
                {fromCart ? <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => dispatch(removeFromCart({ productId: product.id, remove: true }))}>Remove from cart</button>
                </div> : <div className="card-actions justify-around">

                    {
                        product.addedToCart ?
                            <button className="btn btn-warning"
                                onClick={() => dispatch(removeFromCart({ productId: product.id, remove: true }))}>
                                Remove from cart
                            </button> :
                            <button className="btn btn-primary"
                                onClick={() => dispatch(addToCart(product))}>
                                Add to cart
                            </button>

                    }

                </div>}
            </div>
        </div >
    );
};
