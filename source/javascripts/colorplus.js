;(function () {


var c = {},
    s = {},
    namedColors = { black: "#000000", silver: "#c0c0c0", gray: "#808080", white: "#ffffff", maroon: "#800000",
        red: "#ff0000", purple: "#800080", fuchsia: "#ff00ff", green: "#008000", grey: "#808080",
        lime: "#00ff00", olive: "#808000", yellow: "#ffff00", navy: "#000080", blue: "#0000ff",
        burlywood: "#deb887", teal: "#008080", aqua: "#00ffff", orange: "#ffa500", azure: "#f0ffff",
        beige: "#f5f5dc", bisque: "#ffe4c4", brown: "#a52a2a", chartreuse: "#7fff00", chocolate: "#d2691e",
        coral: "#ff7f50", crimson: "#dc143c", gainsboro: "#dcdcdc", gold: "#ffd700", indigo: "#4b0082",
        ivory: "#fffff0", khaki: "#f0e68c", lavender: "#e6e6fa", linen: "#faf0e6", moccasin: "#ffe4b5",
        orchid: "#da70d6", peru: "#cd853f", pink: "#ffc0cb", plum: "#dda0dd", salmon: "#fa8072",
        sienna: "#a0522d", snow: "#fffafa", tan: "#d2b48c", thistle: "#d8bfd8", tomato: "#ff6347",
        turquoise: "#40e0d0", violet: "#ee82ee", wheat: "#f5deb3",

        aliceblue: "#f0f8ff", antiquewhite: "#faebd7", aquamarine: "#7fffd4", blanchedalmond: "#ffebcd",
        blueviolet: "#8a2be2", cadetblue: "#5f9ea0", dodgerblue: "#1e90ff", firebrick: "#b22222",
        floralwhite: "#fffaf0", forestgreen: "#228b22", ghostwhite: "#f8f8ff", goldenrod: "#daa520",
        greenyellow: "#adff2f", honeydew: "#f0fff0", hotpink: "#ff69b4", indianred: "#cd5c5c",
        lavenderblush: "#fff0f5", lawngreen: "#7cfc00", lemonchiffon: "#fffacd", limegreen: "#32cd32",
        midnightblue: "#191970", mintcream: "#f5fffa", mistyrose: "#ffe4e1", navajowhite: "#ffdead",
        oldlace: "#fdf5e6", olivedrab: "#6b8e23", orangered: "#ff4500", papayawhip: "#ffefd5",
        peachpuff: "#ffdab9", powderblue: "#b0e0e6", rosybrown: "#bc8f8f", royalblue: "#4169e1",
        saddlebrown: "#8b4513", sandybrown: "#f4a460", seagreen: "#2e8b57", seashell: "#fff5ee",
        skyblue: "#87ceeb", springgreen: "#00ff7f", steelblue: "#4682b4", whitesmoke: "#f5f5f5",
        yellowgreen: "#9ACD32", rebeccapurple: "#663399",

        dimgray: "#696969", dimgrey: "#696969", slateblue: "#6a5acd", slategray: "#708090",
        slategrey: "#708090", deeppink: "#ff1493", deepskyblue: "#00bfff", cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc", palegoldenrod: "#eee8aa", palegreen: "#98fb98", paleturquoise: "#afeeee",
        palevioletred: "#db7093",

        lightblue: "#add8e6", lightcoral: "#f08080", lightcyan: "#e0ffff", lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3", lightgreen: "#90ee90", lightgrey: "#d3d3d3", lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", lightskyblue: "#87cefa", lightslategray: "#778899",
        lightslategrey: "#778899", lightsteelblue: "#b0c4de", lightyellow: "#ffffe0",

        mediumaquamarine: "#66cdaa", mediumblue: "#0000cd", mediumorchid: "#ba55d3", mediumpurple: "#9370db",
        mediumseagreen: "#3cb371", mediumslateblue: "#7b68ee", mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc", madiumvioletred: "#c71585",

        darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkgray: "#a9a9a9",
        darkgreen: "#006400", darkgrey: "#a9a9a9", darkkhaki: "#bdb76b", darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f", darkorange: "#ff8c00", darkorchid: "#9932cc", darkred: "#8b0000",
        darksalmon: "#e9967a", darkseagreen: "#8fbc8f", darkslateblue: "#483d8b", darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f", darkturquoise: "#00ced1", darkviolet: "#9400d3" };


Object.prototype.toRgb = function (opacity) {
  var color = purify(this),
      opacityIsExists = false,
      A;

  if (opacity !== undefined) {
    opacityIsExists = true;
    A = parseAlpha(opacity);
  }

  switch (getColorType(this)) {
    case "hex":
      defineSpectrums(color, "hex");
      if (!valid(s.red, s.green, s.blue, "hex")) {
        return;
      }
      s.red = parseInt(s.red, 16);
      s.green = parseInt(s.green, 16);
      s.blue = parseInt(s.blue, 16);
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (/[^0-9a-f]/gi.test(s.alpha)) {
          s.alpha = 1;
        } else {
          s.alpha = parseInt(s.alpha, 16);
          s.alpha = s.alpha / 255 * 100;
          s.alpha = Math.round(s.alpha) / 100;
        }
        A = s.alpha;
      }
      if (A == 1) {
        return "rgb(" + s.red + "," + s.green + "," + s.blue + ")";
      }
      return "rgba(" + s.red + "," + s.green + "," + s.blue + "," + A + ")";

    case "rgb":
      defineSpectrums(color, "rgb");
      if (!valid(s.red, s.green, s.blue, "rgb")) {
        return;
      }
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (!parseAlpha(s.alpha)) {
          s.alpha = 1;
        }
        A = s.alpha;
      }
      if (A == 1) {
        return "rgb(" + s.red + "," + s.green + "," + s.blue + ")";
      }
      return "rgba(" + s.red + "," + s.green + "," + s.blue + "," + A + ")";

    case "hsl":
      defineSpectrums(color, "hsl");
      if (!valid(s.hue, s.saturation, s.lightness, "hsl")) {
        return;
      }
      if (s.hue == 0 && s.saturation == 0) {
        s.lightness = Math.round(s.lightness / 100 * 255);
        s.hue = s.saturation = s.lightness;
        if (!opacityIsExists || !parseAlpha(opacity)) {
          if (!parseAlpha(s.alpha)) {
            s.alpha = 1;
          }
          A = s.alpha;
        }
        if (A == 1) {
          return "rgb(" + s.hue + "," + s.saturation + "," + s.lightness + ")";
        }
        return "rgba(" + s.hue + "," + s.saturation + "," + s.lightness + "," + A + ")";
      }
      s.hue /= 60;
      s.saturation /= 100;
      s.lightness /= 100;
      if (s.lightness < 0.5) {
        var temp1 = s.lightness * (1 + s.saturation);
      } else {
        var temp1 = s.lightness + s.saturation - s.lightness * s.saturation;
      }
      var temp2 = s.lightness * 2 - temp1,
          R = s.hue + 2,
          G = s.hue,
          B = s.hue - 2;
      function calcSpectrum(spectrum) {
        if (spectrum < 0) {
          spectrum += 6;
        }
        if (spectrum > 6) {
          spectrum -= 6;
        }
        if (spectrum < 1) {
          return Math.round(((temp1 - temp2) * spectrum + temp2) * 255);
        } else if (spectrum < 3) {
          return Math.round(temp1 * 255);
        } else if (spectrum < 4) {
          return Math.round(((temp1 - temp2) * (4 - spectrum) + temp2) * 255);
        } else {
          return Math.round(temp2 * 255);
        }
        return Math.round(spectrum * 255);
      };
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (!parseAlpha(s.alpha)) {
          s.alpha = 1;
        }
        A = s.alpha;
      }
      if (A == 1) {
        return "rgb(" + calcSpectrum(R) + "," + calcSpectrum(G) + "," + calcSpectrum(B) + ")";
      }
      return "rgba(" + calcSpectrum(R) + "," + calcSpectrum(G) + "," + calcSpectrum(B) + "," + A + ")";

    case "named":
      var colorName = color.toLowerCase();
      if (colorName in namedColors) {
        return namedColors[colorName].toRgb(opacity);
      }
      return;

    default:
      return;
  }
};


