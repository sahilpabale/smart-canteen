import React, { useState, useLayoutEffect, useEffect } from 'react';
import Nav from '../components/Navbar';
import ProfileNavBtn from '../components/buttons/ProfileNavBtn';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
import { db } from '../firebase';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import {
  menu as menuAtom,
  totalAmt as totalAmtAtom,
  cart as cartAtom,
  wallet as walletAtom,
} from '../atoms';
import { useRecoilState } from 'recoil';
import MenuCard from '../components/MenuCard';
import { UserAuth } from '../context/AuthContext';

export default function Profile() {
  const [sWidth, setSWidth] = useState(document.body.clientWidth);
  const [menu, setMenu] = useRecoilState(menuAtom);
  const [totalAmt, setTotalAmt] = useRecoilState(totalAmtAtom);
  const [wallet, setWallet] = useRecoilState(walletAtom);
  const [cart, setCart] = useRecoilState(cartAtom);
  const { user } = UserAuth();

  useLayoutEffect(() => {
    function updateSize() {
      setSWidth(document.body.clientWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);

  useEffect(() => {
    document.title = 'Your Menu';
  });

  useEffect(() => {
    getDocs(collection(db, 'menu'))
      .then(data => {
        const getMenu = [];
        data.forEach(doc =>
          getMenu.push({
            id: doc.id,
            itemName: doc.get('itemName'),
            cost: doc.get('cost'),
            thumbnail: doc.get('thumbnail'),
            count: 0,
          })
        );
        setMenu(getMenu);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    async function fetchWallet() {
      const userData = await getDoc(doc(db, 'users', user.uid));
      return userData.get('wallet');
    }

    fetchWallet()
      .then(data => setWallet(data))
      .catch(err => {});
  }, [user]);

  function incrementCart(id) {
    const newMenu = menu.map(obj => {
      if (obj.id === id) {
        if (obj.count === 0) {
          setCart(cart => [...cart, obj]);
        }
        setTotalAmt(amt => amt + obj.cost);
        return { ...obj, count: obj.count + 1 };
      }
      return obj;
    });
    setMenu(newMenu);
  }

  function decrementCart(id) {
    const newMenu = menu.map(obj => {
      if (obj.id === id && obj.count > 0) {
        setCart(cart => cart.filter(item => item.id !== obj.id));
        setTotalAmt(amt => amt - obj.cost);
        return { ...obj, count: obj.count - 1 };
      }
      return obj;
    });
    setMenu(newMenu);
  }

  return (
    <>
      <Nav
        title={`Welcome, ${user.displayName}`}
        navBtn={<ProfileNavBtn />}
        hasCheckout
      />
      <Box borderBottom="2px" borderBottomColor="gray.700">
        <Text fontSize="3xl" m={4}>
          Menu ({menu.length})
        </Text>
      </Box>
      <SimpleGrid
        columns={sWidth >= 768 ? (sWidth >= 1024 ? 3 : 2) : 1}
        spacing={6}
        m="5"
        w={{ base: '90%', sm: '95%', md: '95%' }}
      >
        {menu.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            forCart
            incrementCart={incrementCart}
            decrementCart={decrementCart}
          />
        ))}

        {/* <Box bg="blue.800" h="100%" rounded="10px">
          <HStack>
            <Image
              src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
              borderLeftRadius="10px"
              boxSize="120px"
            />
            <VStack alignItems="start" p="3">
              <Text fontSize={['xl', '2xl']} color="white" fontWeight="bold">
                Paneer Roll
              </Text>
              <Text
                fontSize={['md', 'lg', 'xl']}
                color="gray.400"
                fontWeight="medium"
                align="left"
              >
                ₹10.00
              </Text>
            </VStack>
            <HStack align="center">
              <Button variant="unstyled" size="sm" p={2}>
                <FaPlus />
              </Button>
              <Text fontSize="md">2</Text>
              <Button variant="unstyled" size="sm" p={2}>
                <FaMinus />
              </Button>
            </HStack>
          </HStack>
        </Box> */}
      </SimpleGrid>
    </>
  );
}
