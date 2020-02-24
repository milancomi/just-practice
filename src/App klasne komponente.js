import React,{Component} from 'react';
import logo from './logo.svg';
import logo2 from  './logo512.png';
import './App.css';  
import { render } from '@testing-library/react';
import list from './list.js';

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

class Search extends Component {
  render(){
    const{onChange, value, children} = this.props;
    // children rezervisana rec, uzima value koja stoji kad se kreira element
    return(
      <form>
        {children} 
        {/* ovako se zakucavaju vrednosti */}
        <input
         type="text"
          onChange={onChange}
           value={ value } />
                           {/* {children}  ovde radi */}

        </form> 
                        // {children}  ovde ne radi


    )
  }
}

class Table extends Component{
  render(){
    const {list, searchTerm, removeItem}= this.props; 
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
}

// Prvi nacin kreiranja komponente
// class Button extends Component{
//   render(){
//     const { onClick, children} = this.props;
//     return(
//     <button
//      onClick={onClick}>
//        { children } 
//     </button>
//     )  
// }
// }

// Drugi nacin
// function Button({onClick,children}){
//   return(
//     <button
//     onClick={onClick}>
//       { children } 
//    </button>
//   )
// }

// Treci nacin kreiranja komponente

const Button = ({onClick,children}) =>
    <button
    onClick={onClick}>
      { children } 
   </button>
  



// 2. IZNAD STOJI SKRACENO
// removeItem(id){  // FUNKCIJA MORA DA SE BINDUJE DA BI JE VIDEO COMPONENTA I VDOM
//   console.log('Remove item');


// function isNotId(item){
//   return item.objectID !== id;
// }
// const updatedList = this.state.list.filter(isNotId);

// this.setState({ list:updatedList});

// }



// 1Iznad ostavljam skraceno
// class App extends Component {
//   render(){
//   return (
//     <div className="App">
//    {
//      list.map(function(item){
//      return (
//      <div key={ item.objectID}>
//       <h1> <a href="www.google.com">{ item.title }</a> by {item.author }  </h1> 
//       <h4> {item.num_comment } ^ {item.points} </h4>
//     </div>
//      )
//        })
//    }
//     </div>
//   );
// }
// }
export default App;
