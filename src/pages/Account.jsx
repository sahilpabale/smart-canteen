import React, { useState, useLayoutEffect } from 'react';
import Nav from '../components/Navbar';
import ProfileNavBtn from '../components/buttons/ProfileNavBtn';
import {
  Box,
  Text,
  SimpleGrid,
  HStack,
  Image,
  VStack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Profile() {
  const count = 10;
  const [sWidth, setSWidth] = useState(document.body.clientWidth);

  useLayoutEffect(() => {
    function updateSize() {
      setSWidth(document.body.clientWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
  }, []);

  const [menu, setMenu] = useState([
    {
      id: 1,
      itemName: 'Paneer Roll',
      thumbnail:
        'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
      cost: 45,
      count: 0,
    },
    {
      id: 2,
      itemName: 'Samosa',
      thumbnail:
        'https://media.istockphoto.com/photos/punjabi-samosa33-picture-id502814791?k=20&m=502814791&s=612x612&w=0&h=cI3-CpnXXdXBD4vZgaSijSxPzmDS9AgBVS3PfpN3ZAk=',
      cost: 17,
      count: 0,
    },
    {
      id: 3,
      itemName: 'Medu Vada',
      cost: 31,
      count: 0,
      thumbnail:
        'http://im.rediff.com/travel-living/2015/apr/144302c33c547d28928409d18e3cf130093b56e8.jpg',
    },
  ]);

  function incrementCart(id) {
    const newMenu = menu.map(obj => {
      if (obj.id === id) {
        return { ...obj, count: obj.count + 1 };
      }
      return obj;
    });
    setMenu(newMenu);
  }

  function decrementCart(id) {
    const newMenu = menu.map(obj => {
      if (obj.id === id && obj.count > 0) {
        return { ...obj, count: obj.count - 1 };
      }
      return obj;
    });
    setMenu(newMenu);
  }

  return (
    <>
      <Nav title="Profile" navBtn={<ProfileNavBtn />} hasCheckout={true} />
      <Box borderBottom="2px" borderBottomColor="gray.700">
        <Text fontSize="3xl" m={4}>
          Menu ({count})
        </Text>
      </Box>
      <SimpleGrid
        columns={sWidth >= 768 ? (sWidth >= 1024 ? 3 : 2) : 1}
        spacing={6}
        m="5"
        w={{ base: '90%', sm: '95%', md: '95%' }}
      >
        {menu.map(item => (
          <Box key={item.id} bg="blue.800" h="100%" rounded="10px">
            <HStack>
              <Image
                src={item.thumbnail}
                borderLeftRadius="10px"
                boxSize="120px"
              />
              <VStack alignItems="start" p="3">
                <Text fontSize={['xl', '2xl']} color="white" fontWeight="bold">
                  {item.itemName}
                </Text>
                <Text
                  fontSize={['md', 'lg', 'xl']}
                  color="gray.400"
                  fontWeight="medium"
                  align="left"
                >
                  ₹{item.cost}.00
                </Text>
              </VStack>
              <HStack align="center" pr="3">
                <IconButton
                  onClick={() => incrementCart(item.id)}
                  size="sm"
                  icon={<FaPlus />}
                ></IconButton>
                <Text fontSize="md">{item.count}</Text>
                <IconButton
                  onClick={() => decrementCart(item.id)}
                  size="sm"
                  icon={<FaMinus />}
                ></IconButton>
              </HStack>
            </HStack>
          </Box>
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
        </Box>
        <Box bg="blue.800" h="100%" rounded="10px">
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
