import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res => res.data)
        .catch(e => console.log(e))
  }

const createContact = newContact => {
    return axios
        .post(baseUrl, newContact)
        .then(res => res.data)
        .catch(e => console.log(e))

}

const deleteContact = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .catch(e => console.log(e))
}

const updateContact = (id, newContact) => {
    return axios
        .put(`${baseUrl}/${id}`, newContact)
        .then(res => res.data)
        .catch(e => console.log(e))

}

export { getAll, createContact, deleteContact, updateContact }