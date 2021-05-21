import axios from 'axios'

const postBook = (book) => axios.post("/api/books/", book)
const getBooks = () => axios.get("/api/books");

const signup = (user) => axios.post("/api/users/", user);
const login = (user) => axios.post("/api/users/login", user);
const logout = () => axios.post("/api/users/logout")
const authenticatedUser = () => axios.get("/api/users/authenticatedUser");

export {
    postBook,
    getBooks,
    signup,
    login,
    logout,
    authenticatedUser
}