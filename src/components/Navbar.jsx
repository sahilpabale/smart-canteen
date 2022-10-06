import {
  Text,
  Box,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  useColorMode,
  useColorModeValue,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import { FaMoon, FaSun } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import CartMenu from './CartMenu';

export default function Nav({ title, navBtn, hasCheckout }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { googleSignIn, user } = UserAuth();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      onOpen();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Failed to Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Please use the acccount associated with VES Email Address!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={3}>
              <Button onClick={toggleColorMode} variant="ghost">
                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
              {hasCheckout ? <CartMenu /> : null}

              {user == null ? (
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              ) : (
                navBtn
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
