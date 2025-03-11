// const API_URL = "http://43.205.242.128:2001/"
const API_URL = "http://localhost:2000/";
//const API_URL = "https://agaramapi.clanizon.com/";
const BASE_URL_AUTH = API_URL + "api/auth/";

const BASE_URL = API_URL + "api/";

const constants = {
  URL: {
    SIGNIN: BASE_URL + "signIn",
    USER: BASE_URL + "user",

    GOOGLESIGNIN: BASE_URL + "googleSignIn",
  },
};
export default constants;
