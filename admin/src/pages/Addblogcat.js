import React, { useEffect } from "react";
import Custominput from '../components/Custominput';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createBlogCategory, getABlogCat, resetState, updateABlogCat } from "../features/bcategory/bcategorySlice";
import { Divider } from "antd";

let schema = Yup.object().shape({
  title: Yup.string().required("Category Name is required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory, updatedBlogCategory, blogCatName } = newBlogCategory;
  
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category Added Successfully!');
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success('Blog Category Updated Successfully!');
      navigate("/admin/blog-list-category");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading, createdBlogCategory]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, blogCatData: values };
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className='mb-4 title'>{getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <Divider />
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <Custominput
            type="text"
            id="blogcat"
            Label="Enter Blog Category"
            name='title'
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit" >
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addblogcat
