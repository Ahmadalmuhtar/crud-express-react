import React, { useEffect } from 'react';
import '../App.css';
import { MdClose } from 'react-icons/md';

const Form = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  useEffect(() => {
    console.log('Form received values:', rest);
  }, [rest]);

  return (
    <div>
      <div className='addContainer'>
        <form onSubmit={handleSubmit}>
          <div className='close-btn' onClick={handleClose}>
            <MdClose />
          </div>
          <label htmlFor='name'>Name : </label>
          <input type='text' id='name' name='name' onChange={handleOnChange} value={rest.name} />
          <label htmlFor='email'>Email : </label>
          <input type='text' id='email' name='email' onChange={handleOnChange} value={rest.email} />
          <label htmlFor='mobile'>Mobile : </label>
          <input type='number' id='mobile' name='mobile' onChange={handleOnChange} value={rest.mobile} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
