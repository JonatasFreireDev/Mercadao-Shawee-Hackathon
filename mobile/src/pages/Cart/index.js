import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import * as S from './styles';
import { MaterialIcons } from '@expo/vector-icons';

import Açougue from '../../assets/acougue.png';
import Agua from '../../assets/Agua.png';
import Burger from '../../assets/Burger.png';
import Camisa from '../../assets/Camisa.png';
import Pao from '../../assets/Pao.png';
import Legumes from '../../assets/Legumes.png';
import Bolo from '../../assets/Bolo.png';
import Servicos from '../../assets/Servicos.png';
import Drogas from '../../assets/Drogas.png';

export default function Cart() {
   const apresent = [
      {
         image: Camisa,
         name: 'Camiseta descolada',
         price: 59,
         quantidade: 1,
      },
      {
         image: Legumes,
         name: 'Legumes refogado',
         price: 12,
         quantidade: 1,
      },
      {
         image: Drogas,
         name: 'Benegripe',
         price: 40,
         quantidade: 1,
      },
      {
         image: Agua,
         name: 'Agua',
         price: 2,
         quantidade: 1,
      },
   ];

   const TotPrice = useMemo(() => {
      const result = apresent.reduce(
         (accumulator, product) => accumulator + product.price,
         0
      );

      return result;
   }, [apresent]);

   return (
      <S.Container>
         <S.Total>
            <S.TextTotal>TOTAL :</S.TextTotal>
            <S.QuantityTotal>R$ {TotPrice},00</S.QuantityTotal>
         </S.Total>
         <FlatList
            data={apresent}
            keyExtractor={(item) => String(item.name)}
            renderItem={({ item }) => (
               <S.Item>
                  <S.Image source={item.image} />
                  <S.View>
                     <S.Box>
                        <S.Name>{item.name}</S.Name>
                        <S.Name>R$ {item.price},00</S.Name>
                     </S.Box>
                     <S.Box>
                        <S.Quantity>
                           <MaterialIcons
                              name="remove-circle-outline"
                              size={25}
                              color={'#FF5858'}
                           />
                           <S.QuantityText>1</S.QuantityText>
                           <MaterialIcons
                              name="add-circle-outline"
                              size={25}
                              color={'#FF5858'}
                           />
                        </S.Quantity>
                        <MaterialIcons name="delete" size={30} color={'grey'} />
                     </S.Box>
                  </S.View>
               </S.Item>
            )}
         />

         <S.Button>
            <S.ButtonText>Realizar o Pagamento</S.ButtonText>
         </S.Button>
      </S.Container>
   );
}
