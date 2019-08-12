import React, { useState, useEffect } from "react";
import {
    MDBCol,
    MDBFormInline, MDBIcon
  } from "mdbreact";

function Search({ search }) {
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    setSearchVal(e.target.value);
    search(e.target.value);
  };

  return (
    <MDBCol md="6" className="search">
      <MDBFormInline className="md-form">
        <MDBIcon icon="search" />
        <input
          onChange={handleSearch}
          className="form-control form-control-sm ml-3 w-75"
          type="text"
          value={searchVal}
          placeholder="Search"
          aria-label="Search"
        />
      </MDBFormInline>
    </MDBCol>
  );
}

export default Search;
