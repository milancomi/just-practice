import React,{Component} from 'react';
import logo from './logo.svg';
import logo2 from  './logo512.png';
// import './App.css';  
import { render } from '@testing-library/react';
import list from './list.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col,Grid, FormGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
//  import {
//   DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH
// } from './constant/index' moze i ovako

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

// `` OVI NAVODNICI KORISTE ZA URL  

// const url = PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + DEFAULT_QUERY;
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`
console.log(url);


// HIGH ORDER Function
function isSearched(searchTerm){
  return function(item){ 
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      // list:list, // kada objekat properti i variabla imaju isti naziv, moze samo jedno
      // list, ubacujemo api
      result: null,
      searchTerm: DEFAULT_QUERY,
      isLoading: false,

    }

     // FUNKCIJA MORA DA SE BINDUJE DA BI JE VIDEO COMPONENTA I VDOM
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  setTopStories(result){
    this.setState({result:result,isLoading:false})
  }

  fetchTopStories(searchTerm){

    this.setState({ isLoading:true});

   fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
   .then(response => response.json())
   .then(result => this.setTopStories(result))
   .catch(e =>e);
  }

componentDidMount(){
 this.fetchTopStories(this.state.searchTerm); 

}

onSubmit(event){
  this.fetchTopStories(this.state.searchTerm);
  event.preventDefault();
}


removeItem(id){
  const {result} = this.state;
  const isNotId = item => item.objectID !==id;
  const updatedList = result.hits.filter(isNotId);
  // this.setState({ result: Object.assign({},this.state.result,{hits: updatedList})});
  this.setState({ result:{...result, hits: updatedList},isLoading:false});

}

searchValue(event){
  // console.log(event)
  this.setState({ searchTerm: event.target.value});
}

// searchValue(event){
//   console.log(event)
// }   KAO e, proveravam object metode



  render(){
    const {result,searchTerm, isLoading} = this.state;
    // da ne bih ponavljao dole vec zamo pozovem
    console.log(this);
    if(!result){
      return null;
    }
      return ( 
      <div >

<Container fluid>
    <div className="jumbotron text-center">
      <Search
        onChange = {this.searchValue}
        onSubmit={ this.onSubmit}
        value = {searchTerm}>Pretraga : 
      </Search>
          {/* <Search>children* ako hocu vrednos koja je ovde upisana</Search> */}
    </div>
</Container>

{ isLoading ? <Loading/> :
    <Container>
      <div className="bg-success">
        <h4>Status: </h4>
        <h1>Podaci učitani :)</h1>
        <hr style={{border: '2px solid black', width:'100%'}}></hr>
      </div>
    </Container>
}
  

{ result &&  //prevencija da ne pukne zbog praznog querija 
<Container>
    <div className=""> 
    <Table
    list={ result.hits }
    searchTerm={ searchTerm }
    removeItem={ this.removeItem }
    />
     </div>
  
  </Container>
  }
    </div>
  
  );
}
}

class Search extends Component {
  componentDidMount(){
    this.input.focus();
  }

  render(){
    const { onChange, value, children,onSubmit } = this.props;
    return(
<form onSubmit={onSubmit}>
  <FormGroup> 
    <h1 style={{fontWeight: 'bold'}}>{children}</h1>
     <hr style={{border: '2px solid black', width:'100px'}}></hr>
<div className="input-group">
<input
className="form-control searchForm"
 type="text"
  onChange={onChange}
   value={ value }
   ref={(node) =>{this.input = node}}
  //  ovo ne razumem bas 
   />
   <span className="input-group-btn">
     <button className="btn btn-primary searchBtn" type="submit">
       Search
     </button>
     </span>

   </div>
   </FormGroup>
</form> 
    )
  }
}
 


const Button = ({onClick,children,className=''}) =>
    <button
    className={className}
    onClick={onClick}>
      { children } 
   </button>

Button.propTypes = {
  onClick:PropTypes.func.isRequired,
  className:PropTypes.string,
  childred: PropTypes.node.isRequired,
}

Button.defaultProps = {
  className:'',
}
//  VALIDACIJA KOJA MOZE
// PropTypes.array
// PropTypes.bool
// PropTypes.func
// PropTypes.number
// PropTypes.object
// PropTypes.string


const Table = ( {list, searchTerm, removeItem})=> {
  return(
    <div className="col-sm-10 col-sm-offset-1">
    {
    list.filter(isSearched(searchTerm)).map(item =>
      <div key={ item.objectID}>
          <h1> <a href="www.google.com">{ item.title }</a> </h1> 
          <h4>Autor: {item.author }  {item.relevancy_score } Komentara || {item.points} || Lajkova || 
          <Button
          className="btn btn-success btn-xs"
          type="button"
          onClick={ () => removeItem(item.objectID)}>
            Obrisi
          </Button></h4>
          <hr/>
      </div>
          )
      }
    </div>

  )

}
Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments:PropTypes.number,
      points:PropTypes.number,
    })

  ).isRequired,
  removeItem: PropTypes.isRequired,
}
// validacija

const Loading = () =>
<Container>
  <div className="bg-warning">
    <h4>Status: </h4>
    <h1>Loading . . .</h1>
  </div>
</Container>


export default App;
