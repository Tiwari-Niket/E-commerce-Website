import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';


const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Title',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action"
  }
];

const Brandlist = () => {

  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  },[]);
  const brandstate = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandstate.length; i++) {
    if (brandstate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: brandstate[i].title,
        action: <>
          <Link to={`/admin/brand/${brandstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
          <button onClick={() => showModal(brandstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>,
      });
    }
  }

  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands </h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteBrand(brandId) }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  )
}

export default Brandlist;
