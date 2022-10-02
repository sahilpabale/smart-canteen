import React from 'react';
import Nav from '../components/Navbar';
import Landing from '../components/Landing';
import DefNavbarBtn from '../components/buttons/DefNavbarBtn';
import { UserAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { user } = UserAuth();
  return (
    <>
      {user ? (
        <Navigate to="/account" />
      ) : (
        <>
          <Nav title="Smart Canteen" navBtn={<DefNavbarBtn />} />
          <Landing />
        </>
      )}
    </>
  );
}
