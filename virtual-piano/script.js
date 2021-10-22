const Piano = document.querySelector(".piano");
const KeysPiano = document.querySelectorAll(".piano-key");
const Sounds = document.getElementsByTagName('audio');

//functions
const startSoundMouse = (event) => {
    event.target.classList.add("piano-key-active");

    const note = event.target.dataset.note;
    const soundN = document.querySelector(`audio[data-note = "${note}"]`);
    if ((!soundN) || (event.repeat)) return;
    playSound(soundN);
};

const startSound = (event) => {
    const soundKey = document.querySelector(`audio[data-letter = "${event.code.substring(3)}"]`);
    const KeyPiano = document.querySelector(`.piano-key[data-letter = "${event.code.substring(3)}"]`);
    if ((!soundKey) || (event.repeat)) return;
    playSound(soundKey);
    KeyPiano.classList.add("piano-key-active");
};

const stopSound = (event) => {
    KeysPiano.forEach((element) => {
        element.classList.remove("piano-key-active");
});
}

const stopActiveKey = (event) => {
 event.target.classList.remove("piano-key-active");
}
 
const stopOverKey = (event) => {
        KeysPiano.forEach((element) => {
        element.classList.remove("piano-key-active"); 
        element.removeEventListener('mouseover', startSoundMouse);
        element.removeEventListener('mouseout', stopActiveKey);
    });
    }

    const startOverKey = (event) => {
        if (event.target.classList.contains('piano-key')) {
            event.target.classList.add("piano-key-active");
            startSoundMouse(event);
        }
         KeysPiano.forEach((element) => {
        element.addEventListener('mouseover', startSoundMouse);
        element.addEventListener('mouseout', stopActiveKey);
        });
    }
  
function playSound(src) {
        src.currentTime = 0;
        src.play();
}
    
//listeners of container Piano
Piano.addEventListener('mousedown', startOverKey, false);
document.addEventListener('mouseup', stopOverKey);

//listeners of keyboard
window.addEventListener('keydown', startSound);
window.addEventListener('keyup', stopSound);

//FullScreen
//-------------------------------------------------------------
const ButtonFullScreen = document.querySelector('.fullscreen');

ButtonFullScreen.addEventListener("click", (event) => {
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
  // notes/letters
  //----------------------------------------------------------
  const btnContainer = document.querySelector('.btn-container');
  const btnNotes = document.querySelector('.btn-notes');
  const btnLetters = document.querySelector('.btn-letters');

  btnContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-active')) {
        return;
    } else {
    event.target.classList.add('btn-active');
    }
    if (event.target.classList.contains('btn-letters')) {
        btnNotes.classList.remove('btn-active');
        KeysPiano.forEach((element) => {
            element.classList.add("piano-key-letter");
        });
    } else {
        btnLetters.classList.remove('btn-active');
        KeysPiano.forEach((element) => {
            element.classList.remove("piano-key-letter");
        });
    }
  });