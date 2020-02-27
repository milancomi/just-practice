import React,{Component} from 'react';
import logo from './logo.svg';
import logo2 from  './logo512.png';
import './App.css';  
import { render } from '@testing-library/react';
import list from './list.js';

// HIGH ORDER Function c
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


    <Search
    onChange = {this.searchValue}
    value = {searchTerm}>Pretraga :</Search>
 {/* <Search>children* ako hocu vrednos koja je ovde upisana</Search> */}
    <Table
    list={ list }
    searchTerm={ searchTerm }
    removeItem={ this.removeItem }
    />


    </div>
  );
}
}

const Search = ({onChange, value, children}) =>
<form>
{children} 
<input
 type="text"
  onChange={onChange}
   value={ value } />
</form> 

const Button = ({onClick,children}) =>
    <button
    onClick={onClick}>
      { children } 
   </button>


const Table = ( {list, searchTerm, removeItem})=> {
  return(
    <div>
    {
        list.filter(isSearched(searchTerm)).map(item =>
        <div key={ item.objectID}>
          <h1> <a href="www.google.com">{ item.title }</a> by {item.author }  </h1> 
          <h4> {item.num_comment } ^ {item.points} </h4>
        <Button
        type="button"
        onClick={ () => removeItem(item.objectID)}
        >Obrisi</Button>
          </div>
          )
      }
    </div>

  )
}

export default App;
