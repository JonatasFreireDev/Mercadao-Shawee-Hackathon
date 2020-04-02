import axios from 'axios';

export default async function verifyCNPJ(cnpj, namePerson) {
   const isCnpj = await axios
      .get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
      .catch((err) => {
         return { status: false, message: err.message };
      });

   if (isCnpj.data.status === 'ERROR') {
      return { status: false, message: isCnpj.data.message };
   }

   const { nome } = isCnpj.data.qsa[0];
   const { situacao } = isCnpj.data;

   if (!(namePerson.toLowerCase() === nome.toLowerCase())) {
      return { status: false, message: 'CNPJ does not match with de name' };
   }

   if (situacao === 'desativada') {
      return { status: false, message: 'CNPJ disabled' };
   }

   return isCnpj;
}
