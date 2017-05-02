import React, { Component } from 'react';
import './App.css';
const fetch = require('isomorphic-fetch');

class SearchBody extends Component {
	render() {
		return(
			<div>
			{
	          this.props.data.response === "True"? 
	            <div className="col-xs-12 search-body">
	              <div className="col-xs-12 col-md-8 col-md-push-4 col-lg-7 col-lg-push-5 search-details">
	                <h2>{this.props.data.title}</h2>
	                <p>{this.props.data.plot}</p>
	                <div className="more-details">
	                  <div className="genres">
	                    <h4>Genres</h4>
	                    {this.props.data.genreList}
	                  </div>
	                  <div className="actors">
	                    <h4>Actors</h4>
	                    <div>{this.props.data.actors}</div>
	                  </div>
	                  <div className="row release-details">
	                    <div className="col-xs-6"> <span className="details-label">Original Release</span>: <span className="meta-data">{this.props.data.released}</span></div>
	                    <div className="col-xs-6"> <span className="details-label">Running Time</span>: <span className="meta-data">{this.props.data.runtime}</span> </div>
	                    <div className="col-xs-6"> <span className="details-label">Box Office</span>: <span className="meta-data">{this.props.data.boxOffice}</span></div>
	                    <div className="col-xs-6"> <span className="details-label">Votes</span>: <span className="meta-data">{this.props.data.votes}</span></div>
	                  </div>
	                </div>
	              </div>
	              <div className="col-xs-12 col-md-4 col-md-pull-8 col-lg-5 col-lg-pull-7 poster-container">
	                <img src={this.props.data.poster_url} className="poster" alt="" />
	              </div>
	            </div>
	            : 
	            <div className="not-found">
	              {this.props.data.response === "False"? <h3>No Record Found</h3> : null}
	            </div>
	        }
	        </div>
		);
	}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
      defaultUrl: 'http://www.omdbapi.com/?t=arrival'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  	this.fetchApiData(this.state.defaultUrl);
  }

  fetchApiData(url){
  	fetch(url) 
      .then((result) => {
        return result.json()
      })
      .then((json) => {
        if(json.Response === "True"){
        this.setState({
          title: json.Title,
          year: json.Year,
          released: json.Released,
          runtime: json.Runtime,
          genreList: json.Genre,
          actors: json.Actors,
          plot: json.Plot,
          poster_url: json.Poster,
          rating: json.imdbRating,
          boxOffice: json.BoxOffice,
          votes: json.imdbVotes,
          response: json.Response
        });
        }
        else {
          this.setState({
            response: json.Response,
            error: json.Error
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleSubmit(event){
    event.preventDefault();
    this.fetchApiData(`http://www.omdbapi.com/?t=${this.state.searchTitle}`);
  }

  handleChange(event){
    this.setState({
      searchTitle: event.target.value
    });
  }

  render() {
    return (
      <div className="row">
      	<div className="col-xs-12 col-lg-10 col-lg-offset-1">
	        <div className="App-header col-xs-12">
	          <div className="row">
	            <div className="col-xs-12 col-sm-6 col-lg-5">
	              <h1><a href="http://www.omdbapi.com/" className="omdb-link" title="The Open Movie Database">OMDb</a></h1>
	            </div>
	            <div className="col-xs-12 col-sm-6 col-lg-7">
	              <form onSubmit={this.handleSubmit} className="search-box">
	                <input className="form-control search-input-box" type="text" value={this.state.searchTitle} onChange={this.handleChange} placeholder='Search Title' />
	              </form>
	            </div>
	          </div>
	        </div>
	        <SearchBody data={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
