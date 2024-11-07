import { useEffect, useState } from 'react'
import { cartSelector } from '../reducers/cartReducer';
import { useSelector } from 'react-redux';
import { Product } from '../components/Product';
import BuyConformation from './BuyConfirmation';

export const Cart = () => {
    useEffect(() => {
        console.log("rendered Cart comp....");

    }, [])
    const { products, totalValue } = useSelector(cartSelector);

    console.log("In cart component:", { products });


    const [confirmationModal, setConfirmationModal] = useState(false);
    const handleButtonClick = () => setConfirmationModal(true);
    const handleCloseModal = () => setConfirmationModal(false);

    return (
        <div>
            {confirmationModal ? <BuyConformation handleCloseModal={handleCloseModal} /> : null}
            <div><button className="btn btn-ghost  btn-block" > My Cart</button></div>
            <div className="flex flex-wrap justify-around align-top m-3">

                {
                    products && products.map((p) => (
                        <Product key={p.id} product={p} fromCart={true} className='z-50' /> // Use p.id as key and pass product's actual id
                    ))
                }

            </div>
            {products.length > 0 ? <button className="btn btn-primary btn-block" onClick={handleButtonClick}>
                Total : ${totalValue.toFixed(2)} Buy now
            </button> : <h1>Cart is Empty!</h1>}
        </div>

    );
}

//  default Cart
