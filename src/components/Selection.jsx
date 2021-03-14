import React, { useState } from 'react';

function Selection() {
  const [Andrew, setAndrew] = useState(false);
  const [TomD, setTomD] = useState(false);
  const [TomM, setTomM] = useState(false);
  const [Matt, setMatt] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  function handleSubmit() {
    event.preventDefault();
    console.log('SUBMITTED!!!')
  }

  function handleChangeAndrew(e) {
    setAndrew(!Andrew);
  }
  function handleChangeTomM(e) {
    setTomM(!TomM);
  }
  function handleChangeTomD(e) {
    setTomD(!TomD);
  }
  function handleChangeMatt(e) {
    setMatt(!Matt);
  }

  return (
    <div>
      <form>
        <input type="radio" name="name" id="Andrew" value="Andrew" onChange={handleChangeAndrew}></input>
        <label>Andrew</label>
        <input type="radio" name="name" id="TomD" value="TomD" onChange={handleChangeTomD}></input>
        <label>Tom D</label>
        <input type="radio" name="name" id="TomM" value="TomM" onChange={handleChangeTomM}></input>
        <label>Tom M</label>
        <input type="radio" name="name" id="Matt" value="Matt" onChange={handleChangeMatt}></input>
        <label>Matt</label>
        <button onClick={() => handleSubmit()}>Submit</button>
      </form>
      <div>{Andrew}</div>
    </div>
  )
};

export default Selection;