import React, { useEffect } from 'react';
import { LeagueList } from '../../teams';


const SoccerComponent = ({
    activeLeague,
    setActiveLeague,
    league,
    setLeague,
    leagueData,
    setTableData,
    setLeagueData,
    getSoccerData,
    data
}) => {



    const handleLeagueClick = (leagueId) => {
        setActiveLeague(leagueId);
    };


    useEffect(() => {
        if (data) {
            const { matches, table, leagueInfo } = data.soccerData;
            setLeague(matches);
            setTableData(table);
            setLeagueData(leagueInfo);
        }
    }, [data, setLeague, setTableData, setLeagueData]);

    useEffect(() => {
        if (activeLeague) {
            getSoccerData({ variables: { league: activeLeague } });
        }
    }, [activeLeague]);

    const groupedResults = league?.reduce((result, match) => {
        const date = match.date.split('T')[0];
        if (!result[date]) {
            result[date] = [];
        }
        result[date].push(match);
        return result;
    }, {});


    return (
        <>
            <h3 className="page-title">click one of the league icon to display fixtures and standings</h3>
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