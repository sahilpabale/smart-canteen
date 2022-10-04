import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  totalAmt as totalAmtAtom,
  wallet as walletAtom,
  menu as menuAtom,
} from '../atoms';
import { Center, Text, MenuDivider, Button } from '@chakra-ui/react';
import { IoBagCheckOutline } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { IconButton } from '@chakra-ui/react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

export default function CheckoutList({ toggleToCheckout }) {
  const [totalAmt, setTotalAmt] = useRecoilState(totalAmtAtom);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const [menu] = useRecoilState(menuAtom);
  const [loading, setLoading] = useState({
    state: false,
    loadingText: 'Processing...',
  });
  const navigate = useNavigate();
  const { user } = UserAuth();

  useEffect(() => {
    getDoc(doc(db, 'users', user.uid)).then(data => {
      setWallet(data.get('wallet'));
    });
  }, []);

  const addMoney = async diff => {
    const userDocRef = doc(db, 'users', user.uid);
    await updateDoc(userDocRef, {
      wallet: wallet + diff,
    });
    setWallet(wallet + diff);
  };

  const pay = () => {
    const orderId = uuid();
    setDoc(doc(db, 'orders', orderId), {
      orderId,
      orderNum: `${user.email
        .split('.')[1]
        .slice(0, 3)
        .toUpperCase()}${Math.floor(Math.random() * 101)}`,
      uid: user.uid,
      amount: totalAmt,
      orders: menu.filter(item => item.count > 0),
      orderTime: Date(),
    })
      .then(() => {
        setWallet(wallet - totalAmt);
        updateDoc(doc(db, 'users', user.uid), {
          wallet: wallet - totalAmt,
        });
        setTotalAmt(0);
      })
      .then(() => {
        setLoading({ state: false, loadingText: 'Processing...' });
        navigate(`/order/${orderId}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Center>
        <IconButton
          icon={<AiOutlineLeft />}
          variant="link"
          onClick={toggleToCheckout}
        />
        <Text pt="2" pb="2" pr="3" fontSize="lg" fontWeight="bold">
          Time to Checkout
        </Text>
      </Center>
      <MenuDivider />
      <Text pl="3" pb="2" pt="3" fontSize="xl" fontWeight="medium">
        {wallet >= totalAmt ? 'Eligible for QuickPay' : `You can't QuickPay`}
      </Text>
      <Text pl="3" pb="3" fontSize="md" color="green.300" fontWeight="medium">
        {wallet >= totalAmt && wallet > 0 ? (
          `Wallet Balance: ₹${wallet}`
        ) : (
          <>
            <Text as="span" color="red.500">
              {' '}
              Wallet Balance: ₹{wallet}
            </Text>
          </>
        )}
      </Text>
      <Center>
        {wallet < totalAmt ? (
          <Button
            m="3"
            w="40"
            bg="blue.500"
            _hover={{
              background: 'blue.400',
            }}
            rightIcon={<IoMdAdd />}
            disabled={totalAmt === 0 ? true : false}
            onClick={() => addMoney(totalAmt - wallet)}
          >
            Add Money
          </Button>
        ) : (
          <Button
            m="3"
            w="40"
            bg="blue.500"
            _hover={{
              background: 'blue.400',
            }}
            rightIcon={<IoBagCheckOutline />}
            disabled={totalAmt === 0 ? true : false}
            isLoading={loading.state}
            loadingText={loading.loadingText}
            onClick={() => {
              setLoading({ state: true, loadingText: 'Processing...' });
              pay(wallet - totalAmt);
            }}
          >
            Pay ₹{totalAmt}
          </Button>
        )}
      </Center>
    </>
  );
}
