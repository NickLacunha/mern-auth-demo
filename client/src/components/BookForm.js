import React, { useRef } from "react";
import { ADD_BOOK } from "../util/actions";
import { postBook } from "../util/api";
import { useBookContext } from "../util/GlobalState";

function BookForm(props) {
    const titleRef = useRef();
    const authorRef = useRef();
    const synopsisRef = useRef();
    const formRef = useRef();

    const [_, dispatch] = useBookContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        const book = {
            title: titleRef.current.value,
            author: authorRef.current.value,
            synopsis: synopsisRef.current.value
        };

        postBook(book)
            .then(response => {
                console.log(response);
                dispatch({
                    type: ADD_BOOK,
                    book: response.data
                });

                formRef.current.reset();

            }).catch(error => {
                // setErrorMessage();
                console.error(error);
            });
    }

    return (
        <form ref={formRef}>
            <input className="form-control" type="text" name="title" ref={titleRef} placeholder="Title" />
            <input className="form-control" type="text" name="author" ref={authorRef} placeholder="Author" />
            <textarea className="form-control" name="synopsis" ref={synopsisRef} placeholder="Enter a synopsis"></textarea>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit!</button>
        </form>
    );
}

export default BookForm