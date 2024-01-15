const fs = require('fs');
const xlsx = require('xlsx');
const { exec } = require('child_process');

// Verifica si se proporciona el nombre del archivo Excel como argumento
if (process.argv.length !== 3) {
    console.log('Uso: node script.js contacts.xlsx');
    process.exit(1);
}

// Nombre del archivo Excel proporcionado como argumento
const excelFile = process.argv[2];

// Comprueba si el archivo Excel existe
if (!fs.existsSync(excelFile)) {
    console.log(`El archivo ${excelFile} no existe.`);
    process.exit(1);
}

// Lee el archivo Excel
const workbook = xlsx.readFile(excelFile);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convierte la hoja a CSV
const csvData = xlsx.utils.sheet_to_csv(sheet);

// Divide las líneas del CSV y obtiene la primera columna
const phoneColumn = csvData.split('\n').map(row => row.split(',')[0]);

// Filtra y elimina los valores no válidos
const validPhones = phoneColumn.filter(phone => /^\d+$/.test(phone));
console.log(validPhones);

// Abre cada número de teléfono en el navegador predeterminado
validPhones.forEach(phone => {
    const whatsappUrl = `whatsapp://send?phone=${phone}`;
    console.log(whatsappUrl);
    // const command = `open "${whatsappUrl}"`;
    // exec(command, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error al abrir el navegador: ${error.message}`);
    //     }
    // });
});