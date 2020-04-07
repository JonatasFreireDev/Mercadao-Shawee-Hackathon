import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import Carousel from 'react-native-snap-carousel';

export const Container = styled.View`
   flex: 1;
   background: #667eea;
   align-items: center;
`;

export const List = styled(Carousel).attrs({
   showsVerticalScrollIndicator: false,
   horizontal: true,
   sliderWidth: 400,
   itemWidth: 400,
})`
   flex: 1;
   width: 100%;
   height: 100%;
`;

export const Image = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   margin: auto;
`;
export const Steps = styled.View`
   flex: 1;
   margin: 30px 0;
`;

export const Message = styled.Text`
   color: #fff;
   margin: 30px;
   text-align: center;
   font-size: 25px;
`;

export const Button = styled(RectButton)`
   flex-direction: row;
   min-height: 40px !important;
   min-width: 100%;
   justify-content: center;
   align-items: center;
   margin: auto;
`;
