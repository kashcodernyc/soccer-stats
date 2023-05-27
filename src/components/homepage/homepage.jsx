import React, { useState, useEffect } from 'react';
import './homepage.css';
import Navigation from '../navigation/navLinks';
import SoccerComponent from '../soccer/SoccerCompoent';
import SoccerTable from '../soccer/SoccerTable';

const Homepage = () => {
    const [activeLeague, setActiveLeague] = useState(39);
    const [tableData, setTableData] = useState([]);
    const [league, setLeague] = useState([]);
    const [leagueData, setLeagueData] = useState({});


    return (
        <div className="container">
            <div className="scoreboard">
                <SoccerComponent
                    activeLeague={activeLeague}
                    setActiveLeague={setActiveLeague}
                    league={league}
                    setLeague={setLeague}
                    tableData={tableData}
                    setTableData={setTableData}
                    leagueData={leagueData}
                    setLeagueData={setLeagueData}
                />
            </div>
            <div className="league-table">
                <SoccerTable
                    tableData={tableData}
                    leagueData={leagueData}
                />
            </div>
        </div>
    );
};

export default Homepage;