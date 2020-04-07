import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   justify-content: space-between;
`;

export const Total = styled.View`
   flex: 1;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   max-height: 50px;
   min-height: 50px;
   background: #fff;
   border-radius: 10px;
   margin: 10px 20px;
   font-family: sans-serif;
`;

export const TextTotal = styled.Text`
   margin: 0 10px;
   font-weight: bold;
   font-size: 18px;
`;

export const QuantityTotal = styled.Text`
   margin: 0 10px;
   font-size: 18px;
`;

export const Item = styled.View.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
})`
   flex-direction: row;
   justify-content: space-evenly;
   align-content: center;
   height: 120px;
   margin: 10px 20px;
   padding: 10px;
   background: #f8fbff;
   border-radius: 10px;
`;

export const View = styled.View`
   flex: 1;
`;

export const Box = styled.View`
   flex: 1;
   margin: 0 15px;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

export const Image = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   max-width: 65px;
   margin: auto;
`;

export const Quantity = styled.View`
   flex-direction: row;
   text-align: center;
`;

export const QuantityText = styled.Text`
   text-align: center;
   margin: 0 10px;
   font-size: 18px;
`;

export const Name = styled.Text`
   font-size: 17px;
   text-align: center;
`;

export const Sell = styled.View`
   flex: 1;
   flex-direction: row;
   background: pink;
   max-height: 150px;
`;

export const Button = styled(RectButton)`
   flex: 1;
   flex-direction: row;
   min-height: 60px !important;
   min-width: 95%;
   justify-content: center;
   align-items: center;
   background: #667eea;
   border-radius: 10px;
   margin: 10px auto;
`;

export const ButtonText = styled.Text`
   color: #fff;
   text-align: center;
   margin: 0 10px;
   font-size: 18px;
`;
