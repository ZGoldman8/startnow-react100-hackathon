import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            author: "",
            rows: [],
            recommended: [],
            tempTitle: []
        }
        this.searchTextChange = this.searchTextChange.bind(this)
        this.authorTextChange = this.authorTextChange.bind(this)
        this.searchBook = this.searchBook.bind(this)
        this.postData = this.postData.bind(this)
    }

    searchTextChange(event) {
        this.setState({ title: event.target.value })
    }

    authorTextChange(event) {
        this.setState({ author: event.target.value })
    }

    postData() {
        var tempTitle = [];

        return (
            this.state.rows.map((row, index) => (
                <tr key={row.id}>
                    <td key={row.id}><img src={row.cover} /></td>
                    <td key={row.id}>{row.title}{tempTitle.push(row.title)}</td>
                    <td key={row.id}>{row.authors}</td>
                    <td key={row.id}>{row.description}</td>
                    <td key={row.id}>{row.pageCount}</td>
                    <td key={row.id}>{row.publishedDate}</td>
                    <td key={row.id}>{row.recommended}</td>
                </tr>
            ))
        )
    }

    searchBook() {
        var that = this;
        //Title and author
        if (this.state.title.length > 0 && this.state.author.length > 0) {
            var tempArray = [];
            fetch("http://localhost:3000/search/" + this.state.title + "+inauthor:" + this.state.author, {
                method: "GET"
            })
                .then(res => res.json())
                .then(function (data) {
                    for (let i = 0; i < 3; i++) {
                        let objPairs = {};
                        objPairs.cover = data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.smallThumbnail : 'http://placehold.it//200x200';
                        objPairs.title = data.items[i].volumeInfo.title; //Use this to search Walmart
                        objPairs.description = data.items[i].volumeInfo.description;
                        objPairs.authors = data.items[i].volumeInfo.authors;
                        objPairs.publishedDate = data.items[i].volumeInfo.publishedDate;
                        objPairs.pageCount = data.items[i].volumeInfo.pageCount;
                        axios.get("/recommended/" + objPairs.title)
                        .then(function (data) {
                            console.log(objPairs);
                            objPairs.recommended = data.data;
                            tempArray.push(objPairs);
                            that.setState({ rows: tempArray })
                        })
                    };
                })
        }
        //Title but no author
        if (this.state.title.length > 0 && this.state.author.length == 0) {
            var tempArray = [];
            fetch("http://localhost:3000/search/" + this.state.title, {
                method: "GET"
            })
                .then(res => res.json())
                .then(function (data) {
                    for (let i = 0; i < 3; i++) {
                        let objPairs = {};
                        objPairs.cover = data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.smallThumbnail : 'http://placehold.it//200x200';
                        objPairs.title = data.items[i].volumeInfo.title; //Use this to search Walmart
                        objPairs.description = data.items[i].volumeInfo.description;
                        objPairs.authors = data.items[i].volumeInfo.authors;
                        objPairs.publishedDate = data.items[i].volumeInfo.publishedDate;
                        objPairs.pageCount = data.items[i].volumeInfo.pageCount;
                        axios.get("/recommended/" + objPairs.title)
                        .then(function (data) {
                            console.log(objPairs);
                            objPairs.recommended = data.data;
                            tempArray.push(objPairs);
                            that.setState({ rows: tempArray })
                        })
                    };
                })
        }
        //Author but no title
        if (this.state.title.length == 0 && this.state.author.length > 0) {
            var tempArray = [];
            fetch("http://localhost:3000/search/inauthor:" + this.state.author, {
                method: "GET"
            })
                .then(res => res.json())
                .then(function (data) {
                    for (let i = 0; i < 3; i++) {
                        let objPairs = {};
                        objPairs.cover = data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.smallThumbnail : 'http://placehold.it//200x200';
                        objPairs.title = data.items[i].volumeInfo.title; //Use this to search Walmart
                        objPairs.description = data.items[i].volumeInfo.description;
                        objPairs.authors = data.items[i].volumeInfo.authors;
                        objPairs.publishedDate = data.items[i].volumeInfo.publishedDate;
                        objPairs.pageCount = data.items[i].volumeInfo.pageCount;
                        axios.get("/recommended/" + objPairs.title)
                        .then(function (data) {
                            console.log(objPairs);
                            objPairs.recommended = data.data;
                            tempArray.push(objPairs);
                            that.setState({ rows: tempArray })
                        })
                    };
                })
        }
    }

    render() {
        return (
            <div>
                <div id="bookfinder">
                    <h1>Zach's Book Hackathon</h1>
                    <input onChange={this.searchTextChange} id="searchBook" placeholder="Book Title"></input><br /><br />
                    <input onChange={this.authorTextChange} id="authorBook" placeholder="Author Name"></input>
                    <br /><br /><button onClick={this.searchBook}>Find book!!</button><br /><br />
                </div><br /><br />
                <table id="table">
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Book Title</th>
                            <th>Author(s)</th>
                            <th>Description</th>
                            <th>Page Count</th>
                            <th>Published Date</th>
                            <th>Similar Title You May Like</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.postData()}
                    </tbody>
                </table>
            </div>
        );
    }
}
