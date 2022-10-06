import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileNavBtn from '../components/buttons/ProfileNavBtn';
import {
  VStack,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { db } from '../firebase';
import {
  getDocs,
  collection,
  where,
  query,
  getDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { orders as ordersAtom, wallet as walletAtom } from '../atoms';
import { useRecoilState } from 'recoil';

export default function Orders() {
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const { user } = UserAuth();
  const uid = user.uid;
  useEffect(() => {
    document.title = 'Orders';
  });

  useEffect(() => {
    async function fetchWallet() {
      const userData = await getDoc(doc(db, 'users', user.uid));
      return userData.get('wallet');
    }

    fetchWallet()
      .then(data => setWallet(data))
      .catch(err => {});
  }, [user.uid]);

  useEffect(() => {
    async function fetchOrders() {
      const orders = await getDocs(
        query(collection(db, 'orders'), where('uid', '==', uid))
      );
      return orders;
    }
    const ordersData = [];
    if (uid !== undefined) {
      fetchOrders()
        .then(data => {
          data.forEach(doc => {
            ordersData.push({
              id: doc.get('orderId'),
              amount: doc.get('amount'),
              orderNum: doc.get('orderNum'),
              orderTime: doc.get('orderTime'),
              orders: doc.get('orders'),
              uid: doc.get('uid'),
            });
          });
          setOrders(ordersData);
        })
        .catch(err => console.log(err));
    }
  }, [uid, setOrders]);

  return (
    <>
      <Navbar title={`Orders`} navBtn={<ProfileNavBtn />} hasCheckout />
      <VStack align="normal" p="8">
        <Text fontSize="3xl" pb="2">
          Your orders
        </Text>

        <Accordion defaultIndex={[0]} allowMultiple>
          {orders.map((order, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="2" textAlign="left">
                    <Text flex="1" fontSize="xl" color="gray.200">
                      Order #
                      <Text as="span" fontWeight="bold">
                        {order.orderNum}
                      </Text>
                    </Text>
                    <Text flex="1">
                      {new Date(order.orderTime).toUTCString()}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>Order Id: {order.id}</Text>
                <Text>Amount: ₹{order.amount}</Text>
                {order.orders.map((item, index) => (
                  <Box p="2" key={index}>
                    <Text>Item #{index}</Text>
                    <Text>
                      Item: {item.itemName} Cost: {item.cost} Count:{' '}
                      {item.count}
                    </Text>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </>
  );
}
