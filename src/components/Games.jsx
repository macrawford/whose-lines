import React from 'react';
import axios from 'axios';
import key from '../../odds.js'

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }
  componentDidMount() {
    axios.get('https://api.the-odds-api.com/v3/odds/?apiKey=' + key + '&sport=basketball_nba&region=us&mkt=spreads')
      .then((response) => {
        console.log('response.data.data: ', response.data.data)
        this.setState({
          games: response.data.data
        })
      })
      .catch((error) => {
        throw error
      })
  }
  render() {
    // return (
    //   <div>test</div>
    // )
    return (
      this.state.games.map((game) => {
        return (
          <div>
            <div>{game.teams[0]} at {game.teams[1]}</div>
            {game.sites[0].odds.spreads.points[0] <= 0 ? <div>{game.teams[0]} ({game.sites[0].odds.spreads.points[0]})</div> : <div>{game.teams[1]} ({game.sites[0].odds.spreads.points[1]})</div>}
          </div>
        )
      })
      // <div>
      //   Games working
      // </div>
    )
  }
}

export default Games;