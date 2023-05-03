import React, { useEffect } from 'react'
import Custominput from '../components/Custominput'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';

let schema = Yup.object().shape({
  email: Yup.string().email("Email should be valid").required("Email should be required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values));
    },
  });
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user === null || isSuccess) {
      navigate("admin");
    } else {
      navigate("/");
    }
  }, [user, isError, isLoading, isSuccess, message]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='my-5 bg-white w-25 rounded-3 mx-auto p-4'>
        <h3 className='text-center title'>Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className='error text-center'>
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            name="email"
            val={formik.values.email}
            type="text"
            label="Email Address"
            id="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
          />
          <div className='error'>
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <Custominput
            name="password"
            val={formik.values.password}
            type="password"
            label="Password"
            id="pass"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
          />
          <div className='error'>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            className='border-0 px-3 py-2 text-white fw-bold w-100 text-decoration-none text-center fs-5'
            style={{ background: "#ffd333" }}
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
