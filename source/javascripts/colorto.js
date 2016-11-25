function hexToRgb(color) {
  var cnvError = "hexToRgb: Invalid argument."
  color = color.trim();
  if (color.startsWith("#")) {
    color = color.slice(1);
  }
  if (color.length != 3 && color.length != 6) {
    return cnvError;
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

function rgbToHex(color) {
  var cnvError = "rgbToHex: Invalid argument.";
  color = color.toLowerCase();
  while (color.includes(" ") || color.includes("rgb") || color.includes("(") || color.includes(")")) {
    color = color.replace(" ", "").replace("rgb", "").replace("(", "").replace(")", "");
  }
  var firstC = color.indexOf(",");
  var secndC = color.indexOf(",", firstC+1);
  var thirdC = color.indexOf(",", secndC+1);
  if (thirdC > secndC) {
    return cnvError;
  }
  if (firstC && secndC && thirdC <= 0) {
    var R, G, B, result;
    R = color.substring(0, firstC);
    R = parseInt(R);
    G = color.substring(firstC+1, secndC);
    G = parseInt(G);
    B = color.substring(secndC+1);
    B = parseInt(B);
    if (R > 255 || G > 255 || B > 255) {
      return cnvError;
    } else {
      R = R.toString(16);
      if (R.length == 1) { R = R.repeat(2); }
      G = G.toString(16);
      if (G.length == 1) { G = G.repeat(2); }
      B = B.toString(16);
      if (B.length == 1) { B = B.repeat(2); }
      result = "#" + R + G + B;
    }
  }
  return result.toUpperCase();
};
