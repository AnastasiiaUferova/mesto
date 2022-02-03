export default class UserInfo {
    constructor({ UserNameSelector, JobSelector }) {
        this._name = document.querySelector(UserNameSelector);
        this._job = document.querySelector(JobSelector);
    }

    getUserInfo() {
        this.data = {
            name: this._name.textContent,
            job: this._job.textContent,
        };

        return this.data;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}






