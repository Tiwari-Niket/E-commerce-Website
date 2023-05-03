import React, { useEffect } from "react";
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createCategory, getAProductCategory, resetState, updateAProductCategory } from "../features/pcategory/pcategorySlice";
import { Divider } from "antd";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getPCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory, updatedCategory, categoryName } = newCategory;

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category Added Successfully!');
    }
    if (isSuccess && updatedCategory) {
      toast.success('Category Updated Successfully!');
      navigate("/admin/category-List");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className='mb-4 title'>{getPCatId !== undefined ? "Edit" : "Add"} Product Category</h3>
      <Divider />
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            Label="Enter Product Category"
            name='title'
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit" >
            {getPCatId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcat
