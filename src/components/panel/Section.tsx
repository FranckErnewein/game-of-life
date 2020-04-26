import styled from "styled-components";
import { device } from "../mediaqueries";

export default styled.section`
  padding: 0 10px;
  width: 30%;
  @media ${device.mobileL} {
    width: 100%;
    padding-bottom: 30px;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;
