function hexToRgb(color) {
  var error = "hexToRgb: Invalid argument.";
  color = color.trim();
  if (color.startsWith("#")) {
    color = color.slice(1);
  }
  if (color.length != 3 && color.length != 6) {
    return error;
  } else {
    var R, G, B, result;
    if (color.length == 6) {
      R = parseInt(color.substr(0, 2), 16);
      G = parseInt(color.substr(2, 2), 16);
      B = parseInt(color.substr(4, 2), 16);
    } else {
      R = color.substr(0, 1);
      R = parseInt(R.repeat(2), 16);
      G = color.substr(1, 1);
      G = parseInt(G.repeat(2), 16);
      B = color.substr(2, 1);
      B = parseInt(B.repeat(2), 16);
    }
    return result = "rgb(" + R + "," + G + "," + B + ")";
  }
};

function hexToRgba(color,opacity) {
  var error = "hexToRgba: Invalid argument.";
  var opacityStr = opacity.toString().trim();
  var opacityInt = +opacityStr.replace("%", "");
  if (opacityStr.includes("%")) {
    if (opacityInt < 0 || opacityInt > 100) {
      return error;
    }
    var A = opacityInt / 100;
  }
  if (!opacityStr.includes("%")) {
    if (opacityInt < 0 || opacityInt > 1) {
      return error;
    }
    var A = opacityInt;
  }
  color = color.trim();
  if (color.startsWith("#")) {
    color = color.slice(1);
  }
  if (color.length != 3 && color.length != 6) {
    return error;
  } else {
    var R, G, B, result;
    if (color.length == 6) {
      R = parseInt(color.substr(0, 2), 16);
      G = parseInt(color.substr(2, 2), 16);
      B = parseInt(color.substr(4, 2), 16);
    } else {
      R = color.substr(0, 1);
      R = parseInt(R.repeat(2), 16);
      G = color.substr(1, 1);
      G = parseInt(G.repeat(2), 16);
      B = color.substr(2, 1);
      B = parseInt(B.repeat(2), 16);
    }
    if (A == 1) {
      return result = "rgb(" + R + "," + G + "," + B + ")";
    }
    return result = "rgba(" + R + "," + G + "," + B + "," + A + ")";
  }
};

function rgbToHex(color) {
  var error = "rgbToHex: Invalid argument.";
  color = color.toLowerCase();
  while (color.includes(" ") || color.includes("rgb") || color.includes("(") || color.includes(")")) {
    color = color.replace(" ", "").replace("rgb", "").replace("(", "").replace(")", "");
  }
  var firstC = color.indexOf(",");
  var secndC = color.indexOf(",", firstC+1);
  var thirdC = color.indexOf(",", secndC+1);
  if (thirdC > secndC) {
    return error;
  }
  if (firstC && secndC && thirdC < 0) {
    var R, G, B, result;
    R = color.substring(0, firstC); R = +R;
    G = color.substring(firstC+1, secndC); G = +G;
    B = color.substring(secndC+1); B = +B;
    if (R > 255 || R < 0 || G > 255 || G < 0 || B > 255 || B < 0) {
      return error;
    }
    R = R.toString(16).toUpperCase();
    if (R.length == 1) { R = R.repeat(2); }
    G = G.toString(16).toUpperCase();
    if (G.length == 1) { G = G.repeat(2); }
    B = B.toString(16).toUpperCase();
    if (B.length == 1) { B = B.repeat(2); }
    return result = "#" + R + G + B;
  } else {
    return error;
  }
};

function rgbaToHex(color) {
  var error = "rgbaToHex: Invalid argument.";
  color = color.toLowerCase();
  while (color.includes(" ") || color.includes("rgba") || color.includes("(") || color.includes(")")) {
    color = color.replace(" ", "").replace("rgba", "").replace("(", "").replace(")", "");
  }
  var firstC = color.indexOf(",");
  var secndC = color.indexOf(",", firstC+1);
  var thirdC = color.indexOf(",", secndC+1);
  var fourthC = color.indexOf(",", thirdC+1);
  if (fourthC > thirdC) {
    return error;
  }
  if (firstC && secndC && thirdC && fourthC < 0) {
    var R, G, B, A, result;
    R = color.substring(0, firstC); R = +R;
    G = color.substring(firstC+1, secndC); G = +G;
    B = color.substring(secndC+1, thirdC); B = +B;
    A = color.substring(thirdC+1); A = +A;
    if (R > 255 || R < 0 || G > 255 || G < 0 || B > 255 || B < 0 || A > 1 || A < 0) {
      return error;
    }
    R = R.toString(16).toUpperCase();
    if (R.length == 1) { R = R.repeat(2); }
    G = G.toString(16).toUpperCase();
    if (G.length == 1) { G = G.repeat(2); }
    B = B.toString(16).toUpperCase();
    if (B.length == 1) { B = B.repeat(2); }
    if (A == 1) {
      return result = "#" + R + G + B;
    }
    return result = "rgba(#" + R + G + B + "," + A + ")";
  } else {
    return error;
  }
};

