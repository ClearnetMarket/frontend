
const user = localStorage.getItem('auth_user');

const initialState = user ?
  {
    status: {
      loggedIn: true
    },
    user
  } :
  {
    status: {
      loggedIn: false
    },
    user: null
  };

export const auth = {
  state: initialState,
  getters: {
    user: (state: any) => {
      return state.user;
    }
  },
  actions: {
    user (context: any, user: any) {
      context.commit('user', user);
    }
  },
  mutations: {
    user (state: any, user: any) {
      state.user = user;
      state.status.loggedIn = true;
    },
    LogOut (state: any) {
      state.user = null
      state.status.loggedIn = false;
    },
    loginSuccess (state: any, user: any) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure (state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout (state: any) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess (state: any) {
      state.status.loggedIn = false;
    },
    registerFailure (state: any) {
      state.status.loggedIn = false;
    }
  },


}

export default auth;
