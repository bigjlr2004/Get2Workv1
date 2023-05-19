
import { AccordionBody, AccordionHeader, CardBody, CardSubtitle, CardText, CardTitle, Container, ListGroup, ListGroupItem, UncontrolledAccordion } from "reactstrap";


const CompletedJob = ({ completedJob, role }) => {
    const ReturnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        const formattedDate = date.toLocaleTimeString('en-US', options);
        return formattedDate;
    }

    const getTimeDifference = (clockin, clockout) => {
        const startTime = new Date(clockin);
        const endTime = new Date(clockout);
        const timeDiff = endTime.getTime() - startTime.getTime();

        let hours = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    }


    return (
        <>
            <div>
                <div>{role == "Manager" ? <><Container>
                    <UncontrolledAccordion defaultOpen="0">
                        <AccordionHeader targetId="1" >
                            <div>
                                {completedJob.job.scheduledTime} -  {completedJob.job.store.name} - {completedJob.job.description}
                            </div>
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <CardBody>
                                <CardTitle tag="h5">
                                    {completedJob.job.userProfile.fullName}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"

                                >
                                    Time  In: {ReturnTime(completedJob.timeIn)} Out: {ReturnTime(completedJob.timeOut)} <br />
                                    Clocked In: {getTimeDifference(completedJob.timeIn, completedJob.timeOut)}
                                </CardSubtitle>
                                <CardText>
                                </CardText>
                                <ListGroup flush>
                                    <ListGroupItem>
                                        Halfs Stocked: {completedJob.halfs}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Pints Stocked: {completedJob.pints}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Snacks Stocked: {completedJob.snacks}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        Job Notes: {completedJob.notes}
                                    </ListGroupItem>
                                </ListGroup>

                            </CardBody>
                        </AccordionBody>
                    </UncontrolledAccordion>
                </Container>
                </> : <div>{completedJob.job.scheduledTime} -  {completedJob.job.store.name} - {completedJob.job.description} - Completed: {ReturnTime(completedJob.dateCompleted)}</div>}</div>
            </div>
        </>
    );
};

export default CompletedJob;