import React from 'react';
import { useBookContext } from '../util/GlobalState';

function BookList(props) {
    const [state, _] = useBookContext();
    return (
        <ul>
            {state.books.length ? state.books.map(book => (
                <li key={book._id}>
                    <div className="card mb-2">
                        <div className="card-header">
                            {book.title} by {book.author}
                        </div>
                        <div className="card-body">
                            {book.synopsis}
                        </div>
                    </div>
                </li>
            )) : (
                <p>No books to display. Read more!</p>
            )
            }
        </ul>
    )
}

export default BookList;