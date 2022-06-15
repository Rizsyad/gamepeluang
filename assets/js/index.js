window.addEventListener("load", () => {
  let token = getSession("USER_TOKEN");
  let username = getSession("USER_USERNAME");

  let levelDesc = ["Easy", "Medium", "Hard", "Very Hard", "Insane"];

  if (token && username) return redirect("game.html");

  for (let i = 0; i < levelDesc.length; i++) {
    level.innerHTML += `<option value="${i + 1}" ${
      i + 1 == 1 ? "selected" : ""
    }>${levelDesc[i]}</option>`;
  }

  selectorId("regis").addEventListener("click", () => {
    let usernameId = selectorId("username").value;
    let level = selectorId("level").value;

    if (!usernameId && usernameId === "")
      return Swal.fire("Error", "Please enter username", "error");

    player._username = usernameId;
    player._level = level;
    player.register;
  });
});
