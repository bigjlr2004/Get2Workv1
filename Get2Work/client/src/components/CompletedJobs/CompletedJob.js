
import { AccordionBody, AccordionHeader, CardBody, CardSubtitle, CardText, CardTitle, Container, ListGroup, ListGroupItem, UncontrolledAccordion } from "reactstrap";


const CompletedJob = ({ completedJob }) => {
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
    // const handletimeConversionfromBackend = (timeGiven) => {
    //     const utcTimestamp = timeGiven;
    //     const offset = -5 * 60; // Eastern Time is UTC-4 during daylight savings time
    //     const d = new Date(utcTimestamp);
    //     const localTimestamp = d.getTime() + (d.getTimezoneOffset() * 60000) + (offset * 1000);
    //     const localDate = new Date(localTimestamp);
    //     const options = {
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         timeZoneName: 'short'
    //     };
    //     return localDate.toLocaleTimeString('en-US', options);
    // }
    const handletimeConversionfromBackend = (timeGiven) => {
        const easternTimezone = 'America/New_York';
        const utcTimestamp = new Date(`${timeGiven}`).toISOString();
        const d = new Date(utcTimestamp);
        const offset = (d.getTimezoneOffset() + (d.getTimezoneOffset() < 0 ? 1 : -1) * 5 * 60) * 1000; // Offset for Eastern Time with 5 hours subtracted
        const localTimestamp = d.getTime() - offset;
        const localDate = new Date(localTimestamp);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };
        return localDate.toLocaleTimeString('en-US', options);
    };






    return (
        <>
            <Container>
                <UncontrolledAccordion defaultOpen="0">
                    <AccordionHeader targetId="1" >
                        <div>
                            {completedJob.job.scheduledTime} -  {completedJob.job.store.name} - {completedJob.job.description}
                        </div>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <CardBody>
                            <CardTitle tag="h5">
                                {completedJob.job.userProfile.displayName}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {/* Time  In: {handletimeConversionfromBackend(completedJob.timeIn)}  Out: {handletimeConversionfromBackend(completedJob.timeOut)} <br /> */}
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
                            </ListGroup>
                        </CardBody>
                    </AccordionBody>
                </UncontrolledAccordion>
            </Container>
        </>
    );
};

export default CompletedJob;