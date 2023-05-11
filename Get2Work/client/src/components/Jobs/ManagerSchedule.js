import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from "reactstrap"

export const ManagerSchedule = () => {



    return <>

        <Col>
            {/* //Colors Golden Vanilla - #FFe3A2   Brown #4d2200* Gold #Af8846 another gold #5A340f/}
            {/* https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/157673932_10160972819996679_8242538878667401080_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a26aad&_nc_ohc=WQ05ezoiUBUAX8ATF3_&_nc_ht=scontent-dfw5-2.xx&oh=00_AfAjSHcT8yI8AkAdR8KlccYHA_VUXqfRpGJ9I-gWWv-ZQw&oe=64830267 */}
            {/* https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/188423399_10161227012196679_3393457649963059142_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=T1dF9XXYm60AX_jZpEn&_nc_ht=scontent-dfw5-2.xx&oh=00_AfA_q_gS6A_dLWGgZxAncZeMwwuEG29eA5daofJoZvGzcQ&oe=6482F97A */}
            {/* https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/327346908_674881591054989_6245803061837058524_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=kMNuybZhOE0AX9EYFjm&_nc_ht=scontent-dfw5-2.xx&oh=00_AfAS_V3irm9vjicKlbckL9Ybz2LTMuRiwTcTUhW-lw8RWQ&oe=645FC0E6 */}
            <CardGroup>
                <Card>

                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                    <CardFooter>
                        Footer
                    </CardFooter>
                </Card>
                <Card>

                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This card has supporting text below as a natural lead-in to additional content.
                        </CardText>
                        <ListGroup flush>
                            <ListGroupItem>
                                An item
                            </ListGroupItem>
                            <ListGroupItem>
                                A second item
                            </ListGroupItem>
                            <ListGroupItem>
                                And a third item
                            </ListGroupItem>
                        </ListGroup>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                    <CardFooter>
                        Footer
                    </CardFooter>
                </Card>
            </CardGroup>
        </Col>
        <Col>
            <CardGroup>
                <Card>

                    <CardBody>
                        <CardTitle tag="h5">
                            Card title
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
                        </CardText>
                        <Button>
                            Button
                        </Button>
                    </CardBody>
                    <CardFooter>
                        Footer
                    </CardFooter>
                </Card>

            </CardGroup>
        </Col>

    </>
}

