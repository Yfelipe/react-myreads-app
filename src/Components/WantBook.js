import React, { Component } from "react";
import ShelfGen from "./ShelfGen";
import PropTypes from "prop-types";


export default class WantBook extends Component {
    static propTypes = {
        wantBooks: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired

    };
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.wantBooks.length !== 0 ? <ShelfGen update={this.props.update} books={this.props.wantBooks}/> : <h2>No books on shelf!</h2>}
                    </ol>
                </div>
            </div>
        )
    }

}