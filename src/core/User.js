import Goal from './Goal';

class User {
    constructor(id, username, password, avatar) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
        this.goal = null;
    }

    withGoal(goal) {
        this.goal = goal;
        return this;
    }
}

export default User;