const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const ApiKey = process.env.API_KEY;
const today = new Date().toISOString().split("T")[0];
const rightNow = new Date();
const startDate = new Date(rightNow - 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];
const endDate = new Date(rightNow + 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

app.get("/api/todays-nba-matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-nba-v1.p.rapidapi.com/games",
      {
        headers: {
          "X-RapidAPI-Key": ApiKey,
        },
        params: {
          date: today,
        },
      }
    );

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/soccer-data", async (req, res) => {
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
          league: req.query.league,
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
          league: req.query.league,
          season: currentSeason,
        },
      }
    );

    const data = {
      matches: matchesResponse.data,
      table: tableResponse.data,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});