Object.prototype.toHex = function (opacity) {
  var color = purify(this),
      opacityIsExists = false,
      A;

  if (opacity !== undefined) {
    opacityIsExists = true;
    A = parseAlpha(opacity);
    A *= 255;
    A = Math.round(A.toFixed(4));
    A = A.toString(16).toUpperCase();
    if (A.length == 1) {
      A = A.repeat(2);
    }
  }

  switch (getColorType(this)) {
    case "hex":
      defineSpectrums(color, "hex");
      if (!valid(s.red, s.green, s.blue, "hex")) {
        return;
      }
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (/[^0-9a-f]/i.test(s.alpha)) {
          s.alpha = "FF";
        }
        A = s.alpha;
      }
      if (A == "FF") {
        return "#" + s.red + s.green + s.blue;
      }
      return "#" + s.red + s.green + s.blue + A;

    case "rgb":
      defineSpectrums(color, "rgb");
      if (!valid(s.red, s.green, s.blue, "rgb")) {
        return;
      }
      s.red = +s.red;
      s.red = s.red.toString(16).toUpperCase();
      if (s.red.length == 1) {
        s.red = s.red.repeat(2);
      }
      s.green = +s.green;
      s.green = s.green.toString(16).toUpperCase();
      if (s.green.length == 1) {
        s.green = s.green.repeat(2);
      }
      s.blue = +s.blue;
      s.blue = s.blue.toString(16).toUpperCase();
      if (s.blue.length == 1) {
        s.blue = s.blue.repeat(2);
      }
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (!parseAlpha(s.alpha)) {
          s.alpha = "FF";
        } else {
          s.alpha = Math.round(s.alpha * 255);
          s.alpha = s.alpha.toString(16).toUpperCase();
          if (s.alpha.length == 1) {
            s.alpha = s.alpha.repeat(2);
          }
        }
        A = s.alpha;
      }
      if (A == "FF") {
        return "#" + s.red + s.green + s.blue;
      }
      return "#" + s.red + s.green + s.blue + A;

    case "hsl":
      return this.toRgb(opacity).toHex();

    case "named":
      var colorName = color.toLowerCase();
      if (colorName in namedColors) {
        if (A == "FF" || !opacityIsExists || !parseAlpha(opacity)) {
          return namedColors[colorName].toUpperCase();
        }
        return namedColors[colorName].toUpperCase() + A;
      }
      return;

    default:
      return;
  }
};


