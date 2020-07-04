import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment'
import { fromBase64 } from '../../utils/utils'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async(req, res) => {

  try {
   
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[2];
    const data = JSON.parse(req.body);

    const sheetConfig = doc.sheetsByIndex[1];
    await sheetConfig.loadCells('A2:B2');

    const cellShowPromotion = sheetConfig.getCell(1, 0);
    const cellTextPromotion = sheetConfig.getCell(1, 1);

    let coupom = '';
    let promotion = '';

    const genCoupom = () => {
      const code = parseInt(moment().format('YYMMDDhhmmssSSS')).toString(16).toUpperCase();
      return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4);
    }

    if (cellShowPromotion.value === true) {
      // TODO gerar coupom
      coupom = genCoupom();
      promotion = cellTextPromotion.value;
    }

    //Nome	Email	WhatsApp	Cupom	Promo
    
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      WhatsApp: data.WhatsApp,
      Nota: data.Nota,
      'Data Preenchimento': moment().format('DD/MM/YYYY hh:mm:ss'),
      Cupom: coupom,
      Promo: promotion
    });

    res.end(JSON.stringify({
      showCoupom: coupom !== '',
      Cupom: coupom,
      Promo: promotion
    }));
    
  } catch (error) {
    console.log(error);
    res.end('error');
  }
}