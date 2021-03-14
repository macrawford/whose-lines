import React from 'react';
import axios from 'axios';
import key from '../../odds.js';
import '../../dist/styles.css';

var date = new Date;

/* Sample Data:
  this.state = {
    games: [
      {teams: ['76ers', 'Hawks'], sites: [{odds: {spreads: {points: [-3.5, 3.5]}}}]},
      {teams: ['Blazers', 'Lakers'], sites: [{odds: {spreads: {points: [-1.5, 1.5]}}}]}
    ]
  }

  API Limits:
  Ball Don't Lie: 60 requests per minute
  Odds API: 500 requests per month - might become a bottleneck - but I could just have it grab the odds at a certain time of day and then keep those odds until game time- then it will switch to scores anyways
*/

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      results: []
    }
  }
  componentDidMount() {
    axios.get('https://api.the-odds-api.com/v3/odds/?apiKey=' + key + '&sport=basketball_nba&region=us&mkt=spreads&dateFormat=iso')
      .then((response) => {
        console.log('response.data.data: ', response.data.data)
        this.setState({
          games: response.data.data
        })
      })
      .catch((error) => {
        throw error
      })

    axios.get('https://www.balldontlie.io/api/v1/games?start_date=' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '&end_date=' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear())
    // Will want to change the date to be 'https://www.balldontlie.io/api/v1/games?start_date=' + (date.getMonth() + 1) + '-' + date.getDate() + '-' date.getFullYear()
      .then((response) => {
        console.log('response.data.data (results): ', response.data.data)
        this.setState({
          results: response.data.data
        })
      })
  }
  render() {
    return (
      this.state.results.map((game) => {
        if (game.period === 0) {
          return(
            <div className="game">
              <div>{game.visitor_team.full_name} at {game.home_team.full_name}</div>
              <div>{game.status}</div>
              {this.state.games.map((odds) => {
                if (odds.home_team === game.home_team.full_name) {
                  return (
                    odds.sites.map((sites) => {
                      if (sites.site_key === 'williamhill_us') {
                        return (
                          <div>
                            {sites.odds.spreads.points[0] <= 0 ? <div>{odds.teams[0]} ({sites.odds.spreads.points[0]})</div> : <div>{odds.teams[1]} ({sites.odds.spreads.points[1]})</div>}
                          </div>
                        )
                      }
                    })
                  )
                }
              })}
            </div>
          )
        } else {
          return (
            <div className="game">
              <div>
                {game.visitor_team.full_name} {game.visitor_team_score}, {game.home_team.full_name} {game.home_team_score}
              </div>
              <div>
                {game.status} {game.time}
              </div>
            </div>
          )
        }
      })
    )
  }


  //   render() {
  //   return (
  //     this.state.results.map((matchup) => {
  //       return (
  //         this.state.games.map((game) => {
  //           if (matchup['home_team']['full_name']) {
  //             return (
  //               <div className="game">
  //                 <div>{game.teams[0]} at {game.teams[1]}</div>
  //                 {game.sites.map((site) => {
  //                   if (site['site_key'] === 'williamhill_us') {
  //                     // on the chance that william hill hasn't posted odds for a game, nothing will show up...
  //                     return (
  //                       <div>
  //                         {site.odds.spreads.points[0] <= 0 ? <div>{game.teams[0]} ({site.odds.spreads.points[0]})</div> : <div>{game.teams[1]} ({site.odds.spreads.points[1]})</div>}
  //                       </div>
  //                     )
  //                     // Need to incorporate this into the other map function to take the spread only of caesar's
  //                   }
  //                 })}

  //                 {/* {game.sites[0].odds.spreads.points[0] <= 0 ? <div>{game.teams[0]}({game.sites[0].odds.spreads.points[0]})</div> : <div>{game.teams[1]}({game.sites[0].odds.spreads.points[1]})</div>} */}

  //               </div>
  //               // odds are by william hill (make sure you select that one)
  //             )
  //           }
  //         })
  //       )
  //     }
  //   )
  //     // There's an error with having two different map functions returning things, I think
  //     // Goal of below was to display current scores

  //     // this.state.results.map((result) => {
  //     //   return (
  //     //     <div className="results">
  //     //       <div>{result.home_team.full_name}</div>
  //     //     </div>
  //     //   )
  //     // })
  //   )
  // }
}

export default Games;