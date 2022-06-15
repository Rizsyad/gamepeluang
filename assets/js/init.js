const addSession = (key, value) => sessionStorage.setItem(key, value);
const deleteSession = (key) => sessionStorage.removeItem(key);
const clearSession = () => sessionStorage.clear();
const getSession = (key) => sessionStorage.getItem(key);
const selectorId = (id) => document.getElementById(id);
const allEqual = (arr) => arr.every((val) => val === arr[0]);

const redirect = (target) => {
  setTimeout(() => {
    location.href = target;
  }, 5);
};

const player = new Player();
const emoji = ["😍", "🤣", "😱"];
