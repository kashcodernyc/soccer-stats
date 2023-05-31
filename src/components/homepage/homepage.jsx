import React, { useState } from 'react';
import './homepage.css';
import { useLazyQuery } from '@apollo/client';
import { GET_SOCCER_DATA } from '../soccer/soccerQueries';
import SoccerComponent from '../soccer/SoccerCompoent';
import SoccerTable from '../soccer/SoccerTable';

const Homepage = () => {
    const [activeLeague, setActiveLeague] = useState(39);
    const [tableData, setTableData] = useState([]);
    const [league, setLeague] = useState([]);
    const [leagueData, setLeagueData] = useState({});

    const [getSoccerData, { loading, data }] = useLazyQuery(GET_SOCCER_DATA);

    if (loading) {
        return <div className="spinner"></div>
    }

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
                    getSoccerData={getSoccerData}
                    loading={loading}
                    data={data}
                />
            </div>
            <div className="league-table">
                <SoccerTable
                    tableData={tableData}
                    leagueData={leagueData}
                    activeLeague={activeLeague}
                />
            </div>
        </div>
    );
};

export default Homepage;