import {
  Heading,
  Box,
  Stack,
  Accordion,
  AccordionItem,
  Text,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { orders as ordersAtom } from '../atoms';
import { useRecoilState } from 'recoil';
import { db } from '../firebase';
import {
  getDocs,
  collection,
  orderBy,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { Button } from '@chakra-ui/react';

export default function LiveOrders() {
  const [orders, setOrders] = useRecoilState(ordersAtom);
  const { user } = UserAuth();
  const uid = user.uid;

  async function markOrderAsDelivered(orderId) {
    setOrders(prevOrders => prevOrders.filter(item => item.id !== orderId));
    await updateDoc(doc(db, 'orders', orderId), {
      completed: true,
    });
  }
  useEffect(() => {
    async function fetchOrders() {
      const orders = await getDocs(collection(db, 'orders'), orderBy('date'));
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
              completed: doc.get('completed'),
            });
          });
          setOrders(
            ordersData.sort(function (a, b) {
              return new Date(b.orderTime) - new Date(a.orderTime);
            })
          );
        })
        .catch(err => console.log(err));
    }
  }, [uid, setOrders]);

  return (
    <Stack align="center" spacing={10} mx={'auto'} py={12} px={8}>
      <Heading fontSize={'4xl'}>Live Orders</Heading>
      <Box>
        <Accordion w="xl" defaultIndex={[0]} allowMultiple>
          {orders.map((order, index) => {
            if (!order.completed) {
              return (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box flex="3" textAlign="left">
                        <Text>
                          <Text as="span" fontSize="xl" color="gray.200">
                            Order #
                          </Text>
                          <Text as="span" fontSize="xl" fontWeight="bold">
                            {order.orderNum}
                          </Text>
                          <Text align="end" px="4" fontWeight="lg" as="span">
                            {new Date(order.orderTime).toLocaleString()}
                          </Text>
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
                          Item: {item.itemName} Count: {item.count}
                        </Text>
                      </Box>
                    ))}
                    <Button
                      p="4"
                      onClick={() => {
                        markOrderAsDelivered(order.id);
                      }}
                      colorScheme="whatsapp"
                    >
                      Done!
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              );
            }
            return null;
          })}
        </Accordion>
      </Box>
    </Stack>
  );
}
