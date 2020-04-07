import styled from 'styled-components/native';

export const Title = styled.Text`
   margin: 30px auto 10px auto;
   font-size: 30px;
   font-family: 'sans-serif';
`;

export const MainContainer = styled.View`
   flex: 1;
   background: #eee;
`;

export const Container = styled.View`
   flex: 1;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: center;
   align-content: center;
`;

export const Blocks = styled.View.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
})`
   width: 110px;
   min-height: 30%;
   border-radius: 10px;
   padding: 5px;
   margin: 5px;
   flex-wrap: nowrap;
   justify-content: center;
   align-content: center;
   background: #f8fbff;
`;

export const Image = styled.Image.attrs({
   resizeMode: 'stretch',
})`
   margin: auto;
`;

export const Text = styled.Text`
   text-align: center;
   margin: auto;
`;
