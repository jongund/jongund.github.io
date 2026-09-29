/* high-contrast.js */

'use strict';

import {
  macos_apple_safari_default,
  macos_google_chrome_default,
  macos_mozilla_firefox_default,
  macos_mozilla_firefox_firefox_contrast,
  unix_google_chrome_default,
  unix_mozilla_firefox_default,
  unix_mozilla_firefox_firefox_contrast,
  windows_google_chrome_default,
  windows_google_chrome_win11_aquatic,
  windows_google_chrome_win11_desert,
  windows_google_chrome_win11_dusk,
  windows_google_chrome_win11_night,
  windows_microsoft_edge_default,
  windows_microsoft_edge_win11_aquatic,
  windows_microsoft_edge_win11_dusk,
  windows_microsoft_edge_win11_night,
  windows_mozilla_firefox_default,
  windows_mozilla_firefox_firefox_contrast,
  windows_mozilla_firefox_win11_aquatic,
  windows_mozilla_firefox_win11_desert,
  windows_mozilla_firefox_win11_dusk,
  windows_mozilla_firefox_win11_night,
} from '../system-color-data/system-color-info.js';

import {
  getColorDescription
} from './color-description.js';

const firefoxWebsiteContrast = [
  {name: 'Text',          color: '#3030ff'},
  {name: 'Background',    color: '#d0d0d0'},
  {name: 'Links',         color: '#308030'},
  {name: 'Visited Links', color: '#cc3030'}
];

const contrastThemeFeatures = [
  { name: 'Background', id: 'background' },
  { name: 'Text', id: 'text' },
  { name: 'Hyperlink', id: 'hyperlink' },
  { name: 'Inactive Text', id: 'inactiveText' },
  { name: 'Selected Background', id: 'selectedBackground' },
  { name: 'Selected Text', id: 'selectedText' },
  { name: 'Button Background', id: 'buttonBackground' },
  { name: 'Button Text', id: 'buttonText' },
];

const systemColorValues = [
  {
    value: 'AccentColor',
    name: 'Accent Color',
    contrastTheme: '',
    chromium: false,
    mozilla: false,
    desc: 'Background of accented user interface controls',
  },
  {
    value: 'AccentColorText',
    name: 'Accent Color Text',
    contrastTheme: '',
    chromium: false,
    mozilla: false,
    desc: 'Text of accented user interface controls',
  },
  {
    value: 'ActiveText',
    name: 'Active Text',
    contrastTheme: 'Hyperlink',
    chromium: true,
    mozilla: true,
    desc: 'Text of active links',
  },
  {
    value: 'ButtonBorder',
    name: 'Button Border',
    contrastTheme: 'Button Text',
    chromium: true,
    mozilla: true,
    desc: 'Base border color of controls',
  },
  {
    value: 'ButtonFace',
    name: 'Button Face',
    contrastTheme: 'Button Background',
    chromium: true,
    mozilla: true,
    desc: 'Background color of controls',
  },
  {
    value: 'ButtonText',
    name: 'Button Text',
    contrastTheme: 'Button Text',
    chromium: true,
    mozilla: true,
    desc: 'Text color of controls',
  },
  {
    value: 'Canvas',
    name: 'Canvas',
    contrastTheme: 'Background',
    chromium: true,
    mozilla: true,
    desc: 'Background of application content or documents',
  },
  {
    value: 'CanvasText',
    name: 'Canvas Text',
    contrastTheme: 'Text',
    chromium: true,
    mozilla: true,
    desc: 'Text color in application content or documents',
  },
  {
    value: 'Field',
    name: 'Field',
    contrastTheme: 'Button Background',
    chromium: true,
    mozilla: true,
    desc: 'Background of input fields',
  },
  {
    value: 'FieldText',
    name: 'Field Text',
    contrastTheme: 'Button text color',
    chromium: true,
    mozilla: true,
    desc: 'Text in input fields',
  },
  {
    value: 'GrayText',
    name: 'Gray Text',
    contrastTheme: 'Inactive Text',
    chromium: true,
    mozilla: true,
    desc: 'Text color for disabled items (e.g. a disabled control)',
  },
  {
    value: 'Highlight',
    name: 'Highlight',
    contrastTheme: 'Selected Background',
    chromium: true,
    mozilla: true,
    desc: 'Background of selected items',
  },
  {
    value: 'HighlightText',
    name: 'Highlight Text',
    contrastTheme: 'Selected Text',
    chromium: true,
    mozilla: true,
    desc: 'Text color of selected items',
  },
  {
    value: 'LinkText',
    name: 'Link Text',
    contrastTheme: 'Hyperlink',
    chromium: true,
    mozilla: true,
    desc: 'Text of non-active, non-visited links',
  },
  {
    value: 'Mark',
    name: 'Mark',
    contrastTheme: '',
    chromium: false,
    mozilla: false,
    desc: 'Background of text that has been specially marked (such as by the HTML mark element)',
  },
  {
    value: 'MarkText',
    name: 'Mark Text',
    contrastTheme: '',
    chromium: false,
    mozilla: false,
    desc: 'Text that has been specially marked (such as by the HTML mark element)',
  },
  {
    value: 'SelectedItem',
    name: 'Selected Item',
    contrastTheme: 'Selected Background',
    chromium: false,
    mozilla: true,
    desc: 'Background of selected items, for example, a selected checkbox',
  },
  {
    value: 'SelectedItemText',
    name: 'Selected Item Text',
    contrastTheme: 'Selected Text',
    chromium: false,
    mozilla: true,
    desc: 'Text of selected items',
  },
  {
    value: 'VisitedText',
    name: 'Visited Text',
    contrastTheme: 'Hyperlink',
    chromium: true,
    mozilla: false,
    desc: 'Text of visited links',
  },
];

