import React from 'react';
import '../homepage/homepage.css';

const SoccerTable = ({ tableData, leagueData, activeLeague }) => {
    ;

    // Grouping the tableData by group
    const groupedData = tableData.reduce((result, team) => {
        if (!result[team.group]) {
            result[team.group] = [];
        }
        result[team.group].push(team);
        return result;
    }, {});

    const shouldDisplayStandings = activeLeague === 2 || activeLeague === 3;

    return (
        <div className="soccer-standings">
            <div className="table-league-logo">
                <img src={leagueData.leagueLogo} alt={leagueData.leagueLogo} />
            </div>
            <div className="page-title">
                <h1>{`${leagueData.leagueName} Standings`}</h1>
            </div>
            {shouldDisplayStandings ? (
                // Display group tables if activeLeagueId is 2 or 3
                Object.entries(groupedData).map(([group, teams]) => (
                    <div className="grop-standings" key={group}>
                        <div>
                            <h4 className="page-title">{group}</h4>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Club</th>
                                    <th>MP</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team) => (
                                    <tr className="table-row" key={team.id}>
                                        <td className="club-info">
                                            <span className="rank">{team.rank}</span>
                                            <span className="logo">
                                                <img src={team.logo} alt={team.name} />
                                            </span>
                                            <span className="name">{team.name}</span>
                                        </td>
                                        <td>{team.played}</td>
                                        <td>{team.win}</td>
                                        <td>{team.draw}</td>
                                        <td>{team.lose}</td>
                                        <td>{team.goalsFor}</td>
                                        <td>{team.goalsAgainst}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                // Display regular table if activeLeagueId is not 2 or 3
                <table>
                    <thead>
                        <tr>
                            <th>Club</th>
                            <th>MP</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((team) => (
                            <tr className="table-row" key={team.id}>
                                <td className="club-info">
                                    <span className="rank">{team.rank}</span>
                                    <span className="logo">
                                        <img src={team.logo} alt={team.name} />
                                    </span>
                                    <span className="name">{team.name}</span>
                                </td>
                                <td>{team.played}</td>
                                <td>{team.win}</td>
                                <td>{team.draw}</td>
                                <td>{team.lose}</td>
                                <td>{team.goalsFor}</td>
                                <td>{team.goalsAgainst}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SoccerTable;