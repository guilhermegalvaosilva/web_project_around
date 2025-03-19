export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._nameElement = document.querySelector(name)
    this._jobElement = document.querySelector(about)
    this._avatarElement = document.querySelector(avatar)
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._jobElement.textContent = about;
    }
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }
}