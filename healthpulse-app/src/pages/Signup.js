import { Card, CardBody, CardHeader, Container } from "reactstrap";
import Base from "../components/Base";

const Signup = () => {
  return (
    <div>
      <Base>
        <Container>
          <Card>
            <CardHeader>
              <h3>Fill Information to Register</h3>
            </CardHeader>
            <CardBody></CardBody>
          </Card>
        </Container>
      </Base>
    </div>
  );
};

export default Signup;
