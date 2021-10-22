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

let valueFilter = "";
const ctx = canvas.getContext("2d");
function setFilters(event) {
  // valueFilter = "";
  const currentTarg = event.target;
  if (currentTarg.matches("input")) {
    const suffix = currentTarg.dataset.sizing || "";
    currentTarg.nextElementSibling.value = currentTarg.value;
    document.documentElement.style.setProperty(`--${currentTarg.name}`, currentTarg.value + suffix);
    valueFilter += `${currentTarg.name}(${currentTarg.value}${suffix}) `;
    // ctx.drawImage(imageEdit, 0, 0);
//---------

  ctx.imageSmoothingEnabled = false;
  canvas.setAttribute('width', imageEdit.width);
  canvas.setAttribute('height', imageEdit.height);
  console.log("add ctx");

  // const img = new Image();
  // imageEdit.setAttribute('crossOrigin', 'anonymous'); 
  // img.onload = function() {
    console.log ("canv", canvas.width, canvas.height);
    // canvas.width = img.width;
    // canvas.height = img.height;
    ctx.scale(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    ctx.drawImage(imageEdit, 0, 0);
  // };  
  // img.src = imageEdit.src;
  console.log ("img", imageEdit.naturalWidth, imageEdit.naturalHeight);

//--------
  }
  
}

function resetFilters() {
    
  inputs.forEach(element => {
    const suffix = element.dataset.sizing || "";
    element.value = element.defaultValue;
    element.nextElementSibling.value = element.defaultValue;
    document.documentElement.style.setProperty(`--${element.name}`, element.defaultValue + suffix);
    valueFilter += `${element.name}(${element.defaultValue}${suffix}) `;})
 }

 function currentValueFilters() {
  valueFilter = "";
  inputs.forEach(element => {
    const suffix = element.dataset.sizing || "";
    valueFilter += `${element.name}(${element.value}${suffix}) `;})
    // console.log(valueFilter);
    return valueFilter;
 }

 //FullScreen
//-------------------------------------------------------------
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
  imageEdit.onload = () => {ImageToCanvas()}; 
  (numImg < 20)? numImg++ : numImg = 1;
  // ImageToCanvas();
}

function addZero (n) {
  return ((parseInt(n) < 10) ? '0' : '') + n;
}


btnLoad.addEventListener('change', function(event) {
  const file = btnLoad.files[0];
  if (file.type.startsWith("image/")) {
    console.log(btnLoad.value);
    const reader = new FileReader();
    reader.onload = () => {
      // const img = new Image();
      // img.src = reader.result;
      imageEdit.src = reader.result;
      btnLoad.value = null;
      ImageToCanvas();
      // imageContainer.innerHTML = "";
      // imageContainer.append(img);
    }
    reader.readAsDataURL(file);
    // ImageToCanvas();
  } else alert("Selected file isn't an image!");
  
});
// document.addEventListener("DOMContentLoaded", ImageToCanvas);

function ImageToCanvas(valueFilt) {
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  canvas.setAttribute('width', imageEdit.width);
  canvas.setAttribute('height', imageEdit.height);
  console.log("add ctx");

  // const img = new Image();
  // imageEdit.setAttribute('crossOrigin', 'anonymous'); 
  // img.onload = function() {
    console.log ("canv", canvas.width, canvas.height);
    // canvas.width = img.width;
    // canvas.height = img.height;
    ctx.scale(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    ctx.drawImage(imageEdit, 0, 0);
  // };  
  // img.src = imageEdit.src;
  console.log ("img", imageEdit.naturalWidth, imageEdit.naturalHeight);
}
// function ImageToCanvas() {
//   const img = new Image();
//   img.setAttribute('crossOrigin', 'anonymous'); 
//   img.src = imageEdit.src;
//   console.log(img.src);
//   img.onload = function() {
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//   };  
// }

ImageToCanvas();
// document.addEventListener("onload", ImageToCanvas);



btnSave.addEventListener('click', test);
// btnSave.addEventListener('click', saveImage);

function saveImage(event) {
  let ctx = canvas.getContext("2d");
  
  // ctx.imageSmoothingEnabled = false;
  canvas.setAttribute('width', imageEdit.width);
  canvas.setAttribute('height', imageEdit.height);
  console.log("save img");

  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = imageEdit.src;
  img.onload = function() {
    console.log ("canv", canvas.width, canvas.height);
    // canvas.width = img.width;
    // canvas.height = img.height;
    
    ctx.scale(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    console.log( ctx.filter);
    // ctx.save();
    ctx.filter = valueFilter;  
    console.log(ctx.filter);
    ctx.drawImage(imageEdit, 0, 0);
    // console.log(valueFilter);
    let link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  // ctx = undefined;
  ctx.filter = "none"; 
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
  console.log( ctx.filter);
  };  
    
  console.log ("img", imageEdit.naturalWidth, imageEdit.naturalHeight);



  console.log(canvas.toDataURL());
 
}
// function saveImage(event) {
//   console.log(canvas.toDataURL());
//   let link = document.createElement('a');
//   link.download = 'download.png';
//   link.href = canvas.toDataURL();
//   // const dataURL = canvas.toDataURL("image/jpeg");
//   link.click();
//   link.delete;
// }



function test(event) {
  let ctx = canvas.getContext("2d");
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = imageEdit.src;
  img.onload = function() {
  canvas.setAttribute('width', imageEdit.width);
  canvas.setAttribute('height', imageEdit.height);
  // const ctx = canvas.getContext("2d");

    ctx.scale(imageEdit.width / imageEdit.naturalWidth,imageEdit.height / imageEdit.naturalHeight);
    // ctx.save();
    console.log("cur", currentValueFilters());
    // ctx.filter = currentValueFilters();  
    ctx.filter = "blur(2px) invert(71%) sepia(4%) saturate(90%) hue(5deg)";
    console.log( ctx.filter);
    // console.log(document.documentElement.style);
    ctx.drawImage(img, 0, 0);


  let link = document.createElement('a');
  link.download = 'test.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  };  

   
  // ctx.filter = "none"; 
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.restore();
  
}