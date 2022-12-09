import axios from 'axios'
const baseUrl = '/api/persons'

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
}

const updateContact = (id, newContact) => {
    return axios
        .put(`${baseUrl}/${id}`, newContact)
        .then(res => res.data)

}

export { getAll, createContact, deleteContact, updateContact }