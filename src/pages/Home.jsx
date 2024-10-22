import { useDispatch, useSelector } from "react-redux";
import { getProducts, storeSelector, setIsLoading } from "../reducers/storeReducer";
import { useEffect } from "react";
import { Product } from "../components/Product";

export const Home = () => {
    const { products, isLoading, error } = useSelector(storeSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        // Only dispatch actions when the component mounts
        dispatch(setIsLoading());
        dispatch(getProducts());
    }, [dispatch]); // Add dispatch to the dependency array

    if (isLoading) return <h1>Fetching Products.....</h1>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-wrap justify-around align-top m-3">
            {
                products.map((p) => (
                    <Product key={p.id} id={p.id} /> // Use p.id as key and pass product's actual id
                ))
            }
        </div>
    );
};
