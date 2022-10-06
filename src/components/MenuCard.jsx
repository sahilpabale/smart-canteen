import React from 'react';
import { Box, Text, HStack, Image, VStack, IconButton } from '@chakra-ui/react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function MenuCard({
  item,
  forCart,
  incrementCart,
  decrementCart,
}) {
  return (
    <Box key={item.id} bg="blue.800" h="100%" rounded="10px">
      <HStack>
        <Image src={item.thumbnail} borderLeftRadius="10px" boxSize="120px" />
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
        {forCart ? (
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
        ) : null}
      </HStack>
    </Box>
  );
}
