import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
   const persistReducer = persistReducer(
      {
         key: 'mercadaodobem',
         storage,
         whitelist: [''],
      },
      reducers
   );

   return persistReducer;
};
