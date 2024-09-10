import { useEffect } from 'react';
import styles from '../../styles';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '../../assets';
import { useFormik } from 'formik'
import { loginSchema } from '../../schemas';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        remember_me: false, //if it is set to true then remember options will auto checked
    }
    const getLogin = async ({ email, password }) => {
        try {
            const res = await fetch(`${apiUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success && res.ok) {
                toast.success("Logged-in successfully");
                setUserInfo(data.user)
                navigate('/poll');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            getLogin(values);
        }
    })

    useEffect(() => {
        if (userInfo) {
            toast.warning("You are already logged in");
            navigate('/poll');
        }
    })

    return (

        <div className={`flex md:flex-row flex-col-reverse border bg-white border-sky-400 mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 p-16`}>
                {/* div for login form  */}
                <div className="w-full flex flex-col items-center">
                    {/* Telling about ourself and Registration  */}
                    <div className='mb-5'>
                        {/* <img className="h-[50px] w-[150px] mb-5" src={logo} alt="Your Company" /> */}
                        <h2 className="font-bold text-3xl md:text-4xl mb-1">Sign in to account</h2>
                        
                        <p className="text-[12px] md:text-sm text-slate-600">Donot have account then click here <NavLink to='/register' className={`text-sky-600`}>Signup</NavLink> </p>
                    </div>
                    {/* form div start here */}
                    <div className="w-full md:w-[80%]">
                        {/* Registration input form  */}
                        <form method="POST" onSubmit={handleSubmit}>
                            {/* div for taking email */}
                            <div className='mb-2'>
                                <label htmlFor="email" className="text-sm font-bold ">Email address:</label>
                                <div className="lb">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        // autoComplete="off"
                                        autoComplete="email"
                                        placeholder="Enter your email address"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.email && touched.email ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.email}</p>) : null}
                            </div>
                            {/* div for taking Password */}
                            <div>
                                <label htmlFor="password" className="text-sm font-bold">Password:</label>
                                <div className="lb">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        // autoComplete="off"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.password && touched.password ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.password}</p>) : null}
                            </div>
                            {/* div for remember and password forgot option */}
                            <div className="flex w-full justify-between py-2 my-2 text-slate-600">
                                <div className="">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="mr-2"
                                        value={values.remember_me}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="hover:text-sky-500 cursor-pointer"
                                    >Remember me</label>
                                </div>
                                <div>
                                    <NavLink
                                        to='/forgot-password'
                                        className="hover:text-sky-500 hover:underline"
                                    >
                                        Forgot password?
                                    </NavLink>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className='my-6' >
                                <Button styles={`w-full py-1`} title={'Login'} type="submit" />
                            </div>
                        </form>
                        {/* for other authentication method like github linkdin etc */}
                       
                    </div>
                </div>
            </div>
            <div className={`flex-1 flex ${styles.flexCenter} relative md:mx-2 md:mt-0 mt-6 mx-10`}>
                <img className="w-[100%] h-[100%] relative z-[5]"
                    src={login}
                    alt="" />
            </div>
        </div>

    )
}

export default Login