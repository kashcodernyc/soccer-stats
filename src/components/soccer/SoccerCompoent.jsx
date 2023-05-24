import React, { useState, useEffect } from 'react'
import { LeagueList } from '../../teams'

const SoccerComponent = () => {
    const [activeLeague, setActiveLeague] = useState(39);
    const [league, setLeague] = useState([]);

    const displayLeagueStats = async (leagueId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/todays-soccer-matches?league=${leagueId}`);
            const data = await response.json();
            const matchResults = data.response.map((match) => ({
                homeTeam: match.teams.home.name,
                awayTeam: match.teams.away.name,
                league: match.league.name,
                score: typeof match.goals.home !== 'number' ? 'TBA' : `${match.goals.home} - ${match.goals.away}`,
                date: match.fixture.date,
                id: match.fixture.id
            }));
            setLeague(matchResults);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLeagueClick = (leagueId) => {
        setActiveLeague(leagueId);
    };

    useEffect(() => {
        displayLeagueStats(activeLeague);
    }, [activeLeague]);

    const groupedResults = {};
    league.forEach((match) => {
        const date = match.date.split("T")[0];
        if (!groupedResults[date]) {
            groupedResults[date] = [];
        }
        groupedResults[date].push(match);
    });


    return (
        <div>
            <div className="logo-container">
                {LeagueList.map((league) => (
                    <img
                        key={league.id}
                        className="league-logo"
                        src={league.logo}
                        alt={league.alt}
                        onClick={() => handleLeagueClick(league.id)}
                    />
                ))}
            </div>
            <div className="page-title">
                <h1>{league[0].league}</h1>
            </div>
            {Object.entries(groupedResults).map(([date, matches]) => (
                <div key={date} className="competition-container">
                    <div className="page-title">
                        <h2>{date}</h2>
                    </div>
                    <div className="match-list">
                        {matches.map((match) => (
                            <div key={match.id} className="match-item">
                                <div className="team-container">
                                    <span className="team-name">{match.homeTeam}</span>
                                    <div className="score-container">
                                        <span className="score">{match.score}</span>
                                    </div>
                                    <span className="team-name">{match.awayTeam}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SoccerComponent;