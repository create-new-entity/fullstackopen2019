import axios from 'axios';

let dbURL = "http://localhost:3001/api/persons";

const getDBData = () => {
    return axios
            .get(dbURL)
            .then((response) => response.data );
}

const updateDBData = (id, personObj) => {
    return axios
            .put(dbURL+`/${id}`, personObj)
            .then((response) => response.data);
};

const createDBData = (personObj) => {
    return axios
            .post(dbURL, personObj)
            .then((response) => response.data);
};

const deleteDBData = (id) => {
    return axios
            .delete(dbURL + `/${id}`)
            .then((response) => response.data);
}

export default {
    getDBData,
    updateDBData,
    createDBData,
    deleteDBData
};