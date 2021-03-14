import React from 'react';
import Games from './Games.jsx';
import Selection from './Selection.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <Selection/>
        <Games/>
      </div>
    )
  }
};

export default App;

/* Development Flow:

Just display the

*/