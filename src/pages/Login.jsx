import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    // refrences for password and userName feilds
    const passwordRef = useRef();
    const userNameRef = useRef();

    // using Navigate functionality for redirecting after login 
    const navigate = useNavigate();

    const location = useLocation();

    const dispatch = useDispatch();



    const handleLogin = () => {
        // logind data tobe sent to get vaerification
        const loginData = { userName: userNameRef.current.value, password: passwordRef.current.value };

        // console.log(loginData);


        dispatch(login(loginData));

        // checking if we were directed to login from a protected route.... 
        const redirectTo = location.state?.from?.pathname || '/';

        navigate(redirectTo);
    }

    return (
        <div className="min-h-fit bg-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-2 rounded-md border-gray-300 shadow-stone-200 shadow-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
                    Login to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-300 max-w">
                    Or &nbsp;
                    <Link to='/signin' className="font-medium text-blue-600 hover:text-blue-500"> create an account</Link>

                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-600 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">

                        {/* userName feild  */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
                                UserName
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userName"
                                    ref={userNameRef}
                                    name="userName"
                                    type="text"
                                    autoComplete="userName"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border
                                     border-gray-300 placeholder-gray-500
                                      text-gray-700 focus:outline-none focus:ring-indigo-500
                                       focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>
                        {/* password feild  */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>

                            <div className="mt-1">
                                <input
                                    id="password"
                                    ref={passwordRef}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className=" rounded-md relative block w-full px-3 py-2 border
                                     border-gray-300 placeholder-gray-500 text-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                        {/* remember Me checkbox */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        {/* Log in button  */}
                        <div>
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log in
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default Login

