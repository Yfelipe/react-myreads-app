import React, { Component } from "react";
import ShelfGen from "./ShelfGen";
import PropTypes from "prop-types";


export default class ReadBook extends Component {
    static propTypes = {
        readBooks: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired

    };
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.readBooks.length !== 0 ? <ShelfGen update={this.props.update} books={this.props.readBooks}/> : <h2>No books on shelf!</h2>}
                    </ol>
                </div>
            </div>
        )
    }

}