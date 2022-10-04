import { FcGoogle } from 'react-icons/fc';
import { Button, Center, Text } from '@chakra-ui/react';

export default function GoogleAuth({ onClick }) {
  return (
    <Center p={8}>
      <Button
        onClick={onClick}
        w={'full'}
        maxW={'lg'}
        size={'lg'}
        variant={'outline'}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}
