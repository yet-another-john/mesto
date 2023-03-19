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

  getUserId() {
    return this._userId;
  };

  setUserInfo(userName, userStatus, userId) {
    this._userName.textContent = userName;
    this._userStatus.textContent = userStatus;
    this._userId = userId;
  };
}
