import React from 'react';
import './../index.css';

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
        <div className="ownSection">
            {contactComponents}
        </div>
    );
}

export default Contacts;