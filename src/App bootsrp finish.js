import React,{Component} from 'react';
import logo from './logo.svg';
import logo2 from  './logo512.png';
// import './App.css';  
import { render } from '@testing-library/react';
import list from './list.js';
// import {Container, Row, Col} from 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container, Row, Col,Grid, FormGroup} from 'react-bootstrap';
 
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
      list,
      searchTerm:''
    }

     // FUNKCIJA MORA DA SE BINDUJE DA BI JE VIDEO COMPONENTA I VDOM
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);


  }
removeItem(id){
  const isNotId = item => item.objectID !==id;
  const updatedList = this.state.list.filter(isNotId);
  this.setState({ list: updatedList});
}

searchValue(event){
  // console.log(event)
  this.setState({ searchTerm: event.target.value});
}

// searchValue(event){
//   console.log(event)
// }   KAO e, proveravam object metode



  render(){
    const {list,searchTerm} = this.state;
    // da ne bih ponavljao dole vec zamo pozovem
    console.log(this);
  return (
    <div className="App">

<Container fluid>

    <div className="jumbotron text-center">    <Search
    onChange = {this.searchValue}
    value = {searchTerm}>Pretraga : </Search>
 {/* <Search>children* ako hocu vrednos koja je ovde upisana</Search> */}
 </div>
</Container>

<Container>

    <div className=""> 
    <Table
    list={ list }
    searchTerm={ searchTerm }
    removeItem={ this.removeItem }
    />
     </div>
  
  </Container>
<Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>

    </div>
  );
}
}

const Search = ({onChange, value, children}) =>
<form>
  <FormGroup> 
    <h1 style={{fontWeight: 'bold'}}>{children}</h1>
     <hr style={{border: '2px solid black', width:'100px'}}></hr>
<div className="input-group">
<input
className="form-control searchForm"
 type="text"
  onChange={onChange}
   value={ value } />
   <span className="input-group-btn">
     <button className="btn btn-primary searchBtn" type="submit">
       Search
     </button>
     </span>

   </div>
   </FormGroup>
</form> 

const Button = ({onClick,children,className=''}) =>
    <button
    className={className}
    onClick={onClick}>
      { children } 
   </button>



const Table = ( {list, searchTerm, removeItem})=> {
  return(
    <div className="col-sm-10 col-sm-offset-1">
    {
        list.filter(isSearched(searchTerm)).map(item =>
        <div key={ item.objectID}>
          <h1> <a href="www.google.com">{ item.title }</a> </h1> 
          <h4> {item.author }  {item.num_comment } Komentara || {item.points} Lajkova  
        <Button
        className="btn btn-success btn-xs"
        type="button"
        onClick={ () => removeItem(item.objectID)}
        >Obrisi</Button></h4>
        <hr/>
          </div>
          )
      }
    </div>

  )
}

export default App;
