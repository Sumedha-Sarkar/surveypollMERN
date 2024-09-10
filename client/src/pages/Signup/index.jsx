import { register } from '../../assets';
import styles from '../../styles';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useFormik } from 'formik'
import { signupSchema } from '../../schemas';
import DragDropImage from '../../components/DragDropImage';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
// import CropImage from '../../components/CropImage';

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(false)
    const initialValues = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
    }
    const getRegister = async ({ name, email, password, avatar }) => {
        try {
            const dataForm = new FormData();
            dataForm.set('name', name);
            dataForm.set('email', email);
            dataForm.set('password', password);
            dataForm.set('avatar', avatar);
            const res = await fetch(`${apiUrl}/user/register`, {
                method: "POST",
                body: dataForm,
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setUserInfo(data.user)
                toast.success("Signup successfully");
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleImageSelection = (selectedFile) => {
        setAvatar(selectedFile);
        setPreview(true);
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: (values, action) => {
            getRegister({ ...values, avatar });
            setAvatar(null)
            setPreview(false);
            action.resetForm();
        }
    })
    const [clicked, setClicked] = useState(false)

    const changeImage = () => {
        setClicked(true)
        setPreview(false);
        setAvatar(null);
    }

    useEffect(() => {
        if (userInfo) {
            toast.warning("You are already logged in with registered account");
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
                        <h2 className="font-bold text-3xl md:text-4xl mb-1">Sign up</h2>

                        <p className="text-[12px] md:text-sm text-slate-600">Already have an account <NavLink to='/login' className={`text-sky-600`}>Login</NavLink> </p>
                    </div>
                    {/* form div start here */}
                    <div className="w-full md:w-[80%]">
                        {/* <div>
                            <CropImage src={URL.createObjectURL(avatar)} />
                        </div> */}
                        {/* Registration input form  */}
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                {
                                    preview ? (
                                        <div className='rounded-xl border-[2px]  border-dashed border-stone-300 p-3 flex'>
                                            <div className='relative flex justify-center items-center group rounded-full h-48 w-48 overflow-hidden '>
                                                <img src={URL.createObjectURL(avatar)} alt='Profile pic' className=' group-hover:opacity-40 transition-opacity duration-300' />
                                                <button type='button' onClick={changeImage} className='absolute text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold'>change Image</button>
                                            </div>
                                            <button type='button'>Crop Image</button>
                                        </div>
                                    ) : (
                                        <DragDropImage onImageSelect={handleImageSelection} clicked={clicked} setClicked={setClicked} />
                                    )}
                            </div>
                            {/* div for taking name */}
                            <div className='mb-2'>
                                <label htmlFor="name" className="text-sm font-bold ">Name:</label>
                                <div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        // autoComplete="off"
                                        autoComplete="name"
                                        placeholder="Enter your email address"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.name && touched.name ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.name}</p>) : null}
                            </div>
                            {/* div for taking email */}
                            <div className='mb-2'>
                                <label htmlFor="email" className="text-sm font-bold ">Email address:</label>
                                <div>
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
                                <div>
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
                            {/* div for taking Confirm Password */}
                            <div>
                                <label htmlFor="cpassword" className="text-sm font-bold">Confirm Password:</label>
                                <div className="lb">
                                    <input
                                        id="cpassword"
                                        name="cpassword"
                                        type="password"
                                        placeholder="Enter password again"
                                        autoComplete="current-password"
                                        // autoComplete="off"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.cpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.cpassword && touched.cpassword ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.cpassword}</p>) : null}
                            </div>
                            {/* Submit Button */}
                            <div className='my-6' >
                                <Button styles={`w-full py-1`} title={'Signup'} type="submit" />
                            </div>
                        </form>
                        {/* for other authentication method like github linkdin etc */}
                        
                    </div>
                </div>
            </div>
            <div className={`flex-1 flex ${styles.flexCenter} relative md:mx-2 md:mt-0 mt-6 mx-10`}>
                <img className="w-[100%] h-[100%] relative z-[5]"
                    src={register}
                    alt="" />
            </div>
        </div>
    )
}

export default Signup
