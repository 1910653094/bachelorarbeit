const token = sessionStorage.getItem('token');
const email = sessionStorage.getItem('email');
let auth = { token, email };

const setAuth = (email, token) => {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('token', token);

    auth = { email, token };
};
const logout = () => {
    sessionStorage.clear();
    auth = { email: '', token: '' };
};

export { auth, setAuth, logout };
