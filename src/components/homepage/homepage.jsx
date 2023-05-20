import React, { useState, useEffect } from 'react'
import './homepage.css'

const Homepage = () => {
    const [results, setResults] = useState([]);

    const displaySoccerStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/todays-matches');
            const data = await response.json();
            const matchResults = data.matches.map((match) => ({
                homeTeam: match.homeTeam.name,
                awayTeam: match.awayTeam.name,
                competition: match.competition.name,
                score: `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`
            }));
            console.log(matchResults);
            setResults(matchResults);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        displaySoccerStats()
    }, [])

    const competitions = Array.from(new Set(results.map((result) => result.competition)));

    return (
        <div className="scoreboard">
            {competitions.map((competition, index) => (
                <div key={index} className="competition-container">
                    <h1 className="competition-title">{competition}</h1>
                    <ul className="match-list">
                        {results
                            .filter((result) => result.competition === competition)
                            .map((result, index) => (
                                <li key={index} className="match-item">
                                    <span className="team">{result.homeTeam}</span>
                                    <span className="score">{result.score}</span>
                                    <span className="team">{result.awayTeam}</span>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Homepage