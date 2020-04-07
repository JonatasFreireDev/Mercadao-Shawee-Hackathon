import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
   flex: 1;
   justify-content: space-evenly;
`;

export const Perfil = styled.View`
   flex: 1;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   margin: 20px;
`;

export const PerfilBox = styled.View`
   flex: 1;
   justify-content: space-around;
   height: 50%;
   margin: 15px;
`;

export const Image = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   width: 110px;
   height: 110px;
   margin: auto;
`;

export const PerfilName = styled.Text`
   color: grey;
   font-size: 20px;
`;

export const Box = styled.View`
   flex: 1;
   background: #fff;
   margin: 0 20px 20px 20px;
   border-radius: 10px;
   padding: 10px;
`;

export const RowBox = styled.View`
   flex: 1;
   align-items: center;
   justify-content: space-between;
   margin: 0 10px;
   flex-direction: row;
`;

export const NameItem = styled.Text`
   flex: 1;
   text-align: left;
   margin: 0 10px;
`;

export const Next = styled(MaterialIcons).attrs({
   name: 'navigate-next',
   size: 20,
   color: 'grey',
})``;
