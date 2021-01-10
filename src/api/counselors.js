import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexCounselors = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/counselors/',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const createCounselors = (counselor, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/counselors/',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { counselor }
  })
}

export const showCounselor = (counselorId, user) => {
  return axios({
    url: apiUrl + '/counselors/' + counselorId,
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const deleteCounselor = (id, user) => {
  return axios({
    url: apiUrl + '/counselors/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const updateCounselor = (id, counselor, user) => {
  return axios({
    url: apiUrl + '/counselors/' + id + '/',
    method: 'PATCH',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: { counselor }
  })
}
