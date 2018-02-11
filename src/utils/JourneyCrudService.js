import _ from 'lodash';
import axios from 'axios';
import { Journey } from 'core/Journey';
import AbstractCrudService from './AbstractCrudService';
import moment from 'moment';

export class JourneyCrudService extends AbstractCrudService {
    constructor() {
        super('journeys');
    }

    update(journey) {
        const id = journey.id;
        const goal_id = journey.goalId;
        const aware = journey.aware;
        const engage = journey.engage;
        const subscribe = journey.subscribe;
        const convert = journey.convert;
        const excite = journey.excite;
        const ascend_1 = journey.ascend[0];
        const ascend_2 = journey.ascend[1];
        const ascend_3 = journey.ascend[2];
        const ascend_4 = journey.ascend[3];
        const advocate = journey.advocate;
        const promote = journey.promote;
        return axios.put(`${this.apiUrl}/${journey.id}`, {
            id,
            goal_id,
            aware,
            engage,
            subscribe,
            convert,
            excite,
            ascend_1,
            ascend_2,
            ascend_3,
            ascend_4,
            advocate,
            promote
        });
    }

    async listByGoalId(goalId) {
        const { list, columns } = await this.fetchByFields({ 'goal_id': goalId });
        if (_.isEmpty(list)) {
            const { data } = await axios.post(this.apiUrl, { 'goal_id': goalId });
            return new Journey(data, goalId);
        } else {
            const journeys = list.map((rawJourney) => this.constructor.convert(rawJourney)(columns));
            return _.head(journeys);
        }
    }

    static convert(rawJourney) {
        return (columns) => {
            const id = this.valueFrom(columns)('id')(rawJourney);
            const goal_id = this.valueFrom(columns)('goal_id')(rawJourney);
            const aware = this.valueFrom(columns)('aware')(rawJourney);
            const engage = this.valueFrom(columns)('engage')(rawJourney);
            const subscribe = this.valueFrom(columns)('subscribe')(rawJourney);
            const convert = this.valueFrom(columns)('convert')(rawJourney);
            const excite = this.valueFrom(columns)('excite')(rawJourney);
            const ascend_1 = this.valueFrom(columns)('ascend_1')(rawJourney);
            const ascend_2 = this.valueFrom(columns)('ascend_2')(rawJourney);
            const ascend_3 = this.valueFrom(columns)('ascend_3')(rawJourney);
            const ascend_4 = this.valueFrom(columns)('ascend_4')(rawJourney);
            const advocate = this.valueFrom(columns)('advocate')(rawJourney);
            const promote = this.valueFrom(columns)('promote')(rawJourney);

            return new Journey(id, goal_id)
                .withFields(aware, engage, subscribe, convert, excite, advocate, promote)
                .withAscend(ascend_1, ascend_2, ascend_3, ascend_4);
        }
    }
}