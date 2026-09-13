/* generate-import-file.js */
/* Aggregate system color JSON files into a single file to import */


import fs    from 'fs';
import os    from 'os';
import path  from 'path';
import util  from 'util';

const axeVersion = '1.0';

const infoFilename    = path.join(`system-color-info.js`);
const importFilename  = path.join(`system-color-import.js`);
const importPath      = path.join('system-color-data', `system-color-info.js`);

let systemColorInfo = '';
let systemColorImport = 'import {';


const directoryPath = './';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }

  files.forEach(file => {
    if (file.includes('json')) {
      console.log(file);
      try {
        const data = fs.readFileSync(file, 'utf8');
        let exportName = file.replace('.json', '');
        exportName = exportName.replaceAll('-', '_');
        systemColorInfo += `export const ${exportName} = ${data}\n\n`;
        systemColorImport += `\n  ${exportName},`;
      } catch (err) {
        console.error(`Error reading ${file}:`, err);
      }
    }
  });
  systemColorImport.slice(0, -1);
  systemColorImport += `\n} from '${importPath}';\n`;

  function writeFile(file, data) {
    try {
      fs.writeFileSync(file, data, 'utf8');
      console.log(`${file} written successfully!`);
    } catch (err) {
      console.error(`Error writing to ${file}:`, err);
    }
  }

  writeFile(infoFilename, systemColorInfo);
  writeFile(importFilename, systemColorImport);
});
