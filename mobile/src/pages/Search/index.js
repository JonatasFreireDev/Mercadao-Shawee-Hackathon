import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles';
import Agente from '../../assets/agente.png';

export default function Search() {
   return (
      <S.Container>
         <S.Busca
            placeholder="Busque um vendedor"
            placeholderTextColor={'grey'}
         >
            <Ionicons name="ios-search" size={20} color={'grey'} />
         </S.Busca>
         <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item) => String(item)}
            numColumns={2}
            renderItem={(vendedor) => (
               <S.Box>
                  <S.Foto source={Agente} />
                  <S.BarBox>
                     <S.Name>Sao Benedito</S.Name>
                     <S.Km>1,3 Km</S.Km>
                  </S.BarBox>
               </S.Box>
            )}
         />
      </S.Container>
   );
}