Object.prototype.toHsl = function (opacity) {
  var color = purify(this),
      opacityIsExists = false,
      A;

  if (opacity !== undefined) {
    opacityIsExists = true;
    A = parseAlpha(opacity);
  }

  switch (getColorType(this)) {
    case "hex":
      return this.toRgb(opacity).toHsl();

    case "rgb":
      defineSpectrums(color, "rgb");
      if (!valid(s.red, s.green, s.blue, "rgb")) {
        return;
      }
      s.red /= 255;
      s.green /= 255;
      s.blue /= 255;
      var min = Math.min(s.red, s.green, s.blue);
      var max = Math.max(s.red, s.green, s.blue);
      var L = (min + max) / 2 * 100;
      if (L < 50) {
        var S = (max - min) / (max + min) * 100;
      } else {
        var S = (max - min) / (2 - max - min) * 100;
      }
      if (max == s.red) {
        var H = (s.green - s.blue) / (max - min);
      }
      if (max == s.green) {
        var H = 2 + (s.blue - s.red) / (max - min);
      }
      if (max == s.blue) {
        var H = 4 + (s.red - s.green) / (max - min);
      }
      H = Math.round(H * 60);
      S = Math.round(S);
      L = Math.round(L);
      if (H < 0) {
        H += 360;
      }
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (!parseAlpha(s.alpha)) {
          s.alpha = 1;
        }
        A = s.alpha;
      }
      if (A == 1) {
        return "hsl(" + H + "," + S + "%," + L + "%)";
      }
      return "hsl(" + H + "," + S + "%," + L + "%," + A + ")";

    case "hsl":
      defineSpectrums(color, "hsl");
      if (!valid(s.hue, s.saturation, s.lightness, "hsl")) {
        return;
      }
      if (!opacityIsExists || !parseAlpha(opacity)) {
        if (!parseAlpha(s.alpha)) {
          s.alpha = 1;
        }
        A = s.alpha;
      }
      if (A == 1) {
        return "hsl(" + s.hue + "," + s.saturation + "%," + s.lightness + "%)";
      }
      return "hsla(" + s.hue + "," + s.saturation + "%," + s.lightness + "%," + A + ")";

    case "named":
      var colorName = color.toLowerCase();
      if (colorName in namedColors) {
        return namedColors[colorName].toRgb(opacity).toHsl();
      }
      return;

    default:
      return;
  }
};


