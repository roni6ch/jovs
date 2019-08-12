import React, { useState, useEffect, useReducer } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBAnimation
} from "mdbreact";
import Search from "./Search";

const CARDS_API_URL = "content/data.json";

const initialState = {
  cards: [],
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        loading: true
      };
    case "GET_CARDS":
      return {
        ...state,
        loading: false,
        cards: action.payload
      };
    default:
      return state;
  }
};

function Main() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch({
      type: "INIT"
    });
    fetch(CARDS_API_URL)
      .then(response => {
        return response.json();
      })
      .then(result => {
        setData(result);
        dispatch({
          type: "GET_CARDS",
          payload: result
        });
      });
  }, []);

  const search = val => {
    dispatch({
      type: "INIT"
    });
    let newData = data;
    data.forEach((card,i) => {card.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ? newData[i].show = true : newData[i].show = false; });
    dispatch({
      type: "GET_CARDS",
      payload: newData
    });
  };

  const { loading } = state;

  return (
    <div className="Main">
      {loading && (
        <div className="lds-ripple">
          <div />
          <div />
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <Search search={search} />
          {state.cards.map((card, index) => (
            <MDBAnimation type="fadeInUp" key={index} className={`cardParent ${!card.show && typeof(card.show) !== "undefined" && 'hidden'} `}>
            <MDBCard>
              <iframe
                width="100%"
                src={card.video + `?controls=0`}
                title={card.video}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <MDBCardBody>
                <MDBCardTitle>
                  <img
                    src={`//logo.clearbit.com/${card.logo}?size=25`}
                    className="Card-logo"
                    alt={card.name}
                  />
                  <span>{card.name}</span>
                </MDBCardTitle>
                <MDBCardText>{card.info}</MDBCardText>
                <MDBBtn href={card.career} target="_blank">
                  Apply
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
            </MDBAnimation>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}

export default Main;
