const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const apiKey = process.env.SOCCER_API_KEY;

app.get("/api/live-matches", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v2/matches",
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        params: {
          status: "LIVE",
          competitions: "PL,PD,BL1,SA",
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

app.get("/api/todays-matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await axios.get(
      "https://api.football-data.org/v2/matches",
      {
        headers: {
          "X-Auth-Token": apiKey,
        },
        params: {
          dateFrom: today,
          dateTo: today,
          competitions: "PL,PD,BL1,SA",
        },
      }
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
