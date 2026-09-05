/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');

/* Constants */

const tagLineName = "Web Accessibility Consulting, Workshops and Free Tools for You";

const outputDirectory   = './docs/';

const websiteURL        = 'https://opwenweba11y.com';

const mainPages = [
  { content:  'content-index.njk',
    title:    'Home',
    link:     'Home',
    filename: 'index.html'
  },
  {
    dropdown: 'Outreach',
    id: 'id-outreach',
    pages: [
      { content:  'content-sessions.njk',
        title:    'Workshops',
        link:     'Workshops',
        filename: 'workshops.html'
      },
      { content:  'content-presentations.njk',
        title:    'Presentations',
        link:     'Presentations',
        filename: 'Presentation.html'
      }
    ]
  },
  { content:  'content-consulting.njk',
    title:    'Consulting and Mentoring',
    link:     'Consulting',
    filename: 'consulting.html'
  },
  { content:  'content-standards.njk',
    title:    'Standards',
    link:     'Standards',
    filename: 'standards.html'
  },
  {
    dropdown: 'Tools',
    id: 'id-tools',
    pages: [
      { content: 'content-tools.njk',
        title: 'Open-Source Tools',
        link: 'Open-Source Tools',
        filename: 'tools.html'
      },
      { content: 'content-system-colors.njk',
        title: 'System Colors',
        link: 'System Colors',
        filename: 'system-colors.html'
      }
    ]
  },
  { content: 'content-about.njk',
    title: 'About',
    link: 'About',
    filename: 'about.html'
  }
 ];

// Create content files

function createNavigation(pages) {
  console.log(`[create Navigation]`);
  let html = '\n';
  pages.forEach( item => {
    console.log(`[create Navigation]: ${item.dropdown} ${item.filename}`);
    if (item.dropdown) {
      html += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
             data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false"
            aria-controls="${item.id}">${item.dropdown}</a>
          <ul class="dropdown-menu" id="${item.id}">`;

      item.pages.forEach( p => {
        console.log(`[dropdown][page]: ${p.filename}`);
        if (p.filename) {
          html += `<li><a class="dropdown-item" href="${p.filename}">${p.link}</a></li>`;
        }
        else {
          if (p.url) {
          html += `<li><a class="dropdown-item" href="${p.url}">${p.link}</a></li>`;
          }
          else {
            html += `<li><hr class="dropdown-divider"></li>`;
          }
        }
      });

      html += `
          </ul>
        </li>
      `;
    }
    else {
      html += `
        <li class="nav-item">
          <a class="nav-link" href="${item.filename}">${item.link}</a>
        </li>
      `;
    }
  });
  html += '\n';

  return html;
}

const mainNav = createNavigation(mainPages);

/* Helper functions */

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}

function createPage(page, mainNav, dropdownName='', dropdownPages=false) {
  if (page.filename) {
    console.log(`  [createPage]: ${page.filename}`);

    outputFile(page.filename,
      nunjucks.render('./src-docs/templates/page.njk',{
        content: page.content,
        navigation: mainNav,
        dropdownName: dropdownName,
        dropdownPages: dropdownPages,
        websiteURL: websiteURL,
        tagLineName: tagLineName,
        title: page.title
      })
    );
  }
}


// createPages(supportPages);

function createPages(pages) {
  console.log(`[create pages]`);
  pages.forEach( item => {
    if (item.dropdown) {
      item.pages.forEach( p => {
        createPage(p, mainNav, item.dropdown, item.pages);
      });
    }
    else {
      createPage(item, mainNav);
    }
  });
}

createPages(mainPages);




