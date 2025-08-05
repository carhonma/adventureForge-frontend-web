const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'public-files', 'ads.txt');
const targets = [
  path.join(__dirname, 'dist', 'carhonmaweb', 'browser', 'ads.txt'),
  path.join(__dirname, 'dist', 'carhonmaweb', 'static', 'browser', 'ads.txt')
];

if (!fs.existsSync(src)) {
  console.error('❌ El archivo ads.txt no existe en public-files.');
  process.exit(1);
}

targets.forEach((dest) => {
  const dir = path.dirname(dest);
  fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error(`❌ Error creando el directorio ${dir}:`, mkdirErr.message);
      return;
    }

    fs.copyFile(src, dest, (copyErr) => {
      if (copyErr) {
        console.error(`❌ Error copiando ads.txt a ${dest}:`, copyErr.message);
      } else {
        console.log(`✅ ads.txt copiado correctamente a: ${dest}`);
      }
    });
  });
});
