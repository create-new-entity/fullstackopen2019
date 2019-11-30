import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import backEndFns from './services/persons';


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

const Contacts = ({persons, filterStr, deleteHandler, setPersons}) => {
    if(filterStr){
        persons = persons.filter((person) => {
            return person.name.toLowerCase().startsWith(filterStr.toLowerCase());
        });
    }
    let contactComponents = null;
    if(persons.length){
        contactComponents = persons.map((person, index) => {
            return (
                <div key={index} className="contactDiv">
                    <p>{person.name} {person.phone}</p>
                    <button onClick={deleteHandler(person.id, setPersons)}>Delete</button>
                </div>
            );
        });
    }
    return (
        <>
            {contactComponents}
        </>
    );
}

function getANonAssignedId(persons){
    let i = 0;
    let assignedIds = persons.map((person) => person.id);

    while(true){
        if(assignedIds.includes(i)) i++;
        else break;
    }

    return i;
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newPhone, setNewPhone ] = useState('');
    const [ filterStr, setFilterStr ] = useState('');

    useEffect(() => {
        backEndFns
            .getDBData()
            .then((persons) => {
                setPersons(persons);
            });
    }, []);

    const inputChangedHandler = (setNewNameOrPhoneFn) => {
        return (event) => {
            setNewNameOrPhoneFn(event.target.value);
        };
    };

    const inputSubmitHandler = (event) => {
        event.preventDefault();

        let found = persons.findIndex((person) => person.name === newName);
        if(found !== -1){
            let choice = window.confirm(`Contact ${persons[found].name} already exists. Do you want to update?`);
            if(choice){
                let newObj = {
                    name: persons[found].name,
                    phone: newPhone,
                    id: getANonAssignedId(persons)
                }
                backEndFns
                    .updateDBData(persons[found].id, newObj)
                    .then((newObj) => {
                        let newPersons = [...persons];
                        newPersons[found] = newObj;
                        setPersons(newPersons);
                        setNewName('');
                        setNewPhone('');
                    });
                return;
            }
        }
        let newObj = {
            name: newName,
            phone: newPhone,
            id: getANonAssignedId(persons)
        }
        backEndFns
            .createDBData(newObj)
            .then((newObj) => {
                setPersons(persons.concat(newObj));
                setNewName('');
                setNewPhone('');
            });
    };

    const filterHandler = (event) => {
        event.preventDefault();
        setFilterStr(event.target.value);
    };

    const deleteHandler = (id, setPersons) => {
        return () => {
            let foundIndex = persons.findIndex((person) => person.id === id);
            if(foundIndex !== -1){
                let choice = window.confirm(`Delete ${persons[foundIndex].name}?`);
                if(choice){
                    backEndFns
                        .deleteDBData(id)
                        .then(() => {
                            let newPersons = [...persons];
                            newPersons.splice(foundIndex, 1);
                            setPersons(newPersons);
                        });
                }
            }
            else{
                alert('Name not found....'); // Never gonna happen.
            }   
        };
    };


    return (
        <div>
            <h2>Phonebook</h2>
            <div>filter shown with: <SearchFilter filterStr={filterStr} filterHandler={filterHandler}/></div>
            <h2> add a new</h2>
            <InputForm inputSubmitHandler={inputSubmitHandler} inputChangedHandler={inputChangedHandler} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone}></InputForm>
            <h2>Numbers</h2>
            <Contacts persons={persons} filterStr={filterStr} deleteHandler={deleteHandler} setPersons={setPersons}></Contacts>
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