/*
 * @function getBrowserName
 *
 * @desc  Returns the browser name from browser information
 *
 * @return {String) @desc
 */

function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Edg")) {
        return "Microsoft Edge";
    } else if (userAgent.includes("Opr") || userAgent.includes("Opera")) {
        return "Opera";
    } else if (userAgent.includes("Chrome")) {
        return "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Mozilla Firefox";
    } else if (userAgent.includes("Safari")) {
        return "Apple Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
    } else {
        return "Unknown Browser";
    }
}

/*
 * @function getOSName
 *
 * @desc  Returns the Operating System name from browser information
 *
 * @return {String) @desc
 */

function getOSName() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Win") !== -1) return "Windows";
  if (userAgent.indexOf("Mac") !== -1) return "MacOS";
  if (userAgent.indexOf("X11") !== -1) return "UNIX";
  if (userAgent.indexOf("Linux") !== -1) return "Linux";
  if (userAgent.indexOf("Android") !== -1) return "Android";
  if (userAgent.indexOf("like Mac") !== -1) return "iOS";

  return "Unknown OS";
}

/*
 * @function getFileName
 *
 * @desc  Returns the file name based on system color,
 *        browser and theme information
 *
 * @return {String) @desc
 */

function getFileName(info) {
  let fileName = getOSName().replace(' ', '-');
  fileName += '-' + getBrowserName().replace(' ', '-');
  fileName += '-' + info.theme + '.json';
  return fileName.toLowerCase();
}


/*
 * @function rgb2Hex
 *
 * @desc  Converts a RGB color to its equivalent hex color value
 *
 * @param {String}   rgb: The color of in RGB format
 *
 * @return {String) d=see @desc
 */

function rgb2Hex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.split('(')[1].split(')')[0].split(sep);

  let a = rgb[3] ? parseFloat(rgb[3]) : 1;

  if (a < 0.01) {
    return 'transparent';
  }

  let r = Math.round(parseInt(rgb[0]) * a + 255 * (1 - a)).toString(16),
    g = Math.round(parseInt(rgb[1]) * a + 255 * (1 - a)).toString(16),
    b = Math.round(parseInt(rgb[2]) * a + 255 * (1 - a)).toString(16);

  if (r.length == 1) {
    r = '0' + r;
  }
  if (g.length == 1) {
    g = '0' + g;
  }
  if (b.length == 1) {
    b = '0' + b;
  }

  const hex = '#' + r + g + b;

  return hex;
}

// Fill in System color table

function getMonth(d) {

  const abbrevs = ['Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          "Aug",
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ];

  return abbrevs[d.getMonth()];
}


const today = new Date();

const systemColorInfo = {
  "browser": getBrowserName(),
  "os": getOSName(),
  "theme": "default",
  "year": today.getFullYear(),
  "month": today.getMonth(),
  "monthAbbr": getMonth(today),
  system_colors: {}
}



/*
 * @function headerCell
 *
 * @desc  Creates a TH element with a text content
 */

function headerCell(text) {
    const th   = document.createElement('th');
    th.textContent = text;
    return th;
}

/*
 * @function dataCell
 *
 * @desc  Creates a TD element to use as a description
 */

function dataCell(text, style, abbrev) {
    const td   = document.createElement('td');
    const abbr = document.createElement('abbr');

    if (style) {
      td.className = style;
    }

    if (abbrev) {
      abbr.textContent = text;
      abbr.title = abbrev;
      td.appendChild(abbr);
    }
    else {
      td.textContent = text;
    }
    return td;
}

/*
 * @function colorCell
 *
 * @desc  Creates a TD element to label a system color name
 */