Object.prototype.mixWith = function (miscibleColor) {
  if (miscibleColor === undefined) {
    return this;
  }

  var mainColor = this.toRgb();
  mainColor = purify(mainColor);
  defineCommas(mainColor);
  defineSpectrums(mainColor, "rgb");
  var R1 = s.red,
      G1 = s.green,
      B1 = s.blue,
      A1 = s.alpha;

  var miscColor = miscibleColor.toRgb();
  miscColor = purify(miscColor);
  defineCommas(miscColor);
  defineSpectrums(miscColor, "rgb");
  var R2 = s.red,
      G2 = s.green,
      B2 = s.blue,
      A2 = s.alpha;

  var R = Math.round((+R1 + +R2) / 2),
      G = Math.round((+G1 + +G2) / 2),
      B = Math.round((+B1 + +B2) / 2),
      A = (+A1 + +A2) / 2;

  if (A == 1) {
    var mixedColor = "rgb(" + R + "," + G + "," + B + ")";
  } else {
    var mixedColor = "rgba(" + R + "," + G + "," + B + "," + A + ")";
  }

  switch (getColorType(this)) {
    case "hex":
      return mixedColor.toHex();

    case "rgb":
      return mixedColor;

    case "hsl":
      return mixedColor.toHsl();

    case "named":
      mixedColor = mixedColor.toHex();
      var colorName = getColorName(mixedColor.toLowerCase());
      if (colorName === undefined) {
        return mixedColor;
      }
      return colorName;

    default:
      return;
  }
};


Object.prototype.invert = function () {
  var color = this.toRgb();
  color = purify(color);
  defineCommas(color);
  defineSpectrums(color, "rgb");

  s.red = 255 - s.red;
  s.green = 255 - s.green;
  s.blue = 255 - s.blue;

  if (s.alpha == 1) {
    var invertedColor = "rgb(" + s.red + "," + s.green + "," + s.blue + ")";
  } else {
    var invertedColor = "rgba(" + s.red + "," + s.green + "," + s.blue + "," + s.alpha + ")";
  }

  switch (getColorType(this)) {
    case "hex":
      return invertedColor.toHex();

    case "rgb":
      return invertedColor;

    case "hsl":
      return invertedColor.toHsl();

    case "named":
      invertedColor = invertedColor.toHex();
      var colorName = getColorName(invertedColor.toLowerCase());
      if (colorName === undefined) {
        return invertedColor;
      }
      return colorName;

    default:
      return;
  }
};


Object.prototype.grayscale = function (level) {
  var nativeGray,
      manualGray = false,
      gray;

  if (level !== undefined) {
    manualGray = level.toString().replace("%", "");
    if (/[0-9]/g.test(manualGray) && manualGray >= 0 && manualGray <= 100) {
      manualGray = Math.round(manualGray / 100 * 255);
    } else {
      manualGray = false;
    }
  }

  var color = this.toRgb();
  color = purify(color);
  defineCommas(color);
  defineSpectrums(color, "rgb");

  if (s.red == s.green && s.green == s.blue) {
    nativeGray = (+s.red + +s.green + +s.blue) / 3;
  } else {
    // https://msdn.microsoft.com/en-us/library/bb332387.aspx#tbconimagecolorizer_grayscaleconversion
    s.red = Math.round(0.299 * s.red);
    s.green = Math.round(0.587 * s.green);
    s.blue = Math.round(0.114 * s.blue);
    nativeGray = s.red + s.green + s.blue;
  }

  if (!manualGray) {
    if (s.alpha == 1) {
      gray = "rgb(" + nativeGray + "," + nativeGray + "," + nativeGray + ")";
    } else {
      gray = "rgba(" + nativeGray + "," + nativeGray + "," + nativeGray + "," + s.alpha + ")";
    }
  } else {
    if (s.alpha == 1) {
      gray = "rgb(" + manualGray + "," + manualGray + "," + manualGray + ")";
    } else {
      gray = "rgba(" + manualGray + "," + manualGray + "," + manualGray + "," + s.alpha + ")";
    }
  }

  switch (getColorType(this)) {
    case "hex":
      return gray.toHex();

    case "rgb":
      return gray;

    case "hsl":
      return gray.toHsl();

    case "named":
      gray = gray.toHex();
      var colorName = getColorName(gray.toLowerCase());
      if (colorName === undefined) {
        return gray;
      }
      return colorName;

    default:
      return;
  }
};


