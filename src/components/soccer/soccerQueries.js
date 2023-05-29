import { gql } from "@apollo/client";

export const GET_SOCCER_DATA = gql`
  query GetSoccerData($league: Int!) {
    soccerData(league: $league) {
      matches {
        homeTeam
        awayTeam
        homeLogo
        awayLogo
        league
        leagueFlag
        score
        date
        id
      }
      table {
        rank
        points
        name
        logo
        played
        win
        lose
        draw
        goalsFor
        goalsAgainst
        form
      }
      leagueInfo {
        leagueName
        leagueFlag
        leagueLogo
      }
    }
  }
`;
