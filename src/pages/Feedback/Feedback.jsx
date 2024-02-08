import React, { useEffect, useState } from "react";
import "./Feedback.css";
import Loading from "../../components/IU/loading/loading";
import axios from "axios";
import { url } from "../../api";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/IU/alert/alert";

const Feedback = ({ loading, color, data }) => {
  const [local, setLocal] = useState("");
  const [text, setText] = useState("");
  const [personal, setPersonal] = useState([]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Отзывы";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };

  function OpenModal() {
    if (local) {
      setModal(true);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/profile/personal", { headers })
        .then((response) => {
          setPersonal(response.data);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [local]);

  const SendMessages = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        fullname: `${personal.profile.firstname} ${personal.profile.lastname}`,
        email: personal.profile.email,
        message: text,
      };
      const response = await axios.post(url + "/reviews/add", newData, {
        headers,
      });
      if (response.data.response == true) {
        Alert("success", response.data.messages);
        setText("");
        setModal(false);
      }
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };

  return (
    <div id="feed_back">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <h1>Отзывы наших пользователей</h1>
          <button
            onClick={OpenModal}
            style={{ background: color ? "var(--green)" : "var(--orange)" }}
            className="btn_feetback"
          >
            Добавить отзыв
          </button>
          {data ? (
            <div className="all__block">
              {data.map((el, index) => (
                <div key={index} className="users_block">
                  <p>{el.message}</p>
                  <div className="user_all">
                    <img src={el.photo} alt="" />
                    <div className="all_h5_h6">
                      <h5>{el.fullname}</h5>
                      <h6>{el.date}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <p style={{textAlign:"center" ,color:"#fff", fontSize:"24px", fontWeight:"400"}}>Нет Отзывов</p>
          )}
          {modal && (
            <div className="modal_feedback">
              <div
                onClick={() => setModal(false) || setText("")}
                className="not_feedback"
              ></div>
              <div className="modal_feedback_container">
                <form onSubmit={SendMessages}>
                  <h1>Оставьте нам отзыв</h1>
                  <label>Добавить отзыв</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Добавить отзыв"
                  ></textarea>
                  <button onClick={SendMessages}>Добавить</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;
