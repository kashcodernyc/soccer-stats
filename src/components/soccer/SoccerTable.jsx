import React from 'react'
import '../homepage/homepage.css';
const SoccerTable = ({ tableData, leagueData }) => {
    if (!tableData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="soccer-standings">
            <div className="table-league-logo">
                <img src={leagueData.leagueLogo} alt={leagueData.leagueLogo} />
            </div>
            <div className="page-title">
                <h1>{`${leagueData.leagueName} Standings`}</h1>
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
                        {/* <th>Last 5</th> */}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((team) => (
                        <tr className="table-row" key={team.rank}>
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
    );
}

export default SoccerTable
