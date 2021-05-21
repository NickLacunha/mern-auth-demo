import React, { useEffect } from "react";
import "./Home.css";
import { getBooks } from "../util/api";
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { useBookContext } from "../util/GlobalState";
import { ERROR, LOAD_BOOKS } from "../util/actions";
import { STATES } from "mongoose";

function Home() {
  const [state, dispatch] = useBookContext();

  const loadBooks = () => {
    getBooks()
      .then(response => {
        dispatch({
          type: LOAD_BOOKS,
          books: response.data
        })
      })
      .catch(error => {
        dispatch({
          type: ERROR
        })
        console.error(error);
      })
  }

  useEffect(() => {
    loadBooks()
  }, [])

  console.log(state)

  return (
    <div>
      {state.user.user_id ? <h1>You're logged in!</h1> : <h1>You're not logged in!</h1>}
      <div className="container">
        <div className="row">
          <div className="col">
            <BookForm />
          </div>
          <div className="col">
            <BookList />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
