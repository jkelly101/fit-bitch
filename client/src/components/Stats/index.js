import React, { useState, useEffect} from "react";
import API from "../../utils/API";
import "./styles.css";

function Stats() {

    const [stats, setStats] = useState([])
    let totals = [];

    useEffect(() => {
        loadStats()
    }, [])
    
    function loadStats() {
        API.getBooks()
          .then(res => 
            setStats(res.data)       
          )
          .catch(err => console.log(err));
    };

    return (
        <div className="card stat-card">           
            <div>
                
            </div>
        </div>
    );
}

export default Stats;
