import React, { useState, useEffect, useContext} from "react";
import { Col, Row, Container } from "../../components/Grid";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";
import "./styles.css";

function Stats() {

    useEffect(() => {
        loadStats();
    }, [])


    const [stats, setStats] = useState([])
    const {loggedIn} = useContext(UserContext);

    let totals = [];

    // if(loggedIn) {
    //     reRender();
    // }

    // function reRender() {
    //     this.forceUpdate();
    // };
    
    function loadStats() {
        API.getUser()
          .then(res => 
            setStats(res.data), console.log('Stats' + stats)
          )
          .catch(err => console.log(err));
    };

    return (     
            <Row>
                <Col size="md-3">   
                    <div className="card display-card">           
                        <h3 className = "card-title">My Height</h3>
                        <p className="card-content mb-0">{stats.height}</p>
                        <p id="theHeight">{ stats.height / 12 } Feet</p>
                    </div>
                </Col>
                <Col size="md-3">   
                    <div className="card display-card">           
                        <h3 className = "card-title">My Weight</h3>
                        <p className="card-content mb-0">{stats.weight}</p>
                        <p>{ (stats.weight * 0.453592).toFixed(2) } Kilograms</p>
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
    );
}

export default Stats;
