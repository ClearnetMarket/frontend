export default function authHeader() {
    let user_token = localStorage.getItem('auth_user');
    let auth_token = localStorage.getItem('auth_token');
    if (user_token && auth_token) {
        return { 'Authorization': 'bearer ' + auth_token };
    }
    else {
        return { 'Authorization': null };
    }
}
//# sourceMappingURL=auth.header.js.map