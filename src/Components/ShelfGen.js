import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

export default class ShelfGen extends Component {
    constructor(props) {
        super(props);
        this.sendUpdate = this.sendUpdate.bind(this);
    }

    static propTypes = {
        books: PropTypes.array.isRequired
    };

    sendUpdate(book, shelf){
        if (this.props.update){
            this.props.update(book, shelf);
        }else {
            BooksAPI.update(book, shelf)
                .then(() => window.location.assign("/"))
        }

    }

    runGen() {
        let bookList = [];
        const {books} = this.props;

        books.map((book) => {
            bookList.push(
                <li key={book.id} className="shelf-item">
                    <div className="book">
                        <div className="book-top">

                            {/*applied a check due to there being some books with no image*/}
                            {book.imageLinks ? <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}/> :
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: "url(http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api)"
                                }}/>}

                            <div className="book-shelf-changer">
                                <select
                                    id="shelfs"
                                    onChange={(event) => this.sendUpdate(book.id, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option hidden/>
                                    <option value="currentlyReading"
                                            disabled={book.shelf === "currentlyReading"}>Currently Reading
                                    </option>
                                    <option value="wantToRead" disabled={book.shelf === "wantToRead"}>Want to Read
                                    </option>
                                    <option value="read" disabled={book.shelf === "read"}>Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            );
            return null;
        });
        return bookList;
    }

    runSearchGen() {
        let bookList = [];
        const {books, booksShelf} = this.props;

        books.map((book) => {
            // eslint-disable-next-line
            booksShelf.map((inShelf) => {
                if (inShelf[0] === book.id){
                    window.bookshelf = inShelf[1];
                }
            });
            bookList.push(
                <li key={book.id} className="shelf-item">
                    <div className="book">
                        <div className="book-top">
                            {book.imageLinks ? <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}/> :
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: "url(http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api)"
                                }}/>}

                            <div className="book-shelf-changer">
                                <select
                                    id="shelfs"
                                    onChange={(event) => this.sendUpdate(book.id, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option hidden/>
                                    <option value="currentlyReading"
                                            disabled={window.bookshelf === "currentlyReading"}>Currently Reading
                                    </option>
                                    <option value="wantToRead" disabled={window.bookshelf === "wantToRead"}>Want to Read
                                    </option>
                                    <option value="read" disabled={window.bookshelf === "read"}>Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            );
            window.bookshelf = "";
            return null;
        });
        return bookList;
    }

    render(){
            return (
                this.props.booksShelf ? this.runSearchGen(): this.runGen()
            )
    }
}
