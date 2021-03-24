import React, { useState } from 'react';

class Selection extends React.Component {
  // const [Andrew, setAndrew] = useState(false);
  // const [TomD, setTomD] = useState(false);
  // const [TomM, setTomM] = useState(false);
  // const [Matt, setMatt] = useState(false);

  constructor(props) {
    super(props);
    this.state = {
      Andrew: false,
      TomD: false,
      TomM: false,
      Matt: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAndrew = this.handleChangeAndrew.bind(this);
    this.handleChangeMatt = this.handleChangeMatt.bind(this);
    this.handleChangeTomD = this.handleChangeTomD.bind(this);
    this.handleChangeTomM = this.handleChangeTomM.bind(this);
  }

  handleSubmit() {
    event.preventDefault();
    console.log('SUBMITTED!!!')
    var user;
    if (this.state.Andrew) {
      user = 'Andrew';
    }
    if (this.state.TomD) {
      user = 'Tom D';
    }
    if (this.state.TomM) {
      user = 'Tom M';
    }
    if (this.state.Matt) {
      user = 'Matt';
    }
    this.props.selectUser(user)
  }

  handleChangeAndrew(e) {
    console.log('TomM: ', TomM)
    console.log('Andrew: ', Andrew)
    console.log('TomD: ', TomD)
    console.log('Matt: ', Matt)
    this.setState({
      Andrew: true,
      TomM: false,
      TomD: false,
      Matt: false
    })
  }
  handleChangeTomM(e) {
    console.log('TomM: ', TomM)
    console.log('Andrew: ', Andrew)
    console.log('TomD: ', TomD)
    console.log('Matt: ', Matt)
    this.setState({
      Andrew: false,
      TomM: true,
      TomD: false,
      Matt: false
    })
  }
  handleChangeTomD(e) {
    console.log('TomM: ', TomM)
    console.log('Andrew: ', Andrew)
    console.log('TomD: ', TomD)
    console.log('Matt: ', Matt)
    this.setState({
      Andrew: false,
      TomM: false,
      TomD: true,
      Matt: false
    })
  }
  handleChangeMatt(e) {
    console.log('TomM: ', TomM)
    console.log('Andrew: ', Andrew)
    console.log('TomD: ', TomD)
    console.log('Matt: ', Matt)
    this.setState({
      Andrew: false,
      TomM: false,
      TomD: false,
      Matt: true
    })
  }
  render() {
    return (
      <div>
        <form>
          <input type="radio" name="name" id="Andrew" value="Andrew" onChange={() => this.handleChangeAndrew()}></input>
          <label>Andrew</label>
          <input type="radio" name="name" id="TomD" value="TomD" onChange={() => this.handleChangeTomD()}></input>
          <label>Tom D</label>
          <input type="radio" name="name" id="TomM" value="TomM" onChange={() => this.handleChangeTomM()}></input>
          <label>Tom M</label>
          <input type="radio" name="name" id="Matt" value="Matt" onChange={() => this.handleChangeMatt()}></input>
          <label>Matt</label>
          <button onClick={() => this.handleSubmit()}>Select User</button>
        </form>
      </div>
    )
  }
};

// Scoreboard will look at the database, and either tally up the results for the whole season
// OR... it will have a

export default Selection;