import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const WeekView = () => {
    return (
        <Container>

            <Row>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Monday`}><h2>Monday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Tuesday`}><h2>Tuesday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Wednesday`}><h2>Wednesday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Thursday`}><h2>Thursday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Friday`}><h2>Friday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Saturday`}><h2>Saturday</h2>
                        </Link>
                    </div>
                </Col>
                <Col>
                    <div className="container">
                        <Link to={`/weeklyview/Sunday`}><h2>Sunday</h2>
                        </Link>
                    </div>
                </Col>

            </Row>
        </Container>
    );
};

export default WeekView
