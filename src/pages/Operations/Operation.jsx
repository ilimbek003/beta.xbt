import React from "react";
import "./Operations.css";

const Operation = ({ el, setModal, funcDataOperation }) => {
  return (
    <>
      <div
        onClick={() => setModal(true) || funcDataOperation(el)}
        className="save_oper"
      >
        <img src={el.logo} alt="" />
        <span className="name">
          <p>{el.date}</p>
          <p>{el.time}</p>
        </span>
        <p>{el.type}</p>
        {el.debit ? <p>{el.debit}</p> : <p>-</p>}
        {el.credit ? <p>{el.credit}</p> : <p>-</p>}
        <button
          style={{
            background:
              el.status.value == 2
                ? "var(--green)"
                : el.status.value == 3
                ? "red"
                : el.status.value == 1
                ? "#3e545a"
                : "",
          }}
          className="btn"
        >
          {el.status.name}
        </button>
      </div>
      <div
        onClick={() => setModal(true) || funcDataOperation(el)}
        className="save_oper cross"
      >
        <img src={el.logo} alt="" />
        <p>{el.type}</p>
        {el.debit ? (
          <p className="summ" style={{ color: "#03ff03" }}>
            +{el.debit}
          </p>
        ) : el.credit ? (
          <p className="summ" style={{ color: "red" }}>
            -{el.credit}
          </p>
        ) : (
          <p>-</p>
        )}
      </div>
    </>
  );
};

export default Operation;
