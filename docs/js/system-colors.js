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

const htmlColorValues = [
  {
    name: 'INDIAN RED',
    hex: '#CD5C5C',
  },
  {
    name: 'LIGHT CORAL',
    hex: '#F08080',
  },
  {
    name: 'SALMON',
    hex: '#FA8072',
  },
  {
    name: 'DARK SALMON',
    hex: '#E9967A',
  },
  {
    name: 'LIGHT SALMON',
    hex: '#FFA07A',
  },
  {
    name: 'CRIMSON',
    hex: '#DC143C',
  },
  {
    name: 'RED',
    hex: '#FF0000',
  },
  {
    name: 'DARK RED',
    hex: '#8B0000',
  },
  {
    name: 'PINK',
    hex: '#FFC0CB',
  },
  {
    name: 'LIGHT PINK',
    hex: '#FFB6C1',
  },
  {
    name: 'HOT PINK',
    hex: '#FF69B4',
  },
  {
    name: 'DEEP PINK',
    hex: '#FF1493',
  },
  {
    name: 'MEDIUM VIOLET RED',
    hex: '#C71585',
  },
  {
    name: 'PALE VIOLET RED',
    hex: '#DB7093',
  },
  {
    name: 'CORAL',
    hex: '#FF7F50',
  },
  {
    name: 'TOMATO',
    hex: '#FF6347',
  },
  {
    name: 'ORANGE RED',
    hex: '#FF4500',
  },
  {
    name: 'DARK ORANGE',
    hex: '#FF8C00',
  },
  {
    name: 'ORANGE',
    hex: '#FFA500',
  },
  {
    name: 'GOLD',
    hex: '#FFD700',
  },
  {
    name: 'YELLOW',
    hex: '#FFFF00',
  },
  {
    name: 'LIGHT YELLOW',
    hex: '#FFFFE0',
  },
  {
    name: 'LEMON CHIFFON',
    hex: '#FFFACD',
  },
  {
    name: 'LIGHT GOLDEN ROD YELLOW',
    hex: '#FAFAD2',
  },
  {
    name: 'PAPAYAWHIP',
    hex: '#FFEFD5',
  },
  {
    name: 'MOCCASIN',
    hex: '#FFE4B5',
  },
  {
    name: 'PEACH PUFF',
    hex: '#FFDAB9',
  },
  {
    name: 'PALE GOLDEN ROD',
    hex: '#EEE8AA',
  },
  {
    name: 'KHAKI',
    hex: '#F0E68C',
  },
  {
    name: 'DARK KHAKI',
    hex: '#BDB76B',
  },
  {
    name: 'LAVENDER',
    hex: '#E6E6FA',
  },
  {
    name: 'THISTLE',
    hex: '#D8BFD8',
  },
  {
    name: 'PLUM',
    hex: '#DDA0DD',
  },
  {
    name: 'VIOLET',
    hex: '#EE82EE',
  },
  {
    name: 'ORCHID',
    hex: '#DA70D6',
  },
  {
    name: 'FUCHSIA',
    hex: '#FF00FF',
  },
  {
    name: 'MAGENTA',
    hex: '#FF00FF',
  },
  {
    name: 'MEDIUM ORCHID',
    hex: '#BA55D3',
  },
  {
    name: 'MEDIUM PURPLE',
    hex: '#9370DB',
  },
  {
    name: 'REBECCA PURPLE',
    hex: '#663399',
  },
  {
    name: 'BLUE VIOLET',
    hex: '#8A2BE2',
  },
  {
    name: 'DARK VIOLET',
    hex: '#9400D3',
  },
  {
    name: 'DARK ORCHID',
    hex: '#9932CC',
  },
  {
    name: 'DARK MAGENTA',
    hex: '#8B008B',
  },
  {
    name: 'PURPLE',
    hex: '#800080',
  },
  {
    name: 'INDIGO',
    hex: '#4B0082',
  },
  {
    name: 'SLATE BLUE',
    hex: '#6A5ACD',
  },
  {
    name: 'DARK SLATE BLUE',
    hex: '#483D8B',
  },
  {
    name: 'MEDIUM SLATE BLUE',
    hex: '#7B68EE',
  },
  {
    name: 'GREEN YELLOW',
    hex: '#ADFF2F',
  },
  {
    name: 'CHARTREUSE',
    hex: '#7FFF00',
  },
  {
    name: 'LAWN GREEN',
    hex: '#7CFC00',
  },
  {
    name: 'LIME',
    hex: '#00FF00',
  },
  {
    name: 'LIME GREEN',
    hex: '#32CD32',
  },
  {
    name: 'PALE GREEN',
    hex: '#98FB98',
  },
  {
    name: 'LIGHT GREEN',
    hex: '#90EE90',
  },
  {
    name: 'MEDIUM SPRING GREEN',
    hex: '#00FA9A',
  },
  {
    name: 'SPRING GREEN',
    hex: '#00FF7F',
  },
  {
    name: 'MEDIUM SEA GREEN',
    hex: '#3CB371',
  },
  {
    name: 'SEA GREEN',
    hex: '#2E8B57',
  },
  {
    name: 'FOREST GREEN',
    hex: '#228B22',
  },
  {
    name: 'GREEN',
    hex: '#008000',
  },
  {
    name: 'DARK GREEN',
    hex: '#006400',
  },
  {
    name: 'YELLOW GREEN',
    hex: '#9ACD32',
  },
  {
    name: 'OLIVE DRAB',
    hex: '#6B8E23',
  },
  {
    name: 'OLIVE',
    hex: '#6B8E23',
  },
  {
    name: 'DARK OLIVE GREEN',
    hex: '#556B2F',
  },
  {
    name: 'MEDIUM AQUA MARINE',
    hex: '#66CDAA',
  },
  {
    name: 'DARK SEA GREEN',
    hex: '#8FBC8B',
  },
  {
    name: 'LIGHT SEA GREEN',
    hex: '#20B2AA',
  },
  {
    name: 'DARK CYAN',
    hex: '#008B8B',
  },
  {
    name: 'TEAL',
    hex: '#008080',
  },
  {
    name: 'AQUA',
    hex: '#00FFFF',
  },
  {
    name: 'CYAN',
    hex: '#00FFFF',
  },
  {
    name: 'LIGHT CYAN',
    hex: '#E0FFFF',
  },
  {
    name: 'PALE TURQUOISE',
    hex: '#AFEEEE',
  },
  {
    name: 'AQUAMARINE',
    hex: '#7FFFD4',
  },
  {
    name: 'TURQUOISE',
    hex: '#40E0D0',
  },
  {
    name: 'MEDIUM TURQUOISE',
    hex: '#48D1CC',
  },
  {
    name: 'DARK TURQUOISE',
    hex: '#00CED1',
  },
  {
    name: 'CADET BLUE',
    hex: '#5F9EA0',
  },
  {
    name: 'STEEL BLUE',
    hex: '#4682B4',
  },
  {
    name: 'LIGHT STEEL BLUE',
    hex: '#B0C4DE',
  },
  {
    name: 'POWDER BLUE',
    hex: '#B0E0E6',
  },
  {
    name: 'LIGHT BLUE',
    hex: '#ADD8E6',
  },
  {
    name: 'SKY BLUE',
    hex: '#87CEEB',
  },
  {
    name: 'LIGHT SKY BLUE',
    hex: '#87CEFA',
  },
  {
    name: 'DEEP SKY BLUE',
    hex: '#00BFFF',
  },
  {
    name: 'DODGER BLUE',
    hex: '#1E90FF',
  },
  {
    name: 'CORN FLOWER BLUE',
    hex: '#6495ED',
  },
  {
    name: 'ROYAL BLUE',
    hex: '#4169E1',
  },
  {
    name: 'BLUE',
    hex: '#0000FF',
  },
  {
    name: 'MEDIUM BLUE',
    hex: '#0000CD',
  },
  {
    name: 'DARK BLUE',
    hex: '#00008B',
  },
  {
    name: 'NAVY',
    hex: '#00008B',
  },
  {
    name: 'MIDNIGHT BLUE',
    hex: '#191970',
  },
  {
    name: 'CORN SILK',
    hex: '#FFF8DC',
  },
  {
    name: 'BLANCHED ALMOND',
    hex: '#FFEBCD',
  },
  {
    name: 'BISQUE',
    hex: '#FFE4C4',
  },
  {
    name: 'NAVAJO WHITE',
    hex: '#FFDEAD',
  },
  {
    name: 'WHEAT',
    hex: '#F5DEB3',
  },
  {
    name: 'BURLY WOOD',
    hex: '#DEB887',
  },
  {
    name: 'TAN',
    hex: '#D2B48C',
  },
  {
    name: 'ROSY BROWN',
    hex: '#BC8F8F',
  },
  {
    name: 'SANDY BROWN',
    hex: '#F4A460',
  },
  {
    name: 'GOLDENROD',
    hex: '#DAA520',
  },
  {
    name: 'DARK GOLDEN ROD',
    hex: '#B8860B',
  },
  {
    name: 'PERU',
    hex: '#CD853F',
  },
  {
    name: 'CHOCOLATE',
    hex: '#D2691E',
  },
  {
    name: 'SADDLE BROWN',
    hex: '#8B4513',
  },
  {
    name: 'SIENNA',
    hex: '#A0522D',
  },
  {
    name: 'BROWN',
    hex: '#A52A2A',
  },
  {
    name: 'MAROON',
    hex: '#800000',
  },
  {
    name: 'WHITE',
    hex: '#FFFFFF',
  },
  {
    name: 'SNOW',
    hex: '#FFFAFA',
  },
  {
    name: 'HONEY DEW',
    hex: '#F0FFF0',
  },
  {
    name: 'MINT CREAM',
    hex: '#F5FFFA',
  },
  {
    name: 'AZURE',
    hex: '#F0FFFF',
  },
  {
    name: 'ALICE BLUE',
    hex: '#F0F8FF',
  },
  {
    name: 'GHOST WHITE',
    hex: '#F8F8FF',
  },
  {
    name: 'WHITE SMOKE',
    hex: '#F5F5F5',
  },
  {
    name: 'SEA SHELL',
    hex: '#FFF5EE',
  },
  {
    name: 'BEIGE',
    hex: '#F5F5DC',
  },
  {
    name: 'OLD LACE',
    hex: '#FDF5E6',
  },
  {
    name: 'FLORAL WHITE',
    hex: '#FDF5E6',
  },
  {
    name: 'IVORY',
    hex: '#FFFFF0',
  },
  {
    name: 'ANTIQUE WHITE',
    hex: '#FAEBD7',
  },
  {
    name: 'LINEN',
    hex: '#FAF0E6',
  },
  {
    name: 'LAVENDER BLUSH',
    hex: '#FFF0F5',
  },
  {
    name: 'MISTY ROSE',
    hex: '#FFE4E1',
  },
  {
    name: 'GAINSBORO',
    hex: '#DCDCDC',
  },
  {
    name: 'LIGHT GRAY',
    hex: '#D3D3D3',
  },
  {
    name: 'SILVER',
    hex: '#C0C0C0',
  },
  {
    name: 'DARK GRAY',
    hex: '#A9A9A9',
  },
  {
    name: 'GRAY',
    hex: '#808080',
  },
  {
    name: 'DIMGRAY',
    hex: '#696969',
  },
  {
    name: 'LIGHT SLATE GRAY',
    hex: '#778899',
  },
  {
    name: 'SLATE GRAY',
    hex: '#708090',
  },
  {
    name: 'DARK SLATE GRAY',
    hex: '#2F4F4F',
  },
  {
    name: 'BLACK',
    hex: '#000000',
  },
];

