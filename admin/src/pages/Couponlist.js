import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteACoupon, getCoupons, resetState } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'Sno',
        dataIndex: 'key',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: "Action",
        dataIndex: "action"
    }
];

const Couponlist = () => {

    const [open, setOpen] = useState(false);
    const [couponId, setcouponId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setcouponId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getCoupons());
    },[]);
    const couponstate = useSelector((state) => state.coupon.coupons);
    const data1 = [];
    for (let i = 0; i < couponstate.length; i++) {
        if (couponstate[i].role !== "admin") {
            data1.push({
                key: i + 1,
                name: couponstate[i].name,
                discount: couponstate[i].discount,
                expiry: new Date(couponstate[i].expiry).toLocaleDateString(),
                action: <>
                    <Link to={`/admin/coupon/${couponstate[i]._id}`} className='fs-3 text-danger'><BiEdit /></Link>
                    <button onClick={() => showModal(couponstate[i]._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
                </>,
            });
        }
    }

    const deleteCoupon = (e) => {
        dispatch(deleteACoupon(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getCoupons());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Coupon</h3>
            <div>
                <Divider />
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => { deleteCoupon(couponId) }}
                title="Are you sure you want to delete this coupon?"
            />
        </div>
    )
}

export default Couponlist;
