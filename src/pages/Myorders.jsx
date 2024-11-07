import React from 'react'

import { useSelector } from "react-redux";
import { myOrdersSelector } from '../reducers/myOrderReducer';
import ItemTable from './ItemTable';


export const Myorders = () => {
    const { orders } = useSelector(myOrdersSelector);
    console.log(orders.length > 0 && orders[0].date)
    return (
        <>
            <div className='w-[70%] mt-6'>
                {

                    orders.length > 0 ? orders.map((o, i) => (
                        <div key={i} className='w-[100%]'>
                            <div role="alert" className="alert shadow-lg w-[100%]">
                                <div className="flex justify-between w-[100%]">
                                    <div className="font-bold w-fit mx-1">{o.date.split(',')[0]}</div>
                                    <div className="font-bold w-fit mx-1">
                                        {o.date.split(',').slice(1).join(',')}</div> {/* Time aligned to the right */}
                                </div>
                            </div>
                            <ItemTable items={o.products} totalValue={o.totalValue} />
                        </div>
                    )) : <h1>No Orders placed yet</h1>
                }
            </div>

        </>

    )
}


