import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Col, ListGroup, ListGroupItem, Row } from "reactstrap"

export const ManagerSchedule = () => {



    return <>

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

