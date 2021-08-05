import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
  }

const createContact = newContact => {
    return axios
        .post(baseUrl, newContact)
        .then(res => res.data)

}

export { getAll, createContact }