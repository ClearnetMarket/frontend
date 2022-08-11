export declare const auth: {
    state: {
        status: {
            loggedIn: boolean;
        };
        user: string;
    };
    getters: {
        user: (state: any) => any;
    };
    actions: {
        user(context: any, user: any): void;
    };
    mutations: {
        user(state: any, user: any): void;
        LogOut(state: any): void;
        loginSuccess(state: any, user: any): void;
        loginFailure(state: any): void;
        logout(state: any): void;
        registerSuccess(state: any): void;
        registerFailure(state: any): void;
    };
};
export default auth;
