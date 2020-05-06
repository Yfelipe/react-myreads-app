import React, { Component } from "react";
import ShelfGen from "./ShelfGen";
import PropTypes from "prop-types";


export default class CurrentBook extends Component {
    static propTypes = {
        currentBooks: PropTypes.array.isRequired,
        update: PropTypes.func.isRequired

    };
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.currentBooks.length !== 0 ? <ShelfGen update={this.props.update} books={this.props.currentBooks}/> : <h2>No books on shelf!</h2>}
                    </ol>
                </div>
            </div>
        )
    }

}