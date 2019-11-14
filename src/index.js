import React, { useRef, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const INITIAL_STATE = {
  isVisible: true,
  cardHeight: "",
  contentCardHeight: "",
  currentHeight: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_VISIBILITY":
      return {
        ...state,
        isVisible: !state.isVisible
      };
    case "SET_CARD_HEIGHT":
      return {
        ...state,
        cardHeight: action.value
      };
    case "SET_CONTENT_CARD_HEIGHT":
      return {
        ...state,
        contentCardHeight: action.value
      };
    case "SET_CURRENT_HEIGHT":
      return {
        ...state,
        currentHeight: action.value
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const contentHeight = useRef(null);
  const parentHeight = useRef(null);
  const { isVisible, cardHeight, contentCardHeight, currentHeight } = state;

  const handleClick = () => {
    dispatch({ type: "SET_VISIBILITY" });
  };

  useEffect(() => {
    const {
      height,
      width,
      left,
      right,
      top
    } = parentHeight.current.getBoundingClientRect();
    console.log({ height, width, left, right, top });
    dispatch({
      type: "SET_CARD_HEIGHT",
      value: parentHeight.current.clientHeight
    });
    dispatch({
      type: "SET_CONTENT_CARD_HEIGHT",
      value: contentHeight.current.clientHeight
    });
  }, []);

  useEffect(() => {
    if (!isVisible) {
      dispatch({
        type: "SET_CURRENT_HEIGHT",
        value: cardHeight - contentCardHeight
      });
      return;
    }
    dispatch({
      type: "SET_CURRENT_HEIGHT",
      value: cardHeight + contentCardHeight
    });
  }, [isVisible]);

  return (
    <div className="App">
      <div className="Container">
        <div
          className="Card"
          ref={parentHeight}
          style={{ height: currentHeight }}
        >
          <div className="TitleCard">
            <p>
              Saldo disponível em conta{" "}
              <button onClick={handleClick}> > </button>{" "}
            </p>
            <div className="ContentCard" ref={contentHeight}>
              <p> Seu saldo é:</p>
              <h4>R$ 95.984.198,00</h4>
            </div>
          </div>
        </div>
        <div className="Card">
          <div className="TitleCard">
            <p>Saldo disponível em conta</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
