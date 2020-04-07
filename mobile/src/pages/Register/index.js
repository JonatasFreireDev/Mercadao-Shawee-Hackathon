import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Alert } from 'react-native';

import api from '../../services/api';

import * as S from './styles';
import Abertura from '../../assets/abertura.png';

export default function Register({ navigation }) {
   const [nome, setNome] = useState('');
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [isloading, setIsloading] = useState(false);

   async function register() {
      setIsloading(true);

      const data = {
         name: nome,
         email,
         password: senha,
         date_age: new Date(),
      };

      try {
         const resp = await api.post('/user', data);

         console.tron.log(resp);

         navigation.goBack();
         setIsloading(false);
      } catch (err) {
         setIsloading(false);
         Alert.alert(err.response.error.message);
      }
   }

   return (
      <S.Container>
         <S.Image source={Abertura} />
         <S.Box>
            <S.Message>Nome</S.Message>
            <S.Input
               value={nome}
               onChange={(e) => setNome(e.target.value)}
            ></S.Input>
            <S.Message>E-mail</S.Message>
            <S.Input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            ></S.Input>
            <S.Message>Senha</S.Message>
            <S.Input
               value={senha}
               onChange={(e) => setSenha(e.target.value)}
               type="password"
            ></S.Input>
         </S.Box>
         {isloading ? null : (
            <S.Button>
               <Text style={{ color: 'white' }} onPress={() => register()}>
                  Cadastrar
               </Text>
            </S.Button>
         )}
      </S.Container>
   );
}
