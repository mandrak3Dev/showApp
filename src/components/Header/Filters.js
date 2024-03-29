import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadGenres, loadMovies } from '../../actionCreators';

class Searchbar extends Component {

  constructor(props){
    super(props);
    this.state = {
      genre: "elija",
      year: "elija"
    }
  }

  componentDidMount(){
    this.props.loadGenres(this.props.type);
    this.handleYears();
  }

  handleYears = () => {
    for(let i = 1990; i <= 2019; i++){
      let node = document.createElement('option');
      let textnode = document.createTextNode(i);
      node.appendChild(textnode);   
      document.querySelector("#years").appendChild(node);
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });

    let index = event.target.selectedIndex;
    let id = event.target.childNodes[index].getAttribute('data-id');
    this.props.loadMovies(id, this.props.type, this.state.year);    
  }

  render() {
    return (
      <div className="filterContainer container">
        <div className="filterWrapper">
          <p>Año</p>
          <div className="customSelect">
            <select name="year" id="years" value={this.state.year} onChange={this.handleChange}>
              <option disabled value='elija'>Elija...</option>
            </select>
            <i className="fas fa-angle-down"></i>
          </div>
        </div>
        <div className="filterWrapper">
          <p>Género</p>
          <div className="customSelect">
            <select name="genre" value={this.state.genre} onChange={this.handleChange}>
              <option disabled value='elija'>Elija...</option>
              {this.props.genres.map((genre, index) => 
                <option data-id={genre.id} key={index}>{genre.name}</option>
              )}
            </select>
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genres,
  type: state.type
});
    
const mapDispatchToProps = {  
  loadGenres,
  loadMovies
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
