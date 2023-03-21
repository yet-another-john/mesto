export class UserInfo {
  constructor({userNameSelector, userStatusSelector, profileAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userStatus = document.querySelector(userStatusSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
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

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  };

  setUserInfo(userName, userStatus, userId, avatar) {
    this._userName.textContent = userName;
    this._userStatus.textContent = userStatus;
    this._userId = userId;
  };
}
