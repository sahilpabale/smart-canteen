import React, { useRef } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import uuid from 'react-uuid';

export default function AddMenu() {
  const itemNameRef = useRef();
  const costRef = useRef();
  const thumbnailRef = useRef();

  const addItemToMenu = async e => {
    e.preventDefault();
    // do work
    await addDoc(collection(db, 'menu'), {
      id: uuid(),
      itemName: itemNameRef.current.value,
      cost: Number(costRef.current.value),
      thumbnail: thumbnailRef.current.value,
    });

    itemNameRef.current.value = '';
    costRef.current.value = '';
    thumbnailRef.current.value = '';
  };
  return (
    <Flex
      align={'start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={10} mx={'auto'} w="xl" maxW={'xl'} py={12} px={8}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Add a new Menu Item</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="itemName">
              <FormLabel>Item Name</FormLabel>
              <Input type="text" ref={itemNameRef} />
            </FormControl>
            <FormControl id="thumbnail">
              <FormLabel>Thumbnail URL</FormLabel>
              <Input type="text" ref={thumbnailRef} />
            </FormControl>
            <FormControl id="cost">
              <FormLabel>Cost</FormLabel>
              <Input type="number" ref={costRef} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={addItemToMenu}
              >
                Add Item
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
