import React from 'react';
import useField from './../hooks/index';

const CreateNewBlog = ({ createHandler }) => {
  let titleHook = useField('');
  let authorHook = useField('');
  let urlHook = useField('');
  return (
    <div>
      <form onSubmit={createHandler(titleHook, authorHook, urlHook)}>
        <h2>Create New</h2>
        <div><label>title:</label><input value={titleHook.value} onChange={titleHook.onChange}></input></div>
        <div><label>author:</label><input value={authorHook.value} onChange={authorHook.onChange}></input></div>
        <div><label>url:</label><input value={urlHook.value} onChange={urlHook.onChange}></input></div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateNewBlog;