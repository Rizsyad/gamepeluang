let levelGame = parseInt(getSession("LEVEL_GAME"));
createElementBox(levelGame + 2);

const boxs = document.querySelectorAll(".box");

function dice() {
  let gacha = [];

  for (let i = 0; i < boxs.length; i++) {
    const roll = emoji[~~(Math.random() * emoji.length)];
    gacha.push(roll);
  }

  return gacha;
}

function rolling() {
  let timer = null;

  function stop() {
    clearTimeout(timer);
  }

  function start() {
    timer = setInterval(() => {
      dice().map((value, index) => {
        document.getElementById(`box${index + 1}`).textContent = value;
      });
    }, 50);
  }

  return {
    stop,
    start,
  };
}

function createElementBox(much) {
  let targetElement = selectorId("boxLevel");

  for (let i = 0; i < much; i++) {
    targetElement.innerHTML += `<div class="col"><div class="card my-2"><div class="card-body box text-center fs-1" id="box${
      i + 1
    }"></div></div></div>`;
  }
}

function playAudio(loop, src, play) {
  let audio = selectorId("audio");

  if (loop) audio.setAttribute("loop", "");
  if (!loop) audio.removeAttribute("loop");

  audio.setAttribute("autoplay", "");
  audio.setAttribute("src", src);

  if (play) return audio.play();

  return audio.pause();
}

function playersIsWin(win) {
  if (win) {
    playAudio(false, "assets/audio/win.mp3", true);
    Swal.fire("Congratulations", "Your Win This Lote", "success");
    player.addWin;
    countWin.textContent = player.win;
    return;
  }

  playAudio(false, "assets/audio/lose.mp3", true);
  Swal.fire("Booo", "Try again...", "error");
  player.addLose;
  countLose.textContent = player.lose;
}

window.addEventListener("load", () => {
  let token = getSession("USER_TOKEN");
  let username = getSession("USER_USERNAME");
  let win = getSession("USER_WIN") || 0;
  let lose = getSession("USER_LOSE") || 0;
  let levelSesion = getSession("LEVEL_GAME") || 1;

  let countWin = selectorId("countWin");
  let countLose = selectorId("countLose");
  let level = selectorId("level");
  let user = selectorId("user");

  player.win = parseInt(win);
  player.lose = parseInt(lose);
  player.level = parseInt(levelSesion);

  countWin.textContent = player.win;
  countLose.textContent = player.lose;
  level.textContent = player.level;
  user.textContent = token;

  let roll = rolling();

  if (!token && !username) return redirect("index.html");

  boxs.forEach((box) => {
    let randomEmoji = ~~(Math.random() * emoji.length);
    box.textContent = emoji[randomEmoji];
  });

  selectorId("spin").addEventListener("click", () => {
    let spinSelect = selectorId("spin");
    let textSpin = spinSelect.textContent;

    if (textSpin == "SPIN") {
      spinSelect.textContent = "STOP";

      playAudio(true, "assets/audio/ding.mp3", true);
      roll.start();
      return;
    }

    spinSelect.textContent = "SPIN";
    roll.stop();
    playAudio(true, "assets/audio/ding.mp3", false);

    let boxGame = [...boxs].map((b) => b.textContent);

    if (allEqual(boxGame)) {
      playersIsWin(true);
      window.open("https://youtu.be/HlD2goOjPUo?t=49", "_blank");
      return;
    }

    playersIsWin(false);
  });

  selectorId("logout").addEventListener("click", () => {
    player.logout;
  });
});
