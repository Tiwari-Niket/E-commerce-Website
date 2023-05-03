import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAOrder } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Orders = () => {
  const dispatch = useDispatch();

  const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

 const config3 = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    Accept: "application/json",
  },
};

  useEffect(() => {
    dispatch(getOrders(config3))
  }, []);
  
  const orderstate = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderstate?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i].shippingInfo.firstName,
      product: (
        <Link to={`/admin/order/${orderstate[i]._id}`}>View Orders</Link>
      ),
      amount: orderstate[i].totalPrice,
      date: new Date(orderstate[i].createdAt).toLocaleDateString(),
      action: (
        <>
          <select name='' defaultValue={orderstate[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderstate[i]?._id, e.target.value)} className='form-control form-select' id=''>
            <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }))
  };

  return (
    <div>
      <h3 className="mb-4 title">Orders </h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Orders
