import { createStore } from 'vuex';
import user from './modules/auth';
import createPersistedState from "vuex-persistedstate";
const store = createStore({
    modules: {
        user,
    },
    plugins: [createPersistedState()],
});
export default store;
//# sourceMappingURL=index.js.map