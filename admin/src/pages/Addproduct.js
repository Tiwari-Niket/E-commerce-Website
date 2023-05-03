import { Divider } from 'antd';
import React, { useEffect, useState } from "react";
import Custominput from "../components/Custominput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { Select } from "antd";
import { getColors } from '../features/color/colorSlice';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, getAProduct, resetState, updateAProduct } from '../features/product/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.string().required("Tags is required"),
  color: Yup.array().min(1, "Pick at least one color").required("Colors are required"),
  quantity: Yup.number().required("Quantity is required"),
});

const Addproduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [color, setColor] = useState([]);

  const getProdId = location.pathname.split("/")[3];
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct, prodColor, prodPrice, prodQuantity, updatedProduct, prodTags, prodBrand, prodName, prodCategory, prodImages, prodDesc } = newProduct;

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Successfully!');
    }
    if (isSuccess && updatedProduct) {
      toast.success('Product Updated Successfully!');
      navigate("/admin/product-List");
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  colorState.forEach(i => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach(i => {
    img.push({
      public_id: i.public_id,
      url: i.url
    })
  });

  
  useEffect(() => {
    if (getProdId !== undefined) {
      dispatch(getAProduct(getProdId));
      img.push(prodImages);
    } else {
      dispatch(resetState());
    }
  }, [getProdId]);
  
  // useEffect(() => {
  //   formik.values.color = color ? color : " ";
  //   formik.values.images = img;
  // }, [color, img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: prodName || '',
      description: prodDesc || '',
      price: prodPrice || '',
      brand: prodBrand || '',
      category: prodCategory || '',
      tags: prodTags || '',
      color: color||'',
      quantity: prodQuantity || '',
      images: img||'',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getProdId !== undefined) {
        const data = { id: getProdId, productData: values };
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <>
      <div>
        <h3 className="mb-3 title">{getProdId!==undefined?"Edit":"Add"} product</h3>
      </div>
      <Divider />
      <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
        <Custominput
          type="text"
          label="Enter Product Title"
          name='title'
          onChng={formik?.handleChange('title')}
          onBlr={formik.handleBlur('title')}
          val={formik?.values?.title}
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <ReactQuill
          theme="snow"
          name='description'
          onChange={formik.handleChange('description')}
          value={formik.values.description}
        />
        <div className="error">
          {formik.touched.description && formik.errors.description}
        </div>
        <Custominput
          type="numbers"
          label="Enter Product Price"
          name='price'
          onChng={formik.handleChange('price')}
          onBlr={formik.handleBlur('price')}
          val={formik.values.price}
        />
        <div className="error">
          {formik.touched.price && formik.errors.price}
        </div>
        <select
          name='brand'
          onChange={formik.handleChange('brand')}
          onBlur={formik.handleBlur('brand')}
          value={formik.values.brand}
          className="form-control py-3 mb-3 "
          id=""
        >
          <option value=''>Select Brand</option>
          {brandState.map((i, j) => {
            return <option key={j} value={i.title}>{i.title}</option>
          })};
        </select>
        <div className="error">
          {formik.touched.brand && formik.errors.brand}
        </div>
        <select
          name='category'
          onChange={formik.handleChange('category')}
          onBlur={formik.handleBlur('category')}
          value={formik.values.category}
          className="form-control py-3 mb-3 "
          id=""
        >
          <option value="">Select category</option>
          {catState.map((i, j) => {
            return <option key={j} value={i.title}>{i.title}</option>
          })};
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category}
        </div>
        <select
          name='tags'
          onChange={formik.handleChange('tags')}
          onBlur={formik.handleBlur('tags')}
          value={formik.values.tags}
          className="form-control py-3 mb-3 "
          id=""
        >
          <option value="" disabled>Select tags</option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error">
          {formik.touched.tags && formik.errors.tags}
        </div>
        <Select
          mode='multiple'
          allowClear
          className='w-100'
          placeholder="Select colors"
          defaultValue={color}
          onChange={(i) => handleColors(i)}
          options={coloropt}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color}
        </div>
        <Custominput
          type="numbers"
          label="Enter Product Quantity"
          name='quantity'
          onChng={formik.handleChange('quantity')}
          onBlr={formik.handleBlur('quantity')}
          val={formik.values.quantity}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity}
        </div>
        <div className="bg-white border-1 p-5 text-center">
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
        <div className='showimages d-flex flex-wrap gap-3'>
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
        <button className="btn btn-success border-0 rounded-3 my-5" type="submit" >{getProdId!==undefined?"Edit":"Add"} Product</button>
      </form>
    </>
  );
};

export default Addproduct;
