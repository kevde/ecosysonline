import Goal from './Goal';

class User {
    constructor(id, username, avatar, role) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.role = role;
    }

    withGoal(goal) {
        this.goal = goal;
        return this;
    }

    withPassword(password) {
        this.password = password;
        return this;
    }

    withUserDetails(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        return this;
    }

    withStatus(active, lastActivity) {
        this.active = active;
        this.lastActivity = lastActivity;
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