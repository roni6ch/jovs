import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter color="blue" className="Footer font-small">
      <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="http://www.RoniChabra.com"> RoniChabra.com </a>
        </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;