function colorCell(name) {
    const td   = document.createElement('td');
    const code = document.createElement('code');
    code.textContent = name;
    td.appendChild(code);
    return td;
}

/*
 * @function colorImageCell
 *
 * @desc  Creates a TD element to show a color value
 */

function colorImageCell(value) {
    const td = document.createElement('td');
    const div = document.createElement('div');
    div.role = 'img';
    div.classList.add('sample');
    div.style.backgroundColor = value;
    td.appendChild(div);
    const divHex = document.createElement('div');
    divHex.className = 'color';
    td.appendChild(divHex);
    return td;
}

/*
 * @function colorImageCellAccName
 *
 * @desc  Adds a text description of a color to a value cell
 */

function colorImageCellAccName(valueNode, name) {
  const cStyle = window.getComputedStyle(valueNode.firstElementChild);
  const colorHex = rgb2Hex(cStyle.backgroundColor);
  valueNode.lastElementChild.textContent = colorHex;
  valueNode.firstElementChild.ariaLabel = getColorDescription(colorHex, name);
  return colorHex;
}

/*
 * @function updateFirefoxWebsiteContrast
 *
 * @desc  Updates the colors used in Firefox Website Contrast tests
 */

function updateFirefoxWebsiteContrast() {
  const tbodyNode = document.getElementById('firefox-website-contrast');

  firefoxWebsiteContrast.forEach((v) => {

    // Computed System System Color Table
    const tr = document.createElement('tr');
    tr.appendChild(colorCell(v.name));
    const valueNode = colorImageCell(v.color);
    tr.appendChild(valueNode);
    tbodyNode.appendChild(tr);
    // After added to table can get computed color
    const colorHex = colorImageCellAccName(valueNode, v.name);

  });

}

/*
 * @function updateComputedSystemColors
 *
 * @desc  Updates the computed system color table
 */

function updateComputedSystemColors() {
  const tbodyNode = document.getElementById('system-colors');

  systemColorValues.forEach((v) => {

    // Computed System System Color Table
    const tr = document.createElement('tr');
    tr.appendChild(colorCell(v.name));
    const valueNode = colorImageCell(v.value);
    tr.appendChild(valueNode);
    tr.appendChild(dataCell(v.desc, 'desc'));
    tbodyNode.appendChild(tr);
    // After added to table can get computed color
    const colorHex = colorImageCellAccName(valueNode, v.name);

    systemColorInfo.system_colors[v.name] = colorHex;

  });

}

/*
 * @function handleClipboardClick
 *
 * @desc  Copies computed system color information in JSON
 *        format to the clipboard
 */

function handleClipboardClick() {
  const jsonStr = JSON.stringify(systemColorInfo, null, 2);

  async function setClipboard() {
    const type = "text/plain";
    const clipboardItemData = {
      [type]: jsonStr,
    };
    const clipboardItem = new ClipboardItem(clipboardItemData);
    await navigator.clipboard.write([clipboardItem]);
  }

  setClipboard();
}

/*
 * @function updateExportLink
 *
 * @desc  Updates the export link with current information
 */

function updateExportLink() {
  const themeNode = document.getElementById('theme');
  systemColorInfo.theme = themeNode.value;

  const jsonStr = JSON.stringify(systemColorInfo, null, 2);

  const exportDownloadNode = document.getElementById('export-download');
  exportDownloadNode.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
  exportDownloadNode.download = getFileName(systemColorInfo);
}


/*
 * @function updateExportContent
 *
 * @desc  Updates the export data information
 */

function updateExportContent () {
  const userAgentNode = document.getElementById('useragent');
  userAgentNode.textContent = getBrowserName();

  const osNode = document.getElementById('os');
  osNode.textContent = getOSName();

  const themeNode = document.getElementById('theme');
  themeNode.addEventListener('change', () => {
    updateExportLink();
  });

  const exportClipboardNode = document.getElementById('export-clipboard');
  exportClipboardNode.addEventListener('click', handleClipboardClick);

  updateExportLink();
}

const defaultComparisons = [
  {
    id: 'win11-default',
    title: 'Windows 11 Default',
    desc: 'Consistency of default system colors between browsers on Windows 11.',
    colors: [
      windows_microsoft_edge_default,
      windows_google_chrome_default,
      windows_mozilla_firefox_default
    ]
  },
  {
    id: 'macos-default',
    title: 'macOS Default',
    desc: 'Consistency of default system colors between browsers on macOS.',
    colors: [
      macos_apple_safari_default,
      macos_google_chrome_default,
      macos_mozilla_firefox_default
    ]
  },
  {
    id: 'unix-default',
    title: 'Unix Default',
    desc: 'Consistency of default system colors between browsers on Unix/Linux.',
    colors: [
      unix_google_chrome_default,
      unix_mozilla_firefox_default
    ]
  }
];

