import _ from 'lodash';
import axios from 'axios';
import Persona from 'core/Persona';
import { MetricValue } from 'core/Metrics';
import AbstractCrudService from './AbstractCrudService';
import Promise from 'bluebird';

export class PersonaCrudService extends AbstractCrudService {
    constructor() {
        super('personas');
    }

    async delete(personaId) {
        const { data } = await axios.delete(`${this.apiUrl}/${personaId}`);
        console.log(data);
        if (data >= 1) {
            return true;
        } else {
            // throw new Error(`${personaId} cannot be deleted`);
        }
    }

    async create(goalId) {
        const { data } = await axios.post(this.apiUrl, { goal_id: goalId });
        return new Persona(data, goalId);
    }

    async updatePhoto(personaId, avatarBinary) {
        const formData = new FormData();
        const blob = await this.toBlob(avatarBinary);
        formData.append('avatarFile', blob, `avatar-${personaId}.png`);
        const result = await axios.post(process.env.REACT_APP_UPLOAD_API, formData);
        return result;
    }

    toBlob(canvas) {
        return new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)));
    }

    async updatePersona(persona) {
        const rawPersona = {};
        const rawCoreProblem = {};
        const rawSalesCanvas = {};
        rawPersona.firstname = persona.firstName;
        rawPersona.lastname = persona.lastName;
        rawPersona.age = persona.age;
        rawPersona.avatar = persona.avatar;
        rawPersona.gender = persona.gender;
        rawPersona.marital_status = persona.info.maritalStatus;
        rawPersona.location = persona.info.location;
        rawPersona.children = persona.info.children;
        rawPersona.quote = persona.info.quote;
        rawPersona.job_title = persona.info.jobTitle;
        rawPersona.annual_income = persona.info.income;
        rawPersona.education_level = persona.info.education;
        rawPersona.other_info = persona.info.other;
        rawPersona.books = persona.sources.books;
        rawPersona.magazines = persona.sources.magazines;
        rawPersona.blogs = persona.sources.blogs;
        rawPersona.gurus = persona.sources.gurus;
        rawPersona.other_sources = persona.sources.other;
        rawPersona.purchase_objections = persona.purchase.objections;
        rawPersona.purchase_role = persona.purchase.role;

        rawCoreProblem.core_goals = persona.coreProblems.goals;
        rawCoreProblem.core_values = persona.coreProblems.values;
        rawCoreProblem.core_challenges = persona.coreProblems.challenges;
        rawCoreProblem.pain_point_1 = persona.coreProblems.painPoints[0];
        rawCoreProblem.pain_point_2 = persona.coreProblems.painPoints[1];
        rawCoreProblem.pain_point_3 = persona.coreProblems.painPoints[2];
        rawCoreProblem.solution_1 = persona.coreProblems.solutions[0];
        rawCoreProblem.solution_2 = persona.coreProblems.solutions[1];
        rawCoreProblem.solution_3 = persona.coreProblems.solutions[2];

        rawSalesCanvas.trigger = persona.salesCanvas.trigger;
        rawSalesCanvas.action = persona.salesCanvas.action;
        rawSalesCanvas.conversation = persona.salesCanvas.conversation;
        rawSalesCanvas.sell = persona.salesCanvas.sell;

        const result1 = await axios.put(`${this.apiUrl}/${persona.id}`, rawPersona);
        const result2 = await axios.put(`${this.api}/core_problems/${persona.coreProblems.id}`, rawCoreProblem);
        const result3 = await axios.put(`${this.api}/sales_canvas/${persona.salesCanvas.id}`, rawSalesCanvas);
        return result1 + result2 + result3;
    }

    async listByGoalId(goalId) {
        const { data } = await axios.get(`${this.apiUrl}?include=core_problems,sales_canvas&filter=goal_id,eq,${goalId}`);
        const personas = this.getPersonas(data.personas.records, data.personas.columns);
        const coreProblems = this.getCoreProblems(data.core_problems.records, data.core_problems.columns);
        const salesCanvases = this.getSalesCanvas(data.sales_canvas.records, data.sales_canvas.columns);

        const returned = await Promise.map(personas, async(persona) => {
            const childElements = await this.createOrUpdateChildElements(persona, coreProblems, salesCanvases);
            return persona.withCoreProblem(childElements.coreProblem).withSalesCanvas(childElements.salesCanvas)
        });
        console.log(returned);
        return returned;
    }

    async createOrUpdateChildElements(persona, coreProblems, salesCanvases) {
        let coreProblem = _.find(coreProblems, ['persona_id', persona.id]);
        let salesCanvas = _.find(salesCanvases, ['persona_id', persona.id]);

        if (!coreProblem) {
            const { data } = await axios.post(`${this.api}/core_problems`, { persona_id: persona.id });
            coreProblem = { id: data };
        }

        if (!salesCanvas) {
            const { data } = await axios.post(`${this.api}/sales_canvas`, { persona_id: persona.id });
            salesCanvas = { id: data };
        }
        return { coreProblem, salesCanvas }
    }

    getPersonas(list, columns) {
        return list.map((rawPersona) => this.constructor.convert(rawPersona)(columns));
    }

    getCoreProblems(list, columns) {
        return list.map((rawCoreProblem) => this.constructor.convertCoreProblem(rawCoreProblem)(columns));
    }

    getSalesCanvas(list, columns) {
        return list.map((rawSalesCanvas) => this.constructor.convertSalesCanvas(rawSalesCanvas)(columns));
    }

    static convert(rawPersona) {
        return (columns) => {
            const id = this.valueFrom(columns)("id")(rawPersona);
            const goalId = this.valueFrom(columns)("goal_id")(rawPersona);
            const avatar = this.valueFrom(columns)("avatar")(rawPersona);
            const firstName = this.valueFrom(columns)("firstname")(rawPersona);
            const lastName = this.valueFrom(columns)("lastname")(rawPersona);
            const age = this.valueFrom(columns)("age")(rawPersona);
            const gender = this.valueFrom(columns)("gender")(rawPersona);
            const marital_status = this.valueFrom(columns)("marital_status")(rawPersona);
            const location = this.valueFrom(columns)('location')(rawPersona);
            const children = this.valueFrom(columns)('children')(rawPersona);
            const quote = this.valueFrom(columns)('quote')(rawPersona);
            const job_title = this.valueFrom(columns)('job_title')(rawPersona);
            const annual_income = this.valueFrom(columns)('annual_income')(rawPersona);
            const education_level = this.valueFrom(columns)('education_level')(rawPersona);
            const other_info = this.valueFrom(columns)('other_info')(rawPersona);
            const books = this.valueFrom(columns)('books')(rawPersona);
            const magazines = this.valueFrom(columns)('magazines')(rawPersona);
            const blogs = this.valueFrom(columns)('blogs')(rawPersona);
            const gurus = this.valueFrom(columns)('gurus')(rawPersona);
            const other_sources = this.valueFrom(columns)('other_sources')(rawPersona);
            const purchase_objections = this.valueFrom(columns)('purchase_objections')(rawPersona);
            const purchase_role = this.valueFrom(columns)('purchase_role')(rawPersona);
            return new Persona(id, goalId, avatar)
                .withGeneralInfo(firstName, lastName, age, gender)
                .withOtherInfo(marital_status, children, location, quote, job_title, annual_income, education_level, other_info)
                .withInformationSources(books, magazines, blogs, gurus, other_sources)
                .withPurchaseProcess(purchase_objections, purchase_role);
        };
    }

    static convertCoreProblem(rawCoreProblem) {
        return (columns) => {
            const id = this.valueFrom(columns)("id")(rawCoreProblem);
            const persona_id = this.valueFrom(columns)("persona_id")(rawCoreProblem);
            const core_goals = this.valueFrom(columns)("core_goals")(rawCoreProblem);
            const core_values = this.valueFrom(columns)("core_values")(rawCoreProblem);
            const core_challenges = this.valueFrom(columns)("core_challenges")(rawCoreProblem);
            const pain_point_1 = this.valueFrom(columns)("pain_point_1")(rawCoreProblem);
            const pain_point_2 = this.valueFrom(columns)("pain_point_2")(rawCoreProblem);
            const pain_point_3 = this.valueFrom(columns)("pain_point_3")(rawCoreProblem);
            const solution_1 = this.valueFrom(columns)("solution_1")(rawCoreProblem);
            const solution_2 = this.valueFrom(columns)("solution_2")(rawCoreProblem);
            const solution_3 = this.valueFrom(columns)("solution_3")(rawCoreProblem);
            const sell = this.valueFrom(columns)("sell")(rawCoreProblem);
            return {
                id,
                persona_id,
                goals: core_goals,
                values: core_values,
                challenges: core_challenges,
                painPoints: [pain_point_1, pain_point_2, pain_point_3],
                solutions: [solution_1, solution_2, solution_3],
            };
        };
    }

    static convertSalesCanvas(rawSalesCanvas) {
        return (columns) => {
            const id = this.valueFrom(columns)("id")(rawSalesCanvas);
            const persona_id = this.valueFrom(columns)("persona_id")(rawSalesCanvas);
            const trigger = this.valueFrom(columns)("trigger")(rawSalesCanvas);
            const action = this.valueFrom(columns)("action")(rawSalesCanvas);
            const conversation = this.valueFrom(columns)("conversation")(rawSalesCanvas);
            const sell = this.valueFrom(columns)("sell")(rawSalesCanvas);
            return { id, persona_id, trigger, action, conversation, sell };
        };
    }

}