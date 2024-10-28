import React from 'react'

import { useSelector } from "react-redux";
import { storeSelector } from "../reducers/storeReducer";


export const Myorders = () => {
    const { products } = useSelector(storeSelector);
    return (
        <div>

        </div>
    )
}


