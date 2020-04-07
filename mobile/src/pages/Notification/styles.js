import styled from 'styled-components/native';

export const Container = styled.View`
   flex: 1;
`;

export const Notification = styled.View.attrs({
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.8,
   shadowRadius: 2,
   elevation: 3,
})`
   background: red;
   height: 80px;
   padding: 10px;
   justify-content: center;
   margin: 10px 20px;
   border-radius: 10px;
   background: #fff;
`;

export const NewNotification = styled.View.attrs({
   shadowColor: 'red',
   shadowOffset: { width: 3, height: 3 },
   shadowOpacity: 1,
   shadowRadius: 4,
   elevation: 4,
})`
   position: absolute;
   width: 15px;
   height: 15px;
   top: -5px;
   right: -5px;
   border-radius: 100px;
   background: red;
`;

export const TextNotification = styled.Text`
   font-size: 16px;
   text-align: center;
`;

export const DataNotification = styled.Text`
   font-size: 14px;
   text-align: center;
`;
