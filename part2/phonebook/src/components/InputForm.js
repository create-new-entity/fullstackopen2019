import React from 'react';
import './../index.css';

const InputForm = ({inputSubmitHandler, inputChangedHandler, newName, setNewName, newPhone, setNewPhone}) => {
    return (
        <form onSubmit={inputSubmitHandler} className="ownSection">
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

export default InputForm;