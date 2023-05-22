import React, { useState, useEffect } from 'react';
import './homepage.css';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { BsChevronDoubleUp } from 'react-icons/bs';


const Homepage = () => {
    const [results, setResults] = useState([]);
    const [expandedLeagues, setExpandedLeagues] = useState({});

    const displaySoccerStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/todays-matches');
            const data = await response.json();
            const matchResults = data.matches.map((match) => ({
                homeTeam: match.homeTeam.name,
                awayTeam: match.awayTeam.name,
                competition: match.competition.name,
                score: typeof match.score.fullTime.homeTeam !== 'number' ? 'TBA' : `${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`,
            }));
            console.log(data);
            setResults(matchResults);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        displaySoccerStats();
    }, []);

    const competitions = Array.from(new Set(results.map((result) => result.competition)));
    const today = new Date().toISOString().split("T")[0];

    const toggleLeagueExpansion = (competition) => {
        setExpandedLeagues((prevState) => ({
            ...prevState,
            [competition]: !prevState[competition],
        }));
    };

    return (
        <div className="container">
            <div className="scoreboard">
                <h1 className="page-title">
                    Soccer Stats for {today}
                    <span className="rhomboid"></span>
                </h1>
                {competitions.map((competition, index) => {
                    const filteredResults = results.filter((result) => result.competition === competition);
                    const expanded = expandedLeagues[competition];
                    const displayedResults = expanded ? filteredResults : filteredResults.slice(0, 2);

                    return (
                        <div key={index} className="competition-container">
                            <ul className="match-list">
                                <h1 className="competition-title">{competition}</h1>
                                {displayedResults.map((result, index) => (
                                    <li key={index} className="match-item">
                                        <div className="team-container">
                                            <span className="team-name">{result.homeTeam}</span>
                                            <div className="score-container">
                                                <span className="score">{result.score}</span>
                                            </div>
                                            <span className="team-name">{result.awayTeam}</span>
                                        </div>
                                    </li>
                                ))}
                                {filteredResults.length > 2 && (
                                    <div className="expand-icon" onClick={() => toggleLeagueExpansion(competition)}>
                                        {expanded ? <BsChevronDoubleUp className="chevron-icon" /> : <BsChevronDoubleDown className="chevron-icon" />}
                                    </div>
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
            <div className="empty-section"></div>
        </div>
    );
};

export default Homepage;