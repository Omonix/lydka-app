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
const lb_write_data = (data) => {
  localStorage.setItem("lydka", JSON.stringify(data));
  return;
};
const lb_read_data = () => {
  return JSON.parse(localStorage.getItem("lydka"));
};
const lb_set_data = () => {
  if (localStorage.getItem("lydka") === null) {
    return {
      dataMaster: [],
      labelTab: ["1", "2", "3", "4", "5", "6", "7", "8"],
      greenPain: { value: 4, color: [0, 255, 0] },
      yellowPain: { value: 6, color: [255, 190, 0] },
      orangePain: { value: 8, color: [255, 90, 0] },
      redPain: { value: 10, color: [255, 0, 0] },
      mainColor: {
        text: "rgb(207, 72, 160)",
        background: "rgba(207, 72, 160, 0.4)",
      },
    };
  } else {
    return lb_read_data("lydka");
  }
};

document.querySelector(".inputColorGreen").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  let saved = lb_read_data();
  if (isNaN(green) === false && green >= 0 && green < yellow) {
    saved.greenPain.value = green;
  } else {
    saved.greenPain.value = 3;
  }
  lb_write_data(saved);
});
document.querySelector(".inputColorYellow").addEventListener("change", () => {
  const green = parseInt(document.querySelector(".inputColorGreen").value);
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  let saved = lb_read_data();
  if (isNaN(yellow) === false && yellow > green && yellow < orange) {
    saved.yellowPain.value = yellow;
  } else {
    saved.yellowPain.value = 6;
  }
  lb_write_data(saved);
});
document.querySelector(".inputColorOrange").addEventListener("change", () => {
  const yellow = parseInt(document.querySelector(".inputColorYellow").value);
  const orange = parseInt(document.querySelector(".inputColorOrange").value);
  let saved = lb_read_data();
  if (isNaN(orange) === false && orange > yellow && orange < 10) {
    saved.orangePain.value = orange;
  } else {
    saved.orangePain.value = 8;
  }
  lb_write_data(saved);
});
document.querySelector(".masterColor").addEventListener("change", () => {
  newrgb = document.querySelector(".masterColor").value;
  rgbConvert = lb_hexaToRGB(newrgb);
  newrgba = `rgba(${rgbConvert[0]}, ${rgbConvert[1]}, ${rgbConvert[2]}, 0.4)`;
  document.querySelector(":root").style.setProperty("--main-color", newrgb);
  document
    .querySelector(":root")
    .style.setProperty("--main-color-opacity", newrgba);
  let saved = lb_read_data();
  saved.mainColor.text = newrgb;
  saved.mainColor.background = newrgba;
  lb_write_data(saved);
});
document.querySelector(".choiceGreen").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceGreen").value);
  let saved = lb_read_data();
  saved.greenPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_write_data(saved);
});
document.querySelector(".choiceYellow").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceYellow").value);
  let saved = lb_read_data();
  saved.yellowPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_write_data(saved);
});
document.querySelector(".choiceOrange").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceOrange").value);
  let saved = lb_read_data();
  saved.orangePain.color = [newColor[0], newColor[1], newColor[2]];
  lb_write_data(saved);
});
document.querySelector(".choiceRed").addEventListener("change", () => {
  newColor = lb_hexaToRGB(document.querySelector(".choiceRed").value);
  let saved = lb_read_data();
  saved.redPain.color = [newColor[0], newColor[1], newColor[2]];
  lb_write_data(saved);
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
      .style.setProperty("--reverse-color", "#000000");
  } else {
    document.querySelector(".modeSwitcher").innerHTML = "Dark";
    document
      .querySelector(":root")
      .style.setProperty("--main-background", "#0f0f0f");
    document.querySelector(":root").style.setProperty("--color", "#000000");
    document
      .querySelector(":root")
      .style.setProperty("--reverse-color", "#dee1e0");
  }
});
