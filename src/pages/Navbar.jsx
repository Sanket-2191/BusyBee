import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../reducers/cartReducer";
import { useLocation, NavLink, Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { filterProducts } from "../reducers/storeReducer";
import { signinSelector } from "../reducers/loginReducer";

const Navbar = () => {
    const { products, totalValue } = useSelector(cartSelector);
    const dispatch = useDispatch()
    const location = useLocation();
    const [searchField, setSearchField] = useState('');
    const { loggedIn } = useSelector(signinSelector);

    const handleSearch = (e) => {

        const searchValue = e.target.value;
        setSearchField(searchValue);
        dispatch(filterProducts(searchValue)); // Dispatch filter action

        // console.log(" search feild in nav bar:", searchValue);
    };

    return (
        <>
            <div className="navbar bg-base-100 w-full fixed top-0 right-0 z-50">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" to='/'>BusyBee</Link>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search"
                            value={searchField}
                            onChange={handleSearch} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className="flex-none">
                    {/* Conditionally hide dropdown if the current route is '/cart' */}
                    <NavLink
                        to="/myorders"
                        className={({ isActive }) => `btn ${isActive ? 'btn-success' : 'btn-primary'} , mx-4`}
                    >
                        My Orders
                    </NavLink>
                    <NavLink
                        to="/store"
                        className={({ isActive }) => `btn ${isActive ? 'btn-success' : 'btn-primary'} , mx-4`}
                    >
                        Store
                    </NavLink>
                    {location.pathname !== '/cart' && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">{products.length}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">{products.length} Items</span>
                                    <span className="text-info">Subtotal: ${totalValue}</span>
                                    <div className="card-actions">
                                        <NavLink to='/cart'>
                                            <button className="btn btn-primary btn-block">View cart</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User avatar"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741987-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            {!loggedIn && <li><Link to='/signin'>Sign up</Link></li>}
                            {loggedIn ? <li><Link to='/login'>Logout</Link></li> : <li><Link to='/login'>login</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    );
};

export default Navbar;