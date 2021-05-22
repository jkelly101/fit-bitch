import React, { useState, useEffect} from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import "./styles.css";

function Stats() {

    const [stats, setStats] = useState([])
    let totals = [];

    useEffect(() => {
        loadStats()
    }, [])
    
    function loadStats() {
        API.getUser()
          .then(res => 
            setStats(res.data)  
          )
          .catch(err => console.log(err));
    };

    return (
        
        <div className="card stat-card p-3">           
            <Row>
                <Col size="md-3">   
                    <div className="card display-card">           
                        <h3 className = "card-title">My Height</h3>
                        <p className="card-content mb-0">{stats.height}</p>
                        <small>{ stats.height / 12 } Feet</small>
                    </div>
                </Col>
                <Col size="md-3">   
                    <div className="card display-card">           
                        <h3 className = "card-title">My Weight</h3>
                        <p className="card-content mb-0">{stats.weight}</p>
                        <small>{ stats.weight * 0.453592 } Kilograms</small>
                    </div>
                </Col>
                <Col size="md-3">
                    <div className="card display-card">           
                        <h3 className = "card-title">My Body Fat</h3>
                        <p className="card-content mb-0">{stats.bodyFat}%</p>
                    </div>                  
                </Col>
                <Col size="md-3">   
                    <div className="card display-card">           
                        <h3 className = "card-title">BMI</h3>
                        <p className="card-content mb-0">{(stats.weight * 0.453592 / ((stats.height / 39.3701) ** 2)).toFixed(2)}</p>
                    </div>                  
                </Col>
            </Row>
        </div>
    );
}

export default Stats;
