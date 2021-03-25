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

  Possible Errors:
  Full names of teams may not exactly line up between Ball Don't Lie and Odds API

  Okay: so {this.props.user} will represent the currently picked user
*/

class Games extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      results: [],
      mattPicks: [], // [{Pick: Golden State Warriors, Spread: +4}]
      tomDPicks: [],
      andrewPicks: [],
      tomMPicks: []
    }
    this.makePick = this.makePick.bind(this);
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
  makePick(team, spread) {
    if (this.props.user !== null) {
      console.log('team: ', team);
      console.log('spread: ', spread);
    };
  }
  render() {
    return (
      this.state.results.map((game) => {
        if (game.period === 0) {
          return(
            <div className="game">
              <div>
                <div onClick={() => this.makePick(game.visitor_team.full_name)}>
                  {game.visitor_team.full_name}
                </div> at
                <div>
                  {game.home_team.full_name}
                </div>
              </div>
              <div>{game.status}</div>
              {this.state.games.map((odds) => {
                if (odds.home_team === game.home_team.full_name || odds.home_team === 'LA Clippers') {
                  // NEED TO FIX FOR THE CASE OF CLIPPERS NAME
                  return (
                    odds.sites.map((sites) => {
                      if (sites.site_key === 'williamhill_us') {
                        return (
                          <div>
                            {sites.odds.spreads.points[0] <= 0 ?
                              <div>{odds.teams[0]} ({sites.odds.spreads.points[0]})
                                <div onClick={() => this.makePick(odds.teams[0], sites.odds.spreads.points[0])}>Over</div>
                                <div onClick={() => this.makePick(odds.teams[1], sites.odds.spreads.points[1])}>Under</div>
                              </div> :
                              <div>{odds.teams[1]} ({sites.odds.spreads.points[1]})
                                <div onClick={() => this.makePick(odds.teams[1], sites.odds.spreads.points[1])}>Over</div>
                                <div onClick={() => this.makePick(odds.teams[0], sites.odds.spreads.points[0])}>Under</div>
                              </div>}
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
      // <Picks />
    )
  }
}

export default Games;