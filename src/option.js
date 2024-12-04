const lb_inputNumHandler = (newValue) => {
  document.querySelector(".inputNum").value = newValue;
};
const lb_average = (tab) => {
  sum = 0;
  sous = 0;
  for (let i = 0; i < tab.length; i++) {
    if (isNaN(tab[i]) === true) {
      sous++;
    } else {
      sum += tab[i];
    }
  }
  return sum / (tab.length - sous);
};
const lb_hexaToRGB = (hexa) => {
  r = parseInt(hexa.substring(1, 3), 16);
  g = parseInt(hexa.substring(3, 5), 16);
  b = parseInt(hexa.substring(5, hexa.length), 16);
  return [r, g, b];
};
const lb_RGBToHexa = (r, g, b) => {
  oneColor = r.toString(16);
  twoColor = g.toString(16);
  threeColor = b.toString(16);
  return `#${oneColor.length == 1 ? "0" + oneColor : oneColor}${
    twoColor.length == 1 ? "0" + twoColor : twoColor
  }${threeColor.length == 1 ? "0" + threeColor : threeColor}`;
};
const lb_writeData = (data) => {
  localStorage.setItem("lydka", JSON.stringify(data));
  return;
};
const lb_readData = () => {
  return JSON.parse(localStorage.getItem("lydka"));
};
const lb_setData = (data) => {
  if (localStorage.getItem(data) === null) {
    newData = {
      dataMaster: [],
      labelTab: ["1", "2", "3", "4", "5", "6", "7", "8"],
      greenPain: { value: 4, color: [0, 255, 0] },
      yellowPain: { value: 6, color: [255, 190, 0] },
      orangePain: { value: 8, color: [255, 90, 0] },
      redPain: { value: 10, color: [255, 0, 0] },
      mainColor: {
        text: "#CF48A0",
        background: "rgba(207, 72, 160, 0.4)",
      },
      mode: { normal: "#0F0F0F", reverse: "#dee1e0", name: "Dark" },
    };
    lb_writeData(newData);
    return newData;
  } else {
    return lb_readData("lydka");
  }
};
const lb_setMainColor = (newrgb, newrgba, mode) => {
  document.querySelector(":root").style.setProperty("--main-color", newrgb);
  document
    .querySelector(":root")
    .style.setProperty("--main-color-opacity", newrgba);
  document
    .querySelector(":root")
    .style.setProperty("--main-background", mode.normal);
  document
    .querySelector(":root")
    .style.setProperty("--reverse-color", mode.reverse);
};
const lb_setPain = (green, yellow, orange, red, main, mode) => {
  document.querySelector(".modeSwitcher").innerHTML = mode;
  document.querySelector(".masterColor").value = main.text;
  document.querySelector(".choiceGreen").value = lb_RGBToHexa(
    green.color[0],
    green.color[1],
    green.color[2]
  );
  document.querySelector(".choiceYellow").value = lb_RGBToHexa(
    yellow.color[0],
    yellow.color[1],
    yellow.color[2]
  );
  document.querySelector(".choiceOrange").value = lb_RGBToHexa(
    orange.color[0],
    orange.color[1],
    orange.color[2]
  );
  document.querySelector(".choiceRed").value = lb_RGBToHexa(
    red.color[0],
    red.color[1],
    red.color[2]
  );
  document.querySelector(".inputColorGreen").value = green.value;
  document.querySelector(".inputColorYellow").value = yellow.value;
  document.querySelector(".inputColorOrange").value = orange.value;
};
const defaulter = lb_setData("lydka");
lb_setMainColor(
  defaulter.mainColor.text,
  defaulter.mainColor.background,
  defaulter.mode
);
lb_setPain(
  defaulter.greenPain,
  defaulter.yellowPain,
  defaulter.orangePain,
  defaulter.redPain,
  defaulter.mainColor,
  defaulter.mode.name
);

document.querySelector(".inputColorGreen").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  let saved = lb_readData();
  if (isNaN(green) === false && green >= 0 && green < yellow) {
    saved.greenPain.value = green;
  } else {
    saved.greenPain.value = 4;
    document.querySelector(".inputColorGreen").value = 4;
  }
  lb_writeData(saved);
});
document.querySelector(".inputColorYellow").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  let saved = lb_readData();
  if (isNaN(yellow) === false && yellow > green && yellow < orange) {
    saved.yellowPain.value = yellow;
  } else {
    saved.yellowPain.value = 6;
    document.querySelector(".inputColorYellow").value = 6;
  }
  lb_writeData(saved);
});
document.querySelector(".inputColorOrange").addEventListener("change", () => {
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  let saved = lb_readData();
  if (isNaN(orange) === false && orange > yellow && orange < 10) {
    saved.orangePain.value = orange;
  } else {
    saved.orangePain.value = 8;
    document.querySelector(".inputColorOrange").value = 8;
  }
  lb_writeData(saved);
});
document.querySelector(".masterColor").addEventListener("change", () => {
  newrgb = document.querySelector(".masterColor").value;
  rgbConvert = lb_hexaToRGB(newrgb);
  newrgba = `rgba(${rgbConvert[0]}, ${rgbConvert[1]}, ${rgbConvert[2]}, 0.4)`;
  document.querySelector(":root").style.setProperty("--main-color", newrgb);
  document
    .querySelector(":root")
    .style.setProperty("--main-color-opacity", newrgba);
  let saved = lb_readData();
  saved.mainColor.text = newrgb;
  saved.mainColor.background = newrgba;
  lb_writeData(saved);
});
document.querySelector(".choiceGreen").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceGreen").value);
  let saved = lb_readData();
  saved.greenPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_writeData(saved);
});
document.querySelector(".choiceYellow").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceYellow").value);
  let saved = lb_readData();
  saved.yellowPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_writeData(saved);
});
document.querySelector(".choiceOrange").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceOrange").value);
  let saved = lb_readData();
  saved.orangePain.color = [newColor[0], newColor[1], newColor[2]];
  lb_writeData(saved);
});
document.querySelector(".choiceRed").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceRed").value);
  let saved = lb_readData();
  saved.redPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_writeData(saved);
});
document.querySelector(".modeSwitcher").addEventListener("click", () => {
  mode = document.querySelector(".modeSwitcher").innerHTML;
  if (mode === "Dark") {
    document.querySelector(".modeSwitcher").innerHTML = "Light";
    document
      .querySelector(":root")
      .style.setProperty("--main-background", "#dee1e0");
    document.querySelector(":root").style.setProperty("--color", "#dee1e0");
    document
      .querySelector(":root")
      .style.setProperty("--reverse-color", "#0F0F0F");
    let saved = lb_readData("lydka");
    saved.mode.normal = "#dee1e0";
    saved.mode.reverse = "#0F0F0F";
    saved.mode.name = "Light";
    lb_writeData(saved);
  } else {
    document.querySelector(".modeSwitcher").innerHTML = "Dark";
    document
      .querySelector(":root")
      .style.setProperty("--main-background", "#0f0f0f");
    document.querySelector(":root").style.setProperty("--color", "#0F0F0F");
    document
      .querySelector(":root")
      .style.setProperty("--reverse-color", "#dee1e0");
    let saved = lb_readData("lydka");
    saved.mode.normal = "#0F0F0F";
    saved.mode.reverse = "#dee1e0";
    saved.mode.name = "Dark";
    lb_writeData(saved);
  }
});
