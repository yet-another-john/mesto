export class UserInfo {
  constructor({userNameSelector, userStatusSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userStatus = document.querySelector(userStatusSelector);
  };

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userStatus: this._userStatus.textContent
    }
  };

  setUserInfo(userName, userStatus) {
    this._userName.textContent = userName;
    this._userStatus.textContent = userStatus;
  };
}
