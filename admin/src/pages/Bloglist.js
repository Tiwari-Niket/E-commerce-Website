import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs, resetState } from '../features/blog/blogSlice';
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
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Bloglist = () => {
  
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  },[dispatch]);
  
  const blogstate = useSelector((state) => state.blog.blogs);
  const data1 = [];
  for (let i = 0; i < blogstate.length; i++) {
    if (blogstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: blogstate[i].title,
        category: blogstate[i].category,
        action: <>
        <Link to={`/admin/add-blog/${blogstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
        <button onClick={() => showModal(blogstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
      </>,
      });
    }
  }
  
  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className='mb-4 title'>Blogs List</h3>
        <div>
          <Divider />
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBlog(blogId) }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  )
}

export default Bloglist;
