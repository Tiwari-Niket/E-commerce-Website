import React, { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getProducts, resetState } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Productlist = () => {

  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);
  const productstate = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productstate.length; i++) {
    if (productstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: productstate[i].title,
        brand: productstate[i].brand,
        category: productstate[i].category,
        color: productstate[i].color + " , ",
        price: productstate[i].price,
        action: <>
          <Link to={`/admin/product/${productstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
          <button onClick={() => showModal(productstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>,
      });
    }
  }

  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Products List</h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteProduct(productId) }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  )
}

export default Productlist
