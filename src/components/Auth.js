import {
  Text,
  Flex,
  Heading,
  Stack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import GoogleAuthBtn from './buttons/GoogleAuth';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Auth() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      onOpen();
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user, navigate]);

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
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'} align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Use your{' '}
              <Text as="span" color="blue.600">
                <a
                  href="https://vesit.ves.ac.in"
                  target="_blank"
                  rel="noreferrer"
                >
                  VESIT
                </a>{' '}
              </Text>
              google account to login here!
            </Text>
            <GoogleAuthBtn onClick={handleGoogleSignIn} />
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    </>
  );
}
