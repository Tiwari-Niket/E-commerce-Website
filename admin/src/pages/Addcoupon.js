import React, { useEffect, useState } from "react";
import Custominput from '../components/Custominput';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createCoupons, getACoupon, resetState, updateACoupon } from "../features/coupon/couponSlice";
import { Divider } from "antd";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is required"),
  expiry: Yup.date().required("Expiry Date is required"),
  discount: Yup.number().required("Discount Percentage is required"),
});

const Addcoupon = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    function Day(day) {
      return day < 10 ? `0${day}` : day;
    }
    function Month(month) {
      return month < 10 ? `0${month}` : month;
    }
    return [year, Month(month), Day(day)].join("-");
  };
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfully!');
    }
    if (isSuccess && updatedCoupon) {
      toast.success('Coupon Updated Successfully!');
      navigate("/admin/coupon-list");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiry) || '',
      discount: couponDiscount || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className='mb-4 title'>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
      <Divider />
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            id="name"
            Label="Enter Coupon name"
            name='name'
            onChng={formik.handleChange('name')}
            onBlr={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <Custominput
            type="date"
            id="date"
            Label="Enter Expiry Date"
            name='expiry'
            onChng={formik.handleChange('expiry')}
            onBlr={formik.handleBlur('expiry')}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <Custominput
            type="number"
            id="discount"
            Label="Enter Discount"
            name='discount'
            onChng={formik.handleChange('discount')}
            onBlr={formik.handleBlur('discount')}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcoupon;
