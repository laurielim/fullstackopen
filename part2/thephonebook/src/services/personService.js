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

const deleteContact = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .catch(e => console.log(e))
}

export { getAll, createContact, deleteContact }