import { useLocation, useParams } from "react-router-dom";
import { Container, Title } from "./main";

interface RouteState {
    state: {
        name: string
    }
};

function Detail() {

    const { id } = useParams();
    const { state } = useLocation() as RouteState;

    return(
        <>
          <Container>
              <Title>{ state.name }</Title>
          </Container>
        </>
    )
}

export default Detail;