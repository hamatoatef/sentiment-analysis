import styled from "styled-components";
import { AiFillDashboard } from "react-icons/ai";

const NavbarContainer = styled.nav`
  background-color: #0c0f2b; // Or your preferred color
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff; // Or your preferred color
`;

const IconContainer = styled.div`
  color: #fff;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <IconContainer>
        <AiFillDashboard />
      </IconContainer>
      <Heading>Sentiment Analysis</Heading>
    </NavbarContainer>
  );
};

export default Navbar;
