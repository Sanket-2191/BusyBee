import { useSelector } from "react-redux";
import { storeSelector } from "../reducers/storeReducer";
import { useEffect } from "react";
import { Product } from "../components/Product";

export const Store = () => {
    const { products, isLoading, error, filteredProducts } = useSelector(storeSelector);
    // console.log({ products, filteredProducts });

    // const dispatch = useDispatch();

    useEffect(() => {
        // console.log("in Store filteredProducts: ", filteredProducts);
    },); // Add dispatch to the dependency array

    if (isLoading) return <h1>Fetching Products.....</h1>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap justify-around align-top m-3">
            {
                (filteredProducts || products).map((p) => (
                    <Product key={p.id} product={p} /> // Use p.id as key and pass product's actual id
                ))
            }
        </div>
    );
};
