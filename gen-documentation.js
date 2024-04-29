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

const files = [
  { template: './src-docs/templates/content-index.njk',
    title: 'Home',
    menuName: 'Home',
    filename: 'index.html'
  },
  { template: './src-docs/templates/content-workshops.njk',
    title: 'Workshops',
    menuName: 'Workshops',
    filename: 'workshops.html'
  },
  { template: './src-docs/templates/content-consulting.njk',
    title: 'Consulting and Mentoring',
    menuName: 'Consulting',
    filename: 'consulting.html'
  },
  { template: './src-docs/templates/content-tools.njk',
    title: 'Open-Source Tools',
    menuName: 'Tools',
    filename: 'tools.html'
  },
  { template: './src-docs/templates/content-standards.njk',
    title: 'Standards',
    menuName: 'Standards',
    filename: 'standards.html'
  },
  { template: './src-docs/templates/content-about.njk',
    title: 'About',
    menuName: 'About',
    filename: 'about.html'
  }
  ];

// Create files

files.forEach( f => {
  outputFile(f.filename, nunjucks.render(f.template, {title: f.title, files: files}));
})

/*
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
*/
