export class Journey {
    constructor(id, goal_id) {
        this.id = id;
        this.goalId = goal_id;
        this.ascend = new Array(4);
    }

    withFields(aware, engage, subscribe, convert, excite, advocate, promote) {
        this.aware = aware || '';
        this.engage = engage || '';
        this.subscribe = subscribe || '';
        this.convert = convert || '';
        this.excite = excite || '';
        this.advocate = advocate || '';
        this.promote = promote || '';
        return this;
    }

    withAscend(ascend_1, ascend_2, ascend_3, ascend_4) {
        this.ascend = [ascend_1, ascend_2, ascend_3, ascend_4];
        return this;
    }
}