export default class UserInfo {
    constructor({ UserNameSelector, JobSelector, AvatarSelector}) {
        this._name = document.querySelector(UserNameSelector);
        this._job = document.querySelector(JobSelector);
        this._avatar = document.querySelector(AvatarSelector);
    }

    getUserInfo() {
        this.data = {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.src
        };

        return this.data;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = `${this._name}`
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;

    }

    getUserId (data) {
        return data._id
    }
}

