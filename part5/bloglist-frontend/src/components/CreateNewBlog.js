import React from 'react';

const CreateNewBlog = ({ createNewInputsChangeHandler, createNew, createHandler }) => {
    return (
        <div>
            <form onSubmit={createHandler}>
                <h2>Create New</h2>
                <div><label>title:</label><input value={createNew.title} onChange={createNewInputsChangeHandler('title')}></input></div>
                <div><label>author:</label><input value={createNew.author} onChange={createNewInputsChangeHandler('author')}></input></div>
                <div><label>url:</label><input value={createNew.url} onChange={createNewInputsChangeHandler('url')}></input></div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateNewBlog;