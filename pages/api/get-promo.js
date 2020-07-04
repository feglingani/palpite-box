import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async(req, res) => {

  try {
    
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY
    });

    await doc.loadInfo();

    const sheetConfig = doc.sheetsByIndex[1];
    await sheetConfig.loadCells('A2:B2');

    const cellShowPromotion = sheetConfig.getCell(1, 0);
    const cellTextPromotion = sheetConfig.getCell(1, 1);

    res.end(JSON.stringify({
      showCoupon: cellShowPromotion.value,
      message: cellTextPromotion.value
    }));

  } catch (error) {
    console.log(error);
    /*res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }));*/
  }
}