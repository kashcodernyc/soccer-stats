const express = require("express");
require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const ApiKey = process.env.API_KEY;
const rightNow = new Date();
const startDate = new Date(rightNow - 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const endDate = new Date(rightNow + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

const typeDefs = gql`
  type Match {
    homeTeam: String
    awayTeam: String
    homeLogo: String
    awayLogo: String
    league: String
    leagueFlag: String
    score: String
    date: String
    id: ID
  }

  type TeamStanding {
    rank: Int
    id: Int
    points: Int
    group: String
    name: String
    logo: String
    played: Int
    win: Int
    lose: Int
    draw: Int
    goalsFor: Int
    goalsAgainst: Int
    form: String
  }

  type LeagueInfo {
    leagueName: String
    leagueFlag: String
    leagueLogo: String
  }

  type SoccerData {
    matches: [Match]
    table: [TeamStanding]
    leagueInfo: LeagueInfo
  }

  type Query {
    soccerData(league: Int!): SoccerData
  }
`;

const resolvers = {
  Query: {
    soccerData: async (_, { league }) => {
      try {
        const currentYear = new Date().getFullYear();
        const currentSeason = currentYear - 1;

        const matchesResponse = await axios.get(
          "https://api-football-v1.p.rapidapi.com/v3/fixtures",
          {
            headers: {
              "X-RapidAPI-Key": ApiKey,
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
            params: {
              league,
              season: currentSeason,
              from: startDate,
              to: endDate,
            },
          }
        );

        const tableResponse = await axios.get(
          "https://api-football-v1.p.rapidapi.com/v3/standings",
          {
            headers: {
              "X-RapidAPI-Key": ApiKey,
              "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
            params: {
              league,
              season: currentSeason,
            },
          }
        );

        const matchResults = matchesResponse.data.response.map((match) => ({
          homeTeam: match.teams.home.name,
          awayTeam: match.teams.away.name,
          homeLogo: match.teams.home.logo,
          awayLogo: match.teams.away.logo,
          league: match.league.name,
          leagueFlag: match.league.flag,
          score:
            typeof match.goals.home !== "number"
              ? "TBA"
              : `${match.goals.home} - ${match.goals.away}`,
          date: match.fixture.date,
          id: match.fixture.id,
        }));

        const groupTable =
          tableResponse?.data.response[0].league.standings.length > 1
            ? tableResponse?.data.response[0].league.standings.flat()
            : tableResponse?.data.response[0].league.standings[0];

        const tableResults = groupTable.map((row) => ({
          rank: row.rank,
          id: row.team.id,
          group: row.group,
          points: row.points,
          name: row.team.name,
          logo: row.team.logo,
          played: row.all.played,
          win: row.all.win,
          lose: row.all.lose,
          draw: row.all.draw,
          goalsFor: row.all.goals.for,
          goalsAgainst: row.all.goals.against,
          form: row.form,
        }));

        const leagueInfo = {
          leagueName: tableResponse.data.response[0].league.name,
          leagueFlag: tableResponse.data.response[0].league.flag,
          leagueLogo: tableResponse.data.response[0].league.logo,
        };

        return {
          matches: matchResults,
          table: tableResults,
          leagueInfo,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Internal Server Error");
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
