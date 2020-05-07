import React, { Component } from "react";
import ShelfGen from "./ShelfGen";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import _ from "lodash";

export default class SearchBook extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            showBooks: false,
            noneFound: false,
            booksShelf: [],
            queryBooks: []
        };
        this.handleSearch = _.debounce(this.handleSearch, 650);
    }

    static propTypes = {
        onBack: PropTypes.func.isRequired
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then((response) =>{
                for (let book of response){
                    this.state.booksShelf.push([book.id,book.shelf]);
                }
            })
    }

    handleSearch(query){
        this.setState({query: query.trim()});
        BooksAPI.search(query.trim())
            .then((response) => {
                if (!response || response.error === "empty query" ){
                    this.setState({showBooks: false});
                    this.setState({noneFound: true});
                }else {
                    this.setState({queryBooks: response});
                    this.setState({noneFound: false});
                    this.setState({showBooks: true});
                }
            }).catch((e) => console.log(e))
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={this.props.onBack}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(e) => this.handleSearch(e.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.showBooks && (
                            <ShelfGen booksShelf={this.state.booksShelf} books={this.state.queryBooks}/>)
                        }
                        {this.state.noneFound && this.state.query && (
                            <p>No Books Found!</p>)
                        }
                    </ol>
                </div>
            </div>
        )
    }

}