const firefoxComparisons = [
  {
    id: 'win11-firefox-contrast',
    title: 'Windows 11 Firefox Contrast',
    desc: 'Comparing Windows 11 Firefox default system colors to Website Contrast settings',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_firefox_contrast
    ]
  },
  {
    id: 'macos-firefox-contrast',
    title: 'macOS Firefox Contrast',
    desc: 'Comparing macOS Firefox default system colors to Website Contrast settings',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_firefox_contrast
    ]
  },
  {
    id: 'unix-firefox-contrast',
    title: 'Unix Firefox Contrast',
    desc: 'Comparing Unix/Linux Firefox default system colors to Website Contrast settings',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_firefox_contrast
    ]
  }
];

const win11ThemeComparisons = [
  {
    id: 'win11-night-contrast-theme-edge',
    title: 'Windows 11 Night Contrast Theme Microsoft Edge',
    desc: 'Comparing Windows 11 night contrast theme for Microsoft Edge',
    colors: [
      windows_microsoft_edge_default,
      windows_microsoft_edge_win11_night
    ]
  },
  {
    id: 'win11-night-contrast-theme-chrome',
    title: 'Windows 11 Night Contrast Theme Google Chrome',
    desc: 'Comparing Windows 11 night contrast theme for Google Chrome',
    colors: [
      windows_google_chrome_default,
      windows_google_chrome_win11_night
    ]
  },
  {
    id: 'win11-night-contrast-theme-firefox',
    title: 'Windows 11 Night Contrast Theme Mozilla Firefox',
    desc: 'Comparing Windows 11 night contrast theme for Mozilla Firefox',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_win11_night
    ]
  }
];

const colorComparisons = [
  { id: 'default-comparisons', data: defaultComparisons, prop: 'browser'},
  { id: 'firefox-comparisons', data: firefoxComparisons, prop: 'theme', namedColors : firefoxWebsiteContrast},
  { id: 'win11-theme-comparisons', data: win11ThemeComparisons, prop: 'theme'}
]

function createColorComparisons () {

  colorComparisons.forEach( (cc) => {
    const sectionNode = document.getElementById(cc.id);
    const namedColors = cc.namedColors;

    function getNamedColor(color) {
      for(let i = 0; i < namedColors.length; i += 1) {
        if (namedColors[i].color === color) {
          return namedColors[i].name;
        }
      }
      return 'Computed';
    }

    cc.data.forEach( (d) => {
      const h4 = document.createElement('h4');
      h4.id = d.id;
      h4.textContent = d.title;
      sectionNode.appendChild(h4);

      const p = document.createElement('p');
      p.desc = d.desc;
      p.textContent = d.desc;
      sectionNode.appendChild(p);

      const table = document.createElement('table');
      table.ariaLabelledByElements = [h4];
      table.className = 'table data';
      sectionNode.appendChild(table);

      const thead = document.createElement('thead');
      table.appendChild(thead);

      const tr = document.createElement('tr');
      thead.appendChild(tr);

      tr.appendChild(headerCell('Color'));
      tr.appendChild(headerCell('Differences'));
      d.colors.forEach( (c) => {
        tr.appendChild(headerCell(c[cc.prop]));
      });

      if (namedColors) {
        tr.appendChild(headerCell('Named Color'));
      }

      const tbody = document.createElement('tbody');
      table.appendChild(tbody);

      systemColorValues.forEach( (sc) => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        tr.appendChild(colorCell(sc.name));

        const diffCell = dataCell('-', '', 'none');
        tr.appendChild(diffCell);

        const colors = [];
        let lastColor = '';

        d.colors.forEach( (color) => {
          lastColor = color.system_colors[sc.name];
          colors.push(color.system_colors[sc.name]);
          const cell = colorImageCell(lastColor);
          tr.appendChild(cell);
          colorImageCellAccName(cell, sc.name);
        });

        const uniqueCount = new Set(colors).size;

        if (uniqueCount === d.colors.length) {
          d.colors.length === 2 ?
          diffCell.textContent = 'Yes' :
          diffCell.textContent = 'All';
        }
        else {
          if (uniqueCount > 1) {
            diffCell.textContent = 'Some';
          }
        }

        if (namedColors) {
          const namedColorCell = uniqueCount > 1 ?
                                 dataCell(getNamedColor(lastColor), '') :
                                 dataCell('-', '', 'none');
          tr.appendChild(namedColorCell);
        }


      });
    });
  });
}

window.addEventListener('load', () => {
    updateFirefoxWebsiteContrast();
    updateComputedSystemColors();
    createColorComparisons();
    updateExportContent();
});

