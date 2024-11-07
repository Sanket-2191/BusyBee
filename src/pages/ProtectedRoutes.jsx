import React from 'react'
import { useSelector } from 'react-redux'
import { signinSelector } from '../reducers/loginReducer'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const { loggedIn } = useSelector(signinSelector);
    const location = useLocation()

    if (!loggedIn) {
        return (
            <Navigate to='/login' state={{ from: location }} />
        )
    }

    return children;
}

export default ProtectedRoutes
