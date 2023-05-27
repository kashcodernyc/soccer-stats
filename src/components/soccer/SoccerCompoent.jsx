import React, { useEffect } from 'react';
import { LeagueList } from '../../teams';

const SoccerComponent = ({
    activeLeague,
    setActiveLeague,
    league,
    setLeague,
    leagueData,
    setTableData,
    setLeagueData
}) => {

    const handleLeagueClick = (leagueId) => {
        setActiveLeague(leagueId);
    };

    useEffect(() => {
        // Create an AbortController instance
        const controller = new AbortController();
        // Get the signal from the controller
        const signal = controller.signal;
        const fetchDataWithCancellation = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/soccer-data?league=${activeLeague}`, {
                    signal: signal // Pass the signal to the fetch request
                });
                const data = await response.json();
                console.log(data);

                const matchResults = data?.matches.response.map((match) => ({
                    homeTeam: match.teams.home.name,
                    awayTeam: match.teams.away.name,
                    homeLogo: match.teams.home.logo,
                    awayLogo: match.teams.away.logo,
                    league: match.league.name,
                    leagueFlag: match.league.flag,
                    score: typeof match.goals.home !== 'number' ? 'TBA' : `${match.goals.home} - ${match.goals.away}`,
                    date: match.fixture.date,
                    id: match.fixture.id,
                }));

                const tableResults = data?.table.response[0].league.standings[0].map((row) => ({
                    rank: row.rank,
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
                    leagueName: data?.table.response[0].league.name,
                    leagueFlag: data?.table.response[0].league.flag,
                    leagueLogo: data?.table.response[0].league.logo,
                };

                setLeague(matchResults);
                setTableData(tableResults);
                setLeagueData(leagueInfo);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataWithCancellation();

        return () => {
            // Cancel the request when the component unmounts or when activeLeague changes
            controller.abort();
        };

    }, [activeLeague]);

    const groupedResults = league.reduce((result, match) => {
        const date = match.date.split('T')[0];
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(match);
        return result;
    }, {});

    return (
        <>
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
                <h1>{`${leagueData.leagueName} Fixtures`}</h1>
                {leagueData.leagueFlag ? (
                    <img src={leagueData.leagueFlag} alt={leagueData.leagueFlag} />
                ) : (
                    <img src={leagueData.leagueLogo} alt={leagueData.leagueLogo} />
                )}
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
                                    <span className="team-name-home">
                                        {match.homeTeam}
                                        <img style={{ marginLeft: '10px' }} className="team-logo" src={match.homeLogo} alt={match.homeTeam} />
                                    </span>
                                    <div className="score-container">
                                        <span className="score">{match.score}</span>
                                    </div>
                                    <span className="team-name-away">
                                        <img style={{ marginRight: '10px' }} className="team-logo" src={match.awayLogo} alt={match.awayTeam} />
                                        {match.awayTeam}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default SoccerComponent;