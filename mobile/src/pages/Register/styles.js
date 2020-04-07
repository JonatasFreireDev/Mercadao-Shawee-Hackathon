import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
   flex: 1;
   justify-content: center;
   text-align: center;
`;

export const Input = styled.TextInput.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
   // autoFocus: true,
})`
   background: #eee;
   padding: 10px;
   height: 50px;
   border-radius: 15px;
`;

export const Image = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   max-height: 200px;
   max-width: 200px;
   margin: auto;
`;

export const Box = styled.View`
   justify-content: center;
   text-align: center;
   margin: 20px;
`;

export const Cadastrese = styled.Text`
   justify-content: center;
   text-align: center;
   margin: 0px;
`;

export const Message = styled.Text`
   margin: 0px;
   font-size: 18px;
   margin-top: 15px;
   margin-bottom: 5px;
   color: grey;
   text-align: left;
`;

export const Button = styled(RectButton).attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
   borderBottomColor: '#000000',
   borderBottomWidth: 1,
   // autoFocus: true,
})`
   flex-direction: row;
   height: 50px !important;
   border-radius: 10px;
   background: #64b6ff;
   justify-content: center;
   align-items: center;
   margin: 20px;
`;