function rgbToHsl(color) {
  var error = "rgbToHsl: Invalid argument.";
  color = color.toLowerCase();
  while (color.includes(" ") || color.includes("rgb") || color.includes("(") || color.includes(")")) {
    color = color.replace(" ", "").replace("rgb", "").replace("(", "").replace(")", "");
  }
  var firstC = color.indexOf(",");
  var secndC = color.indexOf(",", firstC+1);
  var thirdC = color.indexOf(",", secndC+1);
  if (thirdC > secndC) {
    return error;
  }
  if (firstC > 0 && secndC > firstC && thirdC < 0) {
    var R, G, B, H, S, L, result;
    R = color.substring(0, firstC) / 255;
    R = R.toFixed(2); R = +R;
    G = color.substring(firstC+1, secndC) / 255;
    G = G.toFixed(2); G = +G;
    B = color.substring(secndC+1) / 255;
    B = B.toFixed(2); B = +B;
    if (R > 1 || R < 0 || G > 1 || G < 0 || B > 1 || B < 0) {
      return error;
    }
    var minSp = Math.min(R, G, B);
    var maxSp = Math.max(R, G, B);
    //if minSp == maxSp, then it means that is no Saturation (S). So Hue (H) == 0%
    L = (minSp + maxSp) / 2;
    L = L.toString();
    if (L.startsWith("0.") || L.length == 5) {
      var decimalF = L.substr(2, 2);
      var decimalS = L.substr(4);
      L = decimalF + "." + decimalS;
      L = "0." + Math.round(L);
    }
    if (L < 0.5) {
      S = (maxSp - minSp) / (maxSp + minSp);
    } else {
      S = (maxSp - minSp) / (2.0 - maxSp - minSp);
    }
    S = S.toFixed(2);
    switch (maxSp) {
      case R:
        H = (G - B) / (maxSp - minSp);
        break;
      case G:
        H = 2.0 + (B - R) / (maxSp - minSp);
        break;
      case B:
        H = 4.0 + (R - G) / (maxSp - minSp);
        break;
      default:
        break;
    }
    if (L == 1) {
      L += "00";
    }
    H *= 60; H = Math.round(H);
    S = S.replace("0.", "") + "%";
    L = L.replace("0.", "") + "%";
    return "hsl(" + H + "," +  S + "," + L + ")";
  }
  return error;
};

function hslToRgb(color) {
  var error = "hslToRgb: Invalid argument.";
  color = color.toLowerCase();
  while (color.includes(" ") || color.includes("hsl") || color.includes("(") || color.includes(")") || color.includes("%") || color.includes("°")) {
    color = color.replace(" ", "").replace("hsl", "").replace("(", "").replace(")", "").replace("%", "").replace("°", "");
  }
  var firstC = color.indexOf(",");
  var secndC = color.indexOf(",", firstC+1);
  var thirdC = color.indexOf(",", secndC+1);
  if (thirdC > secndC) {
    return error;
  }
  if (firstC > 0 && secndC > firstC && thirdC < 0) {
    var H, S, L;
    H = color.substring(0, firstC);
    S = color.substring(firstC+1, secndC);
    L = color.substring(secndC+1);
    if (H > 360 || H < 0 || S > 100 || S < 0 || L > 100 || L < 0) {
      return error;
    }
    if (H == 0 && S == 0) {
      L = Math.round(L / 100 * 255);
      H = S = L;
      return "rgb(" + H + "," + S + "," + L + ")";
    }
    H /= 360;
    S /= 100;
    L /= 100;
    var tempOne, tempTwo;
    if (L < 0.5) {
      tempOne = L * (1.0 + S);
    } else {
      tempOne = L + S - L * S;
    }
    tempTwo = 2 * L - tempOne;

    var tempR, tempG, tempB;
    tempR = H + 0.333; tempR = +tempR;
    tempG = H;         tempG = +tempG;
    tempB = H - 0.333; tempB = +tempB;
    if (tempR > 1) { tempR -= 1; } if (tempR < 0) { tempR += 1; }
    if (tempG > 1) { tempG -= 1; } if (tempG < 0) { tempG += 1; }
    if (tempB > 1) { tempB -= 1; } if (tempB < 0) { tempB += 1; }

    var R, G, B;
    if (6 * tempR < 1) {
      R = tempTwo + (tempOne - tempTwo) * 6 * tempR;
    } else if (2 * tempR < 1) {
      R = tempOne;
    } else if (3 * tempR < 2) {
      R = tempTwo + (tempOne - tempTwo) * (0.666 - tempR) * 6;
    } else {
      R = tempTwo;
    }
    R = Math.round(R * 255);

    if (6 * tempG < 1) {
      G = tempTwo + (tempOne - tempTwo) * 6 * tempG;
    } else if (2 * tempG < 1) {
      G = tempOne;
    } else if (3 * tempG < 2) {
      G = tempTwo + (tempOne - tempTwo) * (0.666 - tempG) * 6;
    } else {
      G = tempTwo;
    }
    G = Math.round(G * 255);

    if (6 * tempB < 1) {
      B = tempTwo + (tempOne - tempTwo) * 6 * tempB;
    } else if (2 * tempB < 1) {
      B = tempOne;
    } else if (3 * tempB < 2) {
      B = tempTwo + (tempOne - tempTwo) * (0.666 - tempB) * 6;
    } else {
      B = tempTwo;
    }
    B = Math.round(B * 255);

    return "rgb(" + R + "," + G + "," + B + ")";
  }
  return error;
};
