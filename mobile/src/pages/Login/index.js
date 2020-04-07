import React, { useState } from 'react';
import { View, Text } from 'react-native';

import * as S from './styles';
import Logn from '../../assets/Logn.png';

export default function Login({ navigation }) {
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');

   return (
      <S.Container>
         <S.Image source={Logn} />
         <S.Box>
            <S.Message>E-mail</S.Message>
            <S.Input onChange={(e) => setEmail(e.target.value)}></S.Input>
            <S.Message>Senha</S.Message>
            <S.Input
               onChange={(e) => setSenha(e.target.value)}
               type="password"
            ></S.Input>
         </S.Box>
         <S.Button>
            <Text style={{ color: 'white' }}>Entrar</Text>
         </S.Button>

         <S.Cadastrese>Não tem uma conta ?</S.Cadastrese>
         <S.Button onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: 'white' }}>Cadastre-se !</Text>
         </S.Button>
      </S.Container>
   );
}
