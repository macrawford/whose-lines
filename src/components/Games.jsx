import React from 'react';
import axios from 'axios';
import key from '../../odds.js';
import '../../dist/styles.css';

var date = new Date;

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [
        // will want to delete the below, only used it for sample purposes SAVE FOR SAMPLE DATA
        {teams: ['76ers', 'Hawks'], sites: [{odds: {spreads: {points: [-3.5, 3.5]}}}]},
        {teams: ['Blazers', 'Lakers'], sites: [{odds: {spreads: {points: [-1.5, 1.5]}}}]}
      ],
      results: []
    }
  }
  componentDidMount() {
// COMMENTING OUT JUST FOR PURPOSES OF PRACTICE

    // axios.get('https://api.the-odds-api.com/v3/odds/?apiKey=' + key + '&sport=basketball_nba&region=us&mkt=spreads')
    //   .then((response) => {
    //     console.log('response.data.data: ', response.data.data)
    //     this.setState({
    //       games: response.data.data
    //     })
    //   })
    //   .catch((error) => {
    //     throw error
    //   })

    axios.get('https://www.balldontlie.io/api/v1/games?start_date=2021-03-04')
    // Will want to change the date to be 'https://www.balldontlie.io/api/v1/games?start_date=' + (date.getMonth() + 1) + '-' + date.getDate() + '-' date.getFullYear()
      .then((response) => {
        console.log('response.data (results): ', response.data.data)
        this.setState({
          results: response.data.data
        })
      })
  }
  render() {
    return (
      this.state.games.map((game) => {
        return (
          <div className="game">
            <div>{game.teams[0]} at {game.teams[1]}</div>
            {game.sites[0].odds.spreads.points[0] <= 0 ? <div>{game.teams[0]} ({game.sites[0].odds.spreads.points[0]})</div> : <div>{game.teams[1]} ({game.sites[0].odds.spreads.points[1]})</div>}
          </div>
        )
      })
      // There's an error with having two different map functions returning things, I think
      // Goal of below was to display current scores
      this.state.results.map((result) => {
        return (
          <div className="results">
            <div>{result.home_team.full_name}</div>
          </div>
        )
      })
    )
  }
}

export default Games;