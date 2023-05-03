import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Enquiries = () => {

  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);
  const enquirystate = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  for (let i = 0; i < enquirystate.length; i++) {
    if (enquirystate[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: enquirystate[i].name,
        email: enquirystate[i].email,
        mobile: enquirystate[i].mobile,
        status: <>
          <select 
          defaultValue={enquirystate[i].status ? enquirystate[i].status : "Submitted"} 
          className='form-control form-select'
          onChange={(e)=>setEnquiryStatus(e.target.value, enquirystate[i]._id)}
          >
            <option value="Submitted" selected>Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>,
        action: <>
          <Link to={`/admin/enquiries/${enquirystate[i]._id}`} className='ms-3 fs-3 text-danger'><AiOutlineEye /></Link>
          <button onClick={() => showModal(enquirystate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>,
      });
    }
  }

  const setEnquiryStatus = (e, i)=>{
    const data = {id:i, enqData: e};
    dispatch(updateAEnquiry(data));
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiry</h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { deleteEnquiry(enqId) }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  )
}

export default Enquiries
