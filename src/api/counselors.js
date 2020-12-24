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
