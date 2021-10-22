const containerFilters = document.querySelector(".filters");
const btnReset = document.querySelector(".btn-reset");
const btnLoad = document.querySelector(".btn-load--input");
const inputs = containerFilters.querySelectorAll("input");
const imageEdit = document.querySelector("img");
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const btnSave = document.querySelector('.btn-save');


containerFilters.addEventListener("input", setFilters);
btnReset.addEventListener("click", resetFilters);

let valueFilter = "", arrFiltValue = [];
function setFilters(event) {
  const currentTarg = event.target;
  if (currentTarg.matches("input")) {
    const suffix = currentTarg.dataset.sizing || "";
    currentTarg.nextElementSibling.value = currentTarg.value;
    document.documentElement.style.setProperty(`--${currentTarg.name}`, currentTarg.value + suffix);
  }
}

function resetFilters() {
  inputs.forEach(element => {
    const suffix = element.dataset.sizing || "";
    element.value = element.defaultValue;
    element.nextElementSibling.value = element.defaultValue;
    document.documentElement.style.setProperty(`--${element.name}`, element.defaultValue + suffix);
  })
 }

 function currentValueFilters() {
  valueFilter = "", arrFiltValue =[];
  inputs.forEach(element => {
    const suffix = element.dataset.sizing || "";
    const nameFlt  = (element.name === "hue") ? "hue-rotate" : element.name;
    arrFiltValue.push(`${nameFlt}(${element.value}${suffix})`);})
    return arrFiltValue.join(" ");
 }


 const btnFullScreen = document.querySelector('.fullscreen');

btnFullScreen.addEventListener("click", (event) => {
    toggleFullScreen();
});

function toggleFullScreen() {
  if (!document.fullscreenElement) {
     document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
       document.exitFullscreen();
    }
  }
}

const btnNext = document.querySelector('.btn-next');
btnNext.addEventListener("click", setNextImg);
let numImg = 1;
function setNextImg () {
  const sourseImgs= "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images";
  let today = new Date(),
  hour = today.getHours();
  let dayTime = "morning";
  if ((hour > 6) && (hour < 12) ) {
  dayTime = "morning";
  } else if ((hour >= 12) && (hour < 18) ) {
    dayTime = "day";
  } else if ((hour >= 18) && (hour < 24) ) {
    dayTime = "evening";
  } else {
    dayTime = "night";
  }
  imageEdit.setAttribute("src", `${sourseImgs}/${dayTime}/${addZero(numImg)}.jpg`);
  imageEdit.onload = () => {

  }; 
  (numImg < 20)? numImg++ : numImg = 1;
}

function addZero (n) {
  return ((parseInt(n) < 10) ? '0' : '') + n;
}


btnLoad.addEventListener('change', function(event) {
  const file = btnLoad.files[0];
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      imageEdit.src = reader.result;
      btnLoad.value = null;
    }
    reader.readAsDataURL(file);
  } else alert("Selected file isn't an image!");
  
});

btnSave.addEventListener('click', saveImage);

function saveImage(event) {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = imageEdit.src;
  img.onload = function() {
    canvas.setAttribute('width', imageEdit.width);
    canvas.setAttribute('height', imageEdit.height);
    // ctx.scale(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    const coef = Math.min(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    ctx.scale(coef, coef);
    ctx.filter = currentValueFilters();  
    ctx.drawImage(img, 0, 0);
    let link = document.createElement('a');
    link.download = 'test.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    ctx.filter = "none";
  };  
}