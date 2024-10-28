import React from 'react'
import { cartSelector } from '../reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Product } from '../components/Product';

export const Cart = () => {
    const { products, totalValue } = useSelector(cartSelector);
    const dispatch = useDispatch();

    return (
        <>
            <div><button className="btn btn-ghost  btn-block" > My Cart</button></div>
            <div className="flex flex-wrap justify-around align-top m-3">

                {
                    products && products.map((p) => (
                        <Product key={p.id} product={p} fromCart={true} /> // Use p.id as key and pass product's actual id
                    ))
                }

            </div>
            <Link to="/checkout"> <button className="btn btn-primary btn-block">Total : ${totalValue.toFixed(2)} Checkout</button></Link>
        </>

    );
}

//  default Cart
