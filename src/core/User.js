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

export class UserDetail {
    constructor(id, fullname, avatar, lastActivity, active, revenue) {
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.lastActivity = lastActivity;
        this.active = active;
        this.revenue = revenue;
    }
}

export default User;