import  React,{ Component } from "react";
import CurrentBook from "./CurrentBook";
import WantBook from "./WantBook";
import ReadBook from "./ReadBook";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

export default class BookShelf extends Component{
    constructor(props) {
        super(props);
        this.updateBook = this.updateBook.bind(this);
        this.state = {
            currentlyReading: [],
            wantToRead: [],
            read: [],
            loadDone: false
        };
    }



    componentDidMount() {
        this.getAll();
    }


    getAll(){
        BooksAPI.getAll()
            .then((response) =>{
                //console.log(typeof response);
                for (let book of response){
                    if (book.shelf === "currentlyReading"){
                        this.setState((prevState) => ({
                            ...prevState,
                            currentlyReading: [...prevState.currentlyReading, book]
                        }));
                        //this.state.currentlyReading.push(book);
                    } else if (book.shelf === "wantToRead") {
                        this.state.wantToRead.push(book);
                    } else if (book.shelf === "read") {
                        this.state.read.push(book);
                    }
                }
            }).then(() => this.setState({loadDone: true}))
    }

    cleanShelf(book){
        this.setState({currentlyReading: this.state.currentlyReading.filter(function(obook) {
                return obook.id !== book
            })});
        this.setState({wantToRead: this.state.wantToRead.filter(function(obook) {
                return obook.id !== book
            })});
        this.setState({read: this.state.read.filter(function(obook) {
                return obook.id !== book
            })});
    }

    updateBook(book, shelf){

        this.cleanShelf(book);

        BooksAPI.update(book, shelf)
            .then(() => {
                BooksAPI.get(book)
                    .then((nbook) =>{
                        if (nbook.shelf === "currentlyReading"){
                            this.setState({currentlyReading: this.state.currentlyReading.concat(nbook)});
                        } else if (nbook.shelf === "wantToRead") {
                            this.setState({wantToRead: this.state.wantToRead.concat(nbook)});
                        } else if (nbook.shelf === "read") {
                            this.setState({read: this.state.read.concat(nbook)});
                        }
                    })
            });

    }

    render() {
        if (!this.state.loadDone){
            return(
                <div className="loader-div">
                    <div className="loader"></div>
                </div>
            )
        } else{
            return(
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <CurrentBook update={this.updateBook} currentBooks={this.state.currentlyReading}/>
                            <WantBook update={this.updateBook} wantBooks={this.state.wantToRead}/>
                            <ReadBook update={this.updateBook} readBooks={this.state.read}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button type="button">Add a book</button>
                        </Link>
                    </div>
                </div>
            )
        }
    }

}