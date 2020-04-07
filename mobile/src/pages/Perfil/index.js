import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Batman from '../../assets/batman.jpeg';
import * as S from './styles';

export default function Perfil() {
   return (
      <S.Container>
         <S.Perfil>
            <S.Image source={Batman} />
            <S.PerfilBox>
               <S.PerfilName>I am Batman</S.PerfilName>
               <Text>Batman@batcaverna.com</Text>
               {/* <Text>Name</Text> */}
            </S.PerfilBox>
         </S.Perfil>
         <S.Box>
            <S.RowBox>
               <MaterialIcons name="format-list-bulleted" size={20} />
               <S.NameItem>Todos os pedidos</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="shopping-basket" size={20} />
               <S.NameItem>Pedidos em andamento</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="credit-card" size={20} />
               <S.NameItem>Meios de pagamentos</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="room" size={20} />
               <S.NameItem>Endereços</S.NameItem>
               <S.Next />
            </S.RowBox>
         </S.Box>
         <S.Box>
            <S.RowBox>
               <MaterialIcons name="email" size={20} />
               <S.NameItem>Convidar clientes</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="mode-comment" size={20} />
               <S.NameItem>Entrar em contato com suporte</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="insert-emoticon" size={20} />
               <S.NameItem>Avaliar o aplicativo</S.NameItem>
               <S.Next />
            </S.RowBox>
            <S.RowBox>
               <MaterialIcons name="mode-edit" size={20} />
               <S.NameItem>Fazer uma sugestao</S.NameItem>
               <S.Next />
            </S.RowBox>
         </S.Box>
      </S.Container>
   );
}
