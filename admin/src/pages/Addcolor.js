import React, { useEffect } from "react";
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createColor, getAColor, resetState, updateAColor } from "../features/color/colorSlice";
import { Divider } from "antd";

let schema = Yup.object().shape({
  title: Yup.string().required("Color is required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor, updatedColor, colorName } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color Added Successfully!');
    }
    if (isSuccess && updatedColor) {
      toast.success('Color Updated Successfully!');
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className='mb-4 title'>{getColorId !== undefined ? "Edit" : "Add"} color</h3>
      <Divider />
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="color"
            Label="Enter Blog Category"
            name='title'
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit" >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcolor;
