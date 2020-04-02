import cep from 'cep-promise';
import * as Yup from 'yup';

import Address from '../models/Address';
import getCoordinates from '../util/getCoordinates';

class AddressController {
   async store(req, res) {
      const schema = Yup.object().shape({
         street: Yup.string().required(),
         number: Yup.number().positive().required(),
         neighborhood: Yup.string().required(),
         city: Yup.string().required(),
         state: Yup.string().required(),
         country: Yup.string().required(),
         postal_code: Yup.number().positive().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // Consulta o codigo postal para ver se existe
      const postalCode = await cep(req.body.postal_code)
         .then((data) => data)
         .catch((err) => {
            return { type: err.type, message: err.message };
         });

      if (postalCode.type === 'service_error') {
         return res.status(400).json({ error: postalCode.message });
      }

      // Se os dados do cep consultado for diferente do informado, retorna erro.
      // if (
      //    // req.body.street.toLowerCase() !== postalCode.street.toLowerCase() ||
      //    req.body.state.toLowerCase() !== postalCode.state.toLowerCase() ||
      //    req.body.city.toLowerCase() !== postalCode.city.toLowerCase() ||
      //    req.body.neighborhood.toLowerCase() !==
      //       postalCode.neighborhood.toLowerCase()
      // ) {
      //    return res.status(401).json({
      //       error: 'The Address does not match with the Postal Code',
      //       postalCode,
      //    });
      // }

      // Pega as coordenadas da localização
      const { lat, lng } = await getCoordinates(
         req.body.street,
         req.body.number,
         req.body.neighborhood,
         req.body.city,
         req.body.state,
         req.body.country
      );

      // Verifica qual tipo de usuario
      const userType = req.typeUser;
      const { userId } = req;

      let data = '';

      if (userType === 'entrepreneurial') {
         data = await Address.create({
            ...req.body,
            lat,
            lng,
            entrepreneurial_id: userId,
         });
      } else if (userType === 'user') {
         data = await Address.create({
            ...req.body,
            lat,
            lng,
            user_id: userId,
         });
      }

      const {
         id,
         street,
         number,
         neighborhood,
         city,
         state,
         country,
         postal_code,
      } = data;

      return res.json({
         id,
         street,
         number,
         neighborhood,
         city,
         state,
         country,
         postal_code,
         coordinates: {
            lat,
            lng,
         },
      });
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         street: Yup.string().when('neighborhood', (neighborhood, field) =>
            neighborhood ? field.required() : field
         ),
         number: Yup.number()
            .when('street', (street, field) =>
               street ? field.required() : field
            )
            .positive(),
         neighborhood: Yup.string().when('city', (city, field) =>
            city ? field.required() : field
         ),
         city: Yup.string().when('state', (state, field) =>
            state ? field.required() : field
         ),
         state: Yup.string().when('country', (country, field) =>
            country ? field.required() : field
         ),
         country: Yup.string(),
         postal_code: Yup.number().positive().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      if (req.body.user_id || req.body.entrepreneurial_id) {
         return res
            .status(400)
            .json({ error: 'You dont have permission to do this' });
      }

      // Procura pelo endereço ja cadastrado
      const address = await Address.findByPk(req.params.id);

      const postalCode = await cep(req.body.postal_code)
         .then((data) => data)
         .catch((err) => {
            return { type: err.type, message: err.message };
         });

      if (postalCode.type === 'service_error') {
         return res.status(400).json({ error: postalCode.message });
      }

      // if (
      //    // req.body.street.toLowerCase() !== postalCode.street.toLowerCase() ||
      //    req.body.state.toLowerCase() !== postalCode.state.toLowerCase() ||
      //    req.body.city.toLowerCase() !== postalCode.city.toLowerCase() ||
      //    req.body.neighborhood.toLowerCase() !==
      //       postalCode.neighborhood.toLowerCase()
      // ) {
      //    return res.status(401).json({
      //       error: 'The Address does not match with the Postal Code',
      //       postalCode,
      //    });
      // }

      const { lat, lng } = await getCoordinates(
         req.body.street ? req.body.street : '',
         req.body.number ? req.body.number : '',
         req.body.neighborhood ? req.body.neighborhood : '',
         req.body.city ? req.body.city : '',
         req.body.state ? req.body.state : '',
         req.body.countr ? req.body.count : ''
      );

      const {
         id,
         street,
         number,
         neighborhood,
         city,
         state,
         country,
         postal_code,
      } = await address.update({ ...req.body, lat, lng });

      return res.json({
         id,
         street,
         number,
         neighborhood,
         city,
         state,
         country,
         postal_code,
         coordinates: {
            lat,
            lng,
         },
      });
   }

   async delete(req, res) {
      const address = await Address.findByPk(req.params.id);

      if (!address) {
         return res.status(401).json({ error: 'Address does not exists' });
      }

      await address.destroy();

      return res.json({
         sucess: 'Address was deleted',
      });
   }
}

export default new AddressController();
