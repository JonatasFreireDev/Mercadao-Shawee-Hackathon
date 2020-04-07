import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
`;

export const Busca = styled.TextInput.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
   // autoFocus: true,
})`
   background: #eee;
   margin: 20px;
   height: 50px;
   border-radius: 15px;
   padding: 0 15px;
`;

export const Box = styled.View.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
})`
   flex: 1;
   flex-direction: column;
   align-items: center;
   background: #f3f3f3;
   border-radius: 10px;
   margin: 10px 15px;
`;

export const BarBox = styled.View`
   flex-direction: row;
   justify-content: space-between;
   margin: 10px;
   padding: 10px;
   width: 100%;
   background: #ff5858;
`;

export const Foto = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   margin: 15px auto 0 auto;
`;

export const Name = styled.Text`
   color: white;
   font-family: 'sans-serif';
`;

export const Km = styled.Text`
   color: white;
   font-family: 'sans-serif';
`;
