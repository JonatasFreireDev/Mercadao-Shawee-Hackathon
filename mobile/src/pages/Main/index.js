import React from 'react';

import * as S from './styles';
import Açougue from '../../assets/acougue.png';
import Agua from '../../assets/Agua.png';
import Burger from '../../assets/Burger.png';
import Camisa from '../../assets/Camisa.png';
import Pao from '../../assets/Pao.png';
import Legumes from '../../assets/Legumes.png';
import Bolo from '../../assets/Bolo.png';
import Servicos from '../../assets/Servicos.png';
import Drogas from '../../assets/Drogas.png';

export default function Main() {
   return (
      <S.MainContainer>
         <S.Title>Encontre no seu bairro...</S.Title>
         <S.Container>
            <S.Blocks>
               <S.Image source={Legumes} />
               <S.Text>Verduras e Legumes</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Pao} />
               <S.Text>Padaria</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Açougue} />
               <S.Text>Açougue</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Burger} />
               <S.Text>Lanchonete</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Agua} />
               <S.Text>Bebidas</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Servicos} />
               <S.Text>Serviços</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Bolo} />
               <S.Text>Doces e Salgados</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Camisa} />
               <S.Text>Vestimentas</S.Text>
            </S.Blocks>
            <S.Blocks>
               <S.Image source={Drogas} />
               <S.Text>Outros</S.Text>
            </S.Blocks>
         </S.Container>
      </S.MainContainer>
   );
}
