import _ from 'lodash';
import axios from 'axios';

export default class AbstractCrudService {
    constructor(tableName) {
        this.api = process.env.REACT_APP_DB_API;
        this.tableName = tableName;
    }

    get apiUrl() {
        return `${this.api}/${this.tableName}`;
    }

    static valueFrom(columnList) {
        return (fieldName) => {
            const index = columnList.indexOf(fieldName);
            return (rawGoal) => rawGoal[index];
        }
    }

    async fetchByField(fieldName, value) {
        const response = await axios.get(`${this.apiUrl}?filter=${fieldName},eq,${value}`);
        const responseList = _.get(response, `data.${this.tableName}.records`, []);
        const columnList = _.get(response, `data.${this.tableName}.columns`, []);
        return { list: responseList, columns: columnList };
    }

    async fetchByFields(fieldMap) {
        const queryString = _.chain(fieldMap).map((value, key) => `filter[]=${key},eq,${value}`).join('&').value();
        const response = await axios.get(`${this.apiUrl}?${queryString}&satisfy=all`);
        const responseList = _.get(response, `data.${this.tableName}.records`, []);
        const columnList = _.get(response, `data.${this.tableName}.columns`, []);
        return { list: responseList, columns: columnList };        
    }
}