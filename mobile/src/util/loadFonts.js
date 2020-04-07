import * as Font from 'expo-font';

const fetchFonts = async () => {
   return await Font.loadAsync({
      bebasNeue: require('../../assets/fonts/BebasNeue-Regular.ttf'),
      montserrat: require('../../assets/fonts/Montserrat-Regular.ttf'),
   });
};

export default fetchFonts();
