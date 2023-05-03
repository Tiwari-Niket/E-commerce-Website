import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAColor, getColors, resetState } from '../features/color/colorSlice';
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
const Colorlist = () => {

  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors())
  },[]);
  const colorstate = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorstate.length; i++) {
    if (colorstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: colorstate[i].title,
        action: <>
          <Link to={`/admin/color/${colorstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
          <button onClick={() => showModal(colorstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>,
      });
    }
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors </h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteColor(colorId) }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  )
}

export default Colorlist;
