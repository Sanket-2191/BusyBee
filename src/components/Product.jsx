import { useSelector } from "react-redux";
import { storeSelector } from "../reducers/storeReducer";

export const Product = ({ id }) => {
    const { products } = useSelector(storeSelector);

    // Find product by id
    const product = products.find(p => p.id === id);

    if (!product) return <p>Product not found</p>; // Handle case where product is not found

    return (
        <div className="card card-compact bg-slate-600 w-60 shadow-xl m-2">
            <figure>
                <img
                    src={product.image || 'fallback-image-url.jpg'} // Fallback for missing image
                    alt={product.title || 'Product image'}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};
