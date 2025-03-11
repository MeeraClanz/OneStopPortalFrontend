import { action, thunk, persist, computed } from "easy-peasy";
import { UserService } from "../service/UserService";

let userService = new UserService();

const loginModel = {
  user: userService.getUser() || null,
  session: null,
  emailVerificationResponse: null,

  isLoggedIn: computed((state) => state.user != null),
  setUser: action((state, payload) => {
    userService.setUser(payload);
    state.user = payload;
    // console.log(payload);
    localStorage.setItem("e-portal-access-token", payload.token);
    // console.log(localStorage.getItem("e-portal-access-token"));
  }),
  logOut: action((state, payload) => {
    userService.resetUser();
    state.user = null;
    // console.log(payload);
    localStorage.removeItem("e-portal-access-token");
    // console.log(localStorage.getItem("e-portal-access-token"));
  }),
  setSession: action((state, payload) => {
    state.session = payload;
  }),

  setEmailVerificationResponse: action((state, payload) => {
    state.emailVerificationResponse = payload;
  }),
};
export default loginModel;
