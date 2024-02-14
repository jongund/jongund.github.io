/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');

/* Constants */

const outputDirectory = './docs/';

// setUseCodeTags(true);

/* Helper functions */

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}

// Create index file

const htmlIndex = nunjucks.render('./src-docs/templates/content-index.njk', {title: 'Welcome to the OpenA11y Evaluation Library'});
outputFile('index.html', htmlIndex);

