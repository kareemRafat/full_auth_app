
import Cookie from 'js-cookie';
import axios from 'axios'

const csrfCookie = async () => {

  let token = Cookie.get("XSRF-TOKEN");

  if (token) {
    return new Promise(resolve  => {
      resolve(token)
    })
  }

  return axios.get('sanctum/csrf-cookie')

}

export default csrfCookie ;