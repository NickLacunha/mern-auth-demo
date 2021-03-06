import React, { createContext, useReducer, useContext } from 'react';
import {
    LOAD_BOOKS,
    ADD_BOOK,
    LOGIN,
    LOGOUT,
    ERROR,
    CLOSE_ALERT
} from "./actions"

const BookContext = createContext();
const { Provider } = BookContext;

const reducer = (state, action) => {
    switch (action.type) {
        case LOAD_BOOKS:
            return {
                ...state,
                books: action.books,
            }
        case ADD_BOOK:
            return {
                ...state,
                books: [action.book, ...state.books],
                alertOpen: true,
                alertMessage: "Book added successfully!"
            }
        case ERROR:
            return {
                ...state,
                alertOpen: true,
                alertMessage: "Error occurred :("
            }
        case CLOSE_ALERT:
            return {
                ...state,
                alertOpen: false,
                alertMessage: ""
            }
        case LOGIN:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
}

const BookProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        books: [],
        user: {},
        alertOpen: false,
        alertMessage: ""
    })

    return <Provider value={[state, dispatch]} {...props} />
}

const useBookContext = () => {
    return useContext(BookContext);
}

export { BookProvider, useBookContext }