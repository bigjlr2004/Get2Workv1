import { Card, CardBody, CardFooter, CardSubtitle, CardTitle, } from "reactstrap"

export const Scheduled = ({ job }) => {



    return <>

        <Card>

            <CardBody>
                <CardTitle tag="h5">
                    {job.store.name} -  {job.description}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                </CardSubtitle>
            </CardBody>
            <CardFooter className="card-footer  text-white d-flex justify-content-between">

                <div>
                    {job.userProfile.fullName} - {job.userProfile.phoneNumber}
                </div>
                <div>
                    {job.scheduledTime}
                </div>
            </CardFooter>

        </Card>

    </>

}

