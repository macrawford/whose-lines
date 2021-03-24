import React from 'react';
import Games from './Games.jsx';
import Selection from './Selection.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.selectUser = this.selectUser.bind(this);
  }
  selectUser(user) {
    console.log('user: ', user)
    this.setState({
      user: user
    })
  }
  render() {
    return(
      <div>
        <Selection selectUser={this.selectUser}/>
        {this.state.user !== null ? <div>Picking for {this.state.user}</div> : <div>Select a user!</div>}
        <Games user={this.state.user}/>
      </div>
    )
  }
};

export default App;

/* Development Flow:

Select your user name
Once a user name is selected, you can make picks
When you submit, it sends the user, the games and the spreads to the database

It then displays that information on the page
That person is no longer eligible to be selected
Once a game starts, it is locked and can't be picked any longer (if no selections made, automatically pick the favorite)
Once a game ends,

Problems I will need to solve:
How will the database automatically update? Use a set time out function?

Next level problems:
Lock in the spread at a certain time each day? (maybe don't worry about it)

Flow: submit picks, they go into a database
Once the game reaches a final (determined by a set timeout function - with that day's date)

*/