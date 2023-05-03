import React, { useEffect, useState } from 'react';
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlogCat, getCategories, resetState } from '../features/bcategory/bcategorySlice';
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
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Blogscatlist = () => {

  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const bCatstate = useSelector((state) => state.bCategory.bCategories);
  const data1 = [];
  for (let i = 0; i < bCatstate.length; i++) {
    if (bCatstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: bCatstate[i].title,
        action: <>
          <Link to={`/admin/blog-category/${bCatstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
          <button onClick={() => showModal(bCatstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>,
      });
    }
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCat(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className='mb-4 title'>Blog Category </h3>
        <div>
          <Divider />
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBlogCategory(blogCatId) }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  )
}

export default Blogscatlist;
