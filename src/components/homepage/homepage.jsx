import React, { useState, useEffect } from 'react';
import './homepage.css';
import Navigation from '../navigation/navLinks';
import SoccerComponent from '../soccer/SoccerCompoent';

const Homepage = () => {
    const [results, setResults] = useState([]);
    const [activeLink, setActiveLink] = useState('soccer');

    const displayNbaStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/todays-nba-matches');
            const data = await response.json();
            const matchResults = data.response.map((match) => ({
                homeTeam: match.teams.home.name,
                awayTeam: match.teams.visitors,
                logo: match.teams.logo,
                score: typeof match.scores.home.points !== 'number' ? 'TBA' : `${match.scores.home.points} - ${match.scores.visitors.points}`,
            }));
            console.log(matchResults.response);
            setResults(matchResults);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="container">
            <div className="scoreboard">
                <Navigation activeLink={activeLink} setActiveLink={setActiveLink} />
                <SoccerComponent />
            </div>
            <div className="empty-section"></div>
        </div>
    );
};

export default Homepage;