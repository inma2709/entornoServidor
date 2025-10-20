const path = require('path');

const ruta = path.join(__dirname, 'carpeta', 'archivo.txt');
console.log(ruta);

const rutaAbsoluta = path.resolve('carpeta', 'archivo.txt');
console.log(rutaAbsoluta);

const nombreArchivo = path.basename(ruta);
console.log('Nombre del archivo:', nombreArchivo);