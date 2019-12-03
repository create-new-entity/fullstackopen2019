import axios from 'axios';

let dbURL = "/api/persons";

const getDBData = () => {
    return axios
            .get(dbURL)
            .then((response) => response.data )
            .catch((error) => error.response.data);
}

const updateDBData = (id, personObj) => {
    return axios
            .put(dbURL+`/${id}`, personObj)
            .then((response) => response.data)
            .catch((error) => error.response.data);
};

const createDBData = (personObj) => {
    return axios
            .post(dbURL, personObj)
            .then((response) => response.data)
            .catch((error) => error.response.data);
};

const deleteDBData = (id) => {
    return axios
            .delete(dbURL + `/${id}`)
            .then((response) => response.data)
            .catch((error) => error.response.data);
}


export default {
    getDBData,
    updateDBData,
    createDBData,
    deleteDBData
};