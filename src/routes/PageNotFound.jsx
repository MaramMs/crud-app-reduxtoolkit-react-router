import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useRouteError, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div className="mt-5 text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>

            <Button variant="link" onClick={() => navigate("/",{replace:true})  } >
              {" "}
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
