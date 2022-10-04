import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileNavBtn from '../components/buttons/ProfileNavBtn';

export default function Order() {
  const { orderId } = useParams();
  return (
    <>
      <Navbar title={`Order ${orderId}`} navBtn={<ProfileNavBtn />} />
    </>
  );
}