/*
 * @function computeDistance
 *
 * @desc  Computes a numerical value of how difference between two hex color values
 *        for comparison in finding the closest HTML color value
 *
 * @param {String}    hex1: A hexadecimal number representing a color
 * @param {String}    hex2: A hexadecimal number representing a color
 *
 * @return {Number} A number representing the difference between two colors
 */

function computeDistance(hex1, hex2) {
  const rgb1 = {
    r: parseInt(hex1.substring(1, 2), 16),
    b: parseInt(hex1.substring(3, 4), 16),
    g: parseInt(hex1.substring(5, 6), 16),
  };

  const rgb2 = {
    r: parseInt(hex2.substring(1, 2), 16),
    b: parseInt(hex2.substring(3, 4), 16),
    g: parseInt(hex2.substring(5, 6), 16),
  };

  return (
    Math.pow(rgb1.r - rgb2.r, 2) +
    Math.pow(rgb1.g - rgb2.g, 2) +
    Math.pow(rgb1.b - rgb2.b, 2)
  );
}

/*
 * @function getHTMLColorName
 *
 * @desc  Returns a text description of a System Color based on HTML Color values
 *
 * @param {String}   systemColorName: Name of a system color
 * @param {String}          colorHex: A hexadecimal number representing a color
 *
 * @return {String) see @desc
 */

function getHTMLColorName(systemColorName, colorHex) {
  // Check for transparent

  if (colorHex[0] !== '#') {
    return `${systemColorName} is ${colorHex}`;
  }

  for (let i = 0; i < htmlColorValues.length; i += 1) {
    const v = htmlColorValues[i];
    if (v.hex.toLowerCase() === colorHex) {
      return `${systemColorName} is ${v.name.toLowerCase()}`;
    }
  }

  // See if shade of gray
  if (
    colorHex.substring(1, 2) === colorHex.substring(3, 4) &&
    colorHex.substring(1, 2) === colorHex.substring(5, 6)
  ) {
    switch (colorHex[1]) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
        return `${systemColorName} is a dark shade of gray`;

      case 'b':
      case 'c':
      case 'd':
      case 'e':
      case 'f':
        return `${systemColorName} is a light shade of gray`;

      default:
        return `${systemColorName} is shade of gray`;
    }
  }

  // Look for closest color

  let closestValue = htmlColorValues[0];
  let closestComputedDistance = computeDistance(closestValue.hex, colorHex);

  htmlColorValues.forEach((v) => {
    const cd = computeDistance(v.hex, colorHex);
    if (cd < closestComputedDistance) {
      closestValue = v;
      closestComputedDistance = cd;
    }
  });

  return `${systemColorName} is similar to ${closestValue.name.toLowerCase()}`;
}

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

    if (abbr) {
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
  valueNode.firstElementChild.ariaLabel = getHTMLColorName(name, colorHex);
  return colorHex;
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
    desc: 'Comparing Windows 11 firefox default system colors to firefox contrast theme color settings',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_firefox_contrast
    ]
  },
  {
    id: 'macos-firefox-contrast',
    title: 'macOS Firefox Contrast',
    desc: 'Comparing macOS firefox default system colors to firefox contrast theme color settings',
    colors: [
      windows_mozilla_firefox_default,
      windows_mozilla_firefox_firefox_contrast
    ]
  },
  {
    id: 'unix-firefox-contrast',
    title: 'Unix Firefox Contrast',
    desc: 'Comparing Unix/Linux firefox default system colors to firefox contrast theme color settings',
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
  { id: 'firefox-comparisons', data: firefoxComparisons, prop: 'theme' },
  { id: 'win11-theme-comparisons', data: win11ThemeComparisons, prop: 'theme'}
]

function createColorComparisons () {

  colorComparisons.forEach( (cc) => {
    const sectionNode = document.getElementById(cc.id);
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

      const tbody = document.createElement('tbody');
      table.appendChild(tbody);

      systemColorValues.forEach( (sc) => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        tr.appendChild(colorCell(sc.name));

        const diffCell = dataCell('-', '', 'none');
        tr.appendChild(diffCell);

        const colors = [];

        d.colors.forEach( (color) => {
          colors.push(color.system_colors[sc.name]);
          const cell = colorImageCell(color.system_colors[sc.name]);
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
      });
    });
  });
}

window.addEventListener('load', () => {
    updateComputedSystemColors();
    updateExportContent();
    createColorComparisons();
});

