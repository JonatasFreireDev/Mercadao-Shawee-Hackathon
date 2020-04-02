import axios from 'axios';

import apiKey from '../../config/here';

export default async function (
   street,
   number,
   neighborhood,
   city,
   state,
   country
) {
   const address = encodeURIComponent(
      `${street} ${number} ${neighborhood} ${city} ${state} ${country}`
   );

   const resp = await axios
      .get(
         `
   https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${apiKey.apiKey}
   `
      )
      .catch((err) => {
         return err.message;
      });

   return resp.data.items[0].position;
}
