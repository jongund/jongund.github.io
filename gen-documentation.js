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

const htmlIndex = nunjucks.render('./src-docs/templates/content-index.njk',
  {title: 'Open Web Accessibility Consulting'});
outputFile('index.html', htmlIndex);

const htmlAbout = nunjucks.render('./src-docs/templates/content-about.njk',
  {title: 'About'});
outputFile('about.html', htmlAbout);

const htmlServices = nunjucks.render('./src-docs/templates/content-services.njk',
  {title: 'Services'});
outputFile('services.html', htmlServices);

const htmlProjects = nunjucks.render('./src-docs/templates/content-projects.njk',
  {title: 'Projects'});
outputFile('projects.html', htmlProjects);
