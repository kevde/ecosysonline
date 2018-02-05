import Goal from './Goal';

class User {
    constructor(id, username, password, avatar) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.goals = new Goal();
    }
}

export default User;