function parseAlpha(opacity) {
  var protoAlpha = opacity.toString().trim();
  var alpha = protoAlpha.replace("%", "");
  if (protoAlpha.includes("%")) {
    if (alpha < 0 || alpha > 100) {
      return false;
    }
    return alpha / 100;
  }
  if (!protoAlpha.includes("%")) {
    if (alpha < 0 || alpha > 1) {
      return false;
    }
    return alpha;
  }
};


function purify(object) {
  object = object.replace(/[^0-9a-z%,.]/gi, "").replace(/rgba|rgb|hsla|hsl/gi, "");
  return object;
};


function getColorType(object) {
  var color = purify(object);
  defineCommas(object);
  if ((color.length == 6 || color.length == 3 || color.length == 8 || color.length == 4) &&
       !color.includes(",") && object.includes("#")) {
    return "hex";
  }
  if (c.first > 0 && c.second > c.first && c.fourth == -1 &&
     (object.includes("rgb(") || object.includes("rgba("))) {
    return "rgb";
  }
  if (c.first > 0 && c.second > c.first && c.fourth == -1 &&
     (object.includes("hsl(") || object.includes("hsla("))) {
    return "hsl";
  }
  return "named";
};


function getColorName(color) {
  for (var prop in namedColors) {
    if (namedColors.hasOwnProperty(prop) && namedColors[prop] === color) {
      return prop;
    }
  }
};


function valid(r, g, b, colorType) {
  switch (colorType) {
    case "hex":
      if (/[^0-9a-f]/i.test(r) || /[^0-9a-f]/i.test(g) || /[^0-9a-f]/i.test(b)) {
        return false;
      }
      return true;
    case "rgb":
      if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
        return false;
      }
      return true;
    case "hsl":
      if (r > 360 || r < 0 || g > 100 || g < 0 || b > 100 || b < 0) {
        return false;
      }
      return true;
  }
};


function defineCommas(object) {
  var color = purify(object);
  c.first = color.indexOf(",");
  c.second = color.indexOf(",", c.first+1);
  c.third = color.indexOf(",", c.second+1);
  if (c.third == -1) {
    c.fourth = -1;
  } else {
    c.fourth = color.indexOf(",", c.third+1);
  }
};


function defineSpectrums(color, colorType) {
  switch (colorType) {
    case "hex":
      if (color.length == 6 || color.length == 8) {
        s.red = color.substr(0, 2);
        s.green = color.substr(2, 2);
        s.blue = color.substr(4, 2);
      } else {
        s.red = color.substr(0, 1);
        s.red = s.red.repeat(2);
        s.green = color.substr(1, 1);
        s.green = s.green.repeat(2);
        s.blue = color.substr(2, 1);
        s.blue = s.blue.repeat(2);
      }
      if (color.length == 8) {
        s.alpha = color.substr(6, 2);
      } else if (color.length == 4) {
        s.alpha = color.substr(3, 1);
        s.alpha = s.alpha.repeat(2);
      } else {
        s.alpha = "FF";
      }
      break;

    case "rgb":
      s.red = color.substring(0, c.first);
      if (s.red.includes("%")) {
        s.red = s.red.replace("%", "");
        s.red = Math.round(s.red / 100 * 255);
      }
      s.green = color.substring(c.first+1, c.second);
      if (s.green.includes("%")) {
        s.green = s.green.replace("%", "");
        s.green = Math.round(s.green / 100 * 255);
      }
      if (c.third > c.second) {
        s.blue = color.substring(c.second+1, c.third);
        if (s.blue.includes("%")) {
          s.blue = s.blue.replace("%", "");
          s.blue = Math.round(s.blue / 100 * 255);
        }
        s.alpha = color.substring(c.third+1);
      } else {
        s.blue = color.substring(c.second+1);
        if (s.blue.includes("%")) {
          s.blue = s.blue.replace("%", "");
          s.blue = Math.round(s.blue / 100 * 255);
        }
        s.alpha = 1;
      }
      break;

    case "hsl":
      s.hue = color.substring(0, c.first);
      s.saturation = color.substring(c.first+1, c.second);
      if (c.third > c.second) {
        s.lightness = color.substring(c.second+1, c.third);
        s.alpha = color.substring(c.third+1);
      } else {
        s.lightness = color.substring(c.second+1);
        s.alpha = 1;
      }
      s.saturation = s.saturation.replace("%", "");
      s.lightness = s.lightness.replace("%", "");
      break;
  }
};



})();
