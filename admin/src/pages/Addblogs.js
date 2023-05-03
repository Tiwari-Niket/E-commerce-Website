import React, { useEffect } from "react";
import Custominput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlogs, getABlog, updateABlog } from "../features/blog/blogSlice";
import { getCategories, resetState } from "../features/bcategory/bcategorySlice";
import { Divider } from "antd";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
});

const Addblogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog, updatedBlog, blogName, blogCategory, blogImages, blogDesc } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('Blog Added Successfully!');
    }
    if (isSuccess && updatedBlog) {
      toast.success('Blog Updated Successfully!');
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach(i => {
    img.push({
      public_id: i.public_id,
      url: i.url
    })
  });
  // useEffect(() => {
  //   formik.values.images = img;
  // }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDesc || '',
      category: blogCategory || '',
      images: img||'',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>
      <Divider />
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <Custominput
              type="text"
              label="Enter Blog Title"
              name='title'
              onChng={formik.handleChange('title')}
              onBlr={formik.handleBlur('title')}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mt-3"
            name='category'
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => {
              return <option key={j} value={i.title}>{i.title}</option>
            })};
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name='description'
            onChange={formik.handleChange('description')}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className='showimages d-flex flex-wrap mt-3 gap-3'>
            {imgState.map((i, j) => {
              {
                return (
                  <div className='position-relative' key={j}>
                    <button
                      type='button'
                      onClick={() => dispatch(delImg(i.public_id))}
                      className='btn-close position-absolute'
                      style={{ top: "10px", right: "10px" }}
                    >
                    </button>
                    <img src={i.url} alt='' width={200} height={200} />
                  </div>
                )
              }
            })}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogs;
