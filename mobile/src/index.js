import React from 'react';

import './util/loadFonts';
import './config/ReactotronConfig';

import Routes from './routes/routes';
import { StatusBar } from 'react-native';

export default function MainApp() {
   return (
      <>
         <StatusBar barStyle="dark-content" backgroundColor="#eee" />
         <Routes />
      </>
   );
}
