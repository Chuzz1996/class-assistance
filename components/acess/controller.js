const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('../../client_secret.json');

async function accessSpreadsheet(mail){
  return new Promise(async (resolve,reject)=>{
    const doc = new GoogleSpreadsheet(process.env.SHEET);
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const rows = await promisify(sheet.getRows)({
      offset: 1,
    })
    var valid = false;
    var code = '';
    rows.forEach(row=>{
      if(row.correo == mail){
        valid = true;
        code = row.codigo;
      }
    })
    if(!valid){
      reject("Mail doesn't exist in this class");
    }
    else{
      const sheet_dates = info.worksheets[1];
      const rows_dates = await promisify(sheet_dates.getRows)({
        offset: 1,
      })
      var today = new Date();
      var date = String(today.getDate()).padStart(2, '0')+"-"+String(today.getMonth() + 1).padStart(2, '0')+"-"+(today.getFullYear()-2000);
      var success = true;
      rows_dates.forEach(row=>{
        if(row.codigo==code && row.dia==date){
          success = false;
        }
      });
      if(success){
        const row = {
          codigo: code,
          dia: date
        }
        await promisify(sheet_dates.addRow)(row);
        resolve('Assistent Taken');
      }else{
        reject('Assistent already exits');
      }
    }
  })
}

module.exports = {
    accessSpreadsheet
}