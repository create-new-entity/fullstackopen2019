import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const SearchFilter = ({filterStr, filterHandler}) => {
    return (
        <input value={filterStr} onChange={filterHandler}/>
    );
};

const InputForm = ({inputSubmitHandler, inputChangedHandler, newName, setNewName, newPhone, setNewPhone}) => {
    return (
        <form onSubmit={inputSubmitHandler}>
            <div>
            Name: <input value={newName} onChange={inputChangedHandler(setNewName)}/>
            <br></br>
            Phone: <input value={newPhone} onChange={inputChangedHandler(setNewPhone)}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    );
};

const Contacts = ({persons, filterStr}) => {
    if(filterStr){
        persons = persons.filter((person) => {
            return person.name.toLowerCase().startsWith(filterStr.toLowerCase());
        });
    }
    let contactComponents = persons.map((person, index) => {
        return <p key={index}>{person.name} {person.phone}</p>
    });
    return (
        <>
            {contactComponents}
        </>
    );
}



const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456' },
        { name: 'Ada Lovelace', phone: '39-44-5323523' },
        { name: 'Dan Abramov', phone: '12-43-234345' },
        { name: 'Mary Poppendieck', phone: '39-23-6423122' }
      ]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');
  const [ filterStr, setFilterStr ] = useState('');

  const inputChangedHandler = (setNewNameOrPhoneFn) => {
      return (event) => {
        setNewNameOrPhoneFn(event.target.value);
      };
  };

  const inputSubmitHandler = (event) => {
      event.preventDefault();

      let found = persons.findIndex((person) => person.name === newName);
      if(found !== -1){
        alert(persons[found].name + ' already exists');
        return;
      }
      setPersons(persons.concat({name: newName, phone: newPhone}));
      setNewName('');
      setNewPhone('');
  };

  const filterHandler = (event) => {
      event.preventDefault();
      setFilterStr(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <SearchFilter filterStr={filterStr} filterHandler={filterHandler}/></div>
      <h2> add a new</h2>
      <InputForm inputSubmitHandler={inputSubmitHandler} inputChangedHandler={inputChangedHandler} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone}></InputForm>
      <h2>Numbers</h2>
      <Contacts persons={persons} filterStr={filterStr}></Contacts>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
