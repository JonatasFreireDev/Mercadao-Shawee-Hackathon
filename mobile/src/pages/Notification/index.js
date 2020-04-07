import React from 'react';
import { View, Text, FlatList } from 'react-native';

import * as S from './styles';

export default function Notification() {
   const value = false;

   return (
      <S.Container>
         <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            keyExtractor={(item) => String(item)}
            renderItem={(notification) => (
               <S.Notification>
                  {value ? <S.NewNotification /> : null}
                  <S.TextNotification>
                     Vendedor tal alterou o status do pedido
                  </S.TextNotification>
                  <S.DataNotification>16/03/2019</S.DataNotification>
               </S.Notification>
            )}
         />
      </S.Container>
   );
}
