export class UserService {
    _key= 'clan_e_portal_user';
    resetUser(){
        localStorage.removeItem(this._key);
    }
    getUser() {
        return JSON.parse(localStorage.getItem(this._key))
    }

    setUser(data) {
        localStorage.setItem(this._key,JSON.stringify(data));
    }
}