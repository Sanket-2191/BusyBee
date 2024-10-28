import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            <Link to="/store"> <button className="btn btn-primary btn-block">Visit our Store</button></Link>
        </div>
    )
}


