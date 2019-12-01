import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import backEndFns from './services/persons';
import SearchFilter from './components/SearchFilter';
import InputForm from './components/InputForm';
import Contacts from './components/Contacts';
import Notification from './components/Notification';



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
    const [ notification, setNotification ] = useState({show: false});

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

        backEndFns
            .getDBData()
            .then((persons) => {
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
                        setNotification({show: true, message: 'Successfully updated.', result: 'positive'});
                        setTimeout(() => {
                            setNotification({show: false});
                        }, 2000);
                    }
                    else {
                        backEndFns
                            .getDBData()
                            .then((persons) => {
                                setNewName('');
                                setNewPhone('');
                                setPersons(persons);
                            })
                            .catch((err) => {
                                console.log('Data fetching failed.');
                            });
                    }
                }
                else {
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
                            setNotification({show: true, message: 'Entry successfully created.', result: 'positive'});
                            setTimeout(() => {
                                setNotification({show: false});
                            }, 2000);
                        });
                }
            })
            .catch((error) => {
                console.log('Data fetching failed');
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
                            setNotification({show: true, message: 'Entry successfully deleted.', result: 'negative'});
                            setTimeout(() => {
                                setNotification({show: false});
                            }, 2000);
                        })
                        .catch((error) => {
                            setNotification({show: true, message: 'Entry had already been deleted.', result: 'negative'});
                            setTimeout(() => {
                                setNotification({show: false});
                            }, 2000);

                            backEndFns
                                .getDBData()
                                .then((newPersons) => {
                                    setPersons(newPersons);
                                    setNewName('');
                                    setNewPhone('');
                                })
                                .catch((error) => {
                                    console.log('Data fetching failed');
                                });
                        });
                }
            }
            else{
                alert('Name not found....'); // Never gonna happen.
            }   
        };
    };

    let notificationComponent = null;
    if(notification.show){
        notificationComponent = (
            <Notification message={notification.message} result={notification.result}></Notification>
        );
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <SearchFilter filterStr={filterStr} filterHandler={filterHandler}/>
            <h2>Add a new contact</h2>
            <InputForm inputSubmitHandler={inputSubmitHandler} inputChangedHandler={inputChangedHandler} newName={newName} setNewName={setNewName} newPhone={newPhone} setNewPhone={setNewPhone}></InputForm>
            {notificationComponent}
            <h2>Numbers</h2>
            <Contacts persons={persons} filterStr={filterStr} deleteHandler={deleteHandler} setPersons={setPersons}></Contacts>
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));
