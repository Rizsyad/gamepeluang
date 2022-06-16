class Player {
  constructor() {
    this._level = 1; // 1 = easy, 2 = medium, 3 = hard, 4 = pro, 5 = Insane
    this._username = "";
    this._win = 0;
    this._lose = 0;
  }

  // function

  generateToken() {
    // ~~ = Math.floor()
    const random = ~~[Math.random() * 10000];
    const token = `${this.username}${random}`;
    return token;
  }

  // getther method

  get username() {
    return this._username;
  }

  get level() {
    return this._level;
  }

  get win() {
    return this._win;
  }

  get lose() {
    return this._lose;
  }

  get register() {
    addSession("USER_USERNAME", this._username);
    addSession("USER_TOKEN", this.generateToken());
    addSession("LEVEL_GAME", this._level);
    redirect("game.html");
  }

  get logout() {
    clearSession();
    redirect("index.html");
  }

  get addWin() {
    this._win++;
    addSession("USER_WIN", this._win);
  }

  get addLose() {
    this._lose++;
    addSession("USER_LOSE", this._lose);
  }

  // setther method

  set username(username) {
    return (this._username = username);
  }

  set level(level) {
    return (this._level = level);
  }

  set win(win) {
    this._win = win;
    addSession("USER_WIN", this._win);
  }

  set lose(lose) {
    this._lose = lose;
    addSession("USER_LOSE", this._lose);
  }
}
