import React from 'react';

export default class App extends React.Component {
    constructor(props) {
     super(props)
     this.state = {
         title: "",
         author: ""
     }
     this.searchTextChange = this.searchTextChange.bind(this)
     this.authorTextChange = this.authorTextChange.bind(this)
    }
    
    searchTextChange (event) {
        this.setState({ title: event.target.value }, () => {console.log(this.state)})
        ajax.get{
            data: {
                q: {this.state.title}
            }
            success( response ){
                setState: {}
            }
        }


    authorTextChange (event) {
        this.setState({ author: event.target.value }, () => {console.log(this.state)})
        }

    searchBook () {
        if (this.state.author.length > 0 && this.state.title.length > 0)
        return (
              "http://localhost:3000/search:" + this.state.title + "+inauthor:" + this.state.author
        )

        else if (this.state.author.length > 0 && this.state.title.length == 0)
        return (
              "http://localhost:3000/search:inauthor:" + this.state.author
        )

        else if (this.state.author.length == 0 && this.state.title.length > 0)
        return (
             "http://localhost:3000/search:" + this.state.title
        )
    }

     render() {
         return (
         <div>
            <h1>Zach's Book Hackathon</h1>
            <input onChange={this.searchTextChange} id="searchBook" placeholder="Book Title"></input><br /><br />
            <input onChange={this.authorTextChange} id="authorBook" placeholder="Author Name"></input>
                <a href={this.searchBook()}><br /><br /><button>Find book!</button></a>
         </div>
         );
     }
}
