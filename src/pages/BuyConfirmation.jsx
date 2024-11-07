import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../reducers/myOrderReducer';
import { cartSelector, emptyCart } from '../reducers/cartReducer';
import ItemTable from './ItemTable.jsx';

const BuyConformation = ({ handleCloseModal }) => {
    const dispatch = useDispatch();
    const { products, totalValue } = useSelector(cartSelector); // Get cart data

    console.log("In BuyConformation:", { products, totalValue });


    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
            <div className="bg-dark p-6 rounded-lg shadow-lg text-center w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Proceed to Buy</h2>
                {products && <ItemTable items={products} totalValue={totalValue} />}
                <div className="flex justify-around mt-6">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => {
                            dispatch(placeOrder({ products, totalValue })); // Place order
                            handleCloseModal(); // Close modal
                            dispatch(emptyCart()); // remove all items from cart after purchase
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyConformation;
