import React, { useEffect } from 'react'
import { Divider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUser } from '../features/auth/authSlice';
import { useLocation } from 'react-router-dom';

const columns = [
  {
    title: 'Sno',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];
const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);
  const orderstate = useSelector((state) => state?.auth?.singleOrder?.orderItems);

  const data1 = [];
  for (let i = 0; i < orderstate?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i]?.product?.title,
      brand: orderstate[i]?.product?.brand,
      count: orderstate[i]?.quantity,
      color: orderstate[i]?.color?.title,
      amount: orderstate[i]?.product?.price,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Divider />
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default ViewOrder;
