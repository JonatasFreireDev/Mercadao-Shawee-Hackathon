import React, { useState } from 'react';
import { View, Text } from 'react-native';

import * as S from './styles';

import { Pagination } from 'react-native-snap-carousel';

import Intro1 from '../../assets/1intro.png';
import Intro2 from '../../assets/2intro.png';
import Intro3 from '../../assets/3intro.png';

export default function Apresentation({ navigation }) {
   const [page, setPage] = useState();

   const apresent = [
      {
         image: Intro1,
         message: 'Encontre o que deseja no seu próprio bairro',
      },
      {
         image: Intro2,
         message:
            'Compre sem sair de casa para sua segurança e de toda sua familia',
      },
      {
         image: Intro3,
         message: 'Fortaleça os vendedores e comerciantes do seu bairro',
      },
   ];

   return (
      <S.Container>
         <S.List
            data={apresent}
            keyExtractor={(item) => String(item.message)}
            onSnapToItem={(index) => setPage(index)}
            renderItem={({ item }) => (
               <S.Steps>
                  <S.Image source={item.image} />
                  <S.Message>{item.message}</S.Message>
               </S.Steps>
            )}
         />
         <S.Button onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white' }}>Pular</Text>
         </S.Button>
         <Pagination
            dotsLength={3}
            activeDotIndex={page || 0}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            dotStyle={{
               width: 10,
               height: 10,
               borderRadius: 5,
               marginHorizontal: 8,
               backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
         />
      </S.Container>
   );
}
