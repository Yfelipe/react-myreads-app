import React from 'react'
import SearchBook from "./Components/SearchBook";
import BookShelf from "./Components/BookShelf";
import { Route } from "react-router-dom";
import './App.css'


class BooksApp extends React.Component {
    render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) => (
            <SearchBook
                onBack={() => {
                    history.push('/');
                }}
            />
        )}/>

        <Route exact path="/" render={() => (
            <BookShelf/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
