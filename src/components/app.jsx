import React from 'react';
import Games from './Games.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <div>React Working</div>
        <Games/>
      </div>
    )
  }
};

export default App;