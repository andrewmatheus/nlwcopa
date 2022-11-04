import { Center, Text, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

import Logo from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

export function SignIn() {
  const { signIn, user } = useAuth()

  console.log('texto dados user: ', user)

  return (
    <Center flex={1} bgColor={"gray.900"} p={7} >      
      <Logo width={212} height={40} />

      <Button 
        type='SECONDARY'        
        title='ENTRAR COM O GOOGLE' 
        leftIcon={<Icon as={Fontisto} name='google' color="white" size="md" />} 
        mt={12}
        onPress={signIn}
      />

      <Text
        textAlign="center"
        mt={4}
        color="white"
      >
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.  
      </Text>
    </Center>
  )
}