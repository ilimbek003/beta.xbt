import React, { useEffect, useState } from "react";
import "./TopUp.css";
import axios from "axios";
import { url } from "../../api";
import Loading from "../../components/IU/loading/loading";
import Loading2 from "../../components/IU/loading2/loading2";
import { Alert } from "../../components/IU/alert/alert";
import { useParams } from "react-router-dom";

const TopUp = ({ color, currencies }) => {
  const { nikcurrancy } = useParams();
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState(false);
  const [modalForm, setModalForm] = useState(false);
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [local, setLocal] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(true);
  const [loadingCate, setLoadingCate] = useState(true);
  const [count, setCount] = useState([]);
  const datas_category = Object.values(count).map((data) => data);
  const [dat, setDat] = useState([]);
  const datt = dat ? dat : [];
  const datas_method = Object.values(datt).map((data) => data);
  const cate = datas_category[0] ? datas_category[0].slug : "";
  const [depozit, setDepozit] = useState([]);
  const [value, setValue] = useState("");
  const [valueForm, setValueForm] = useState("");
  const [name, setName] = useState("");
  const [form, setForm] = useState([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState([]);
  const [openModal, setOpenModal] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/replenish/categories", { headers })
        .then((response) => {
          setCount(response.data.categories);
          setLoading(false);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }, [local]);

  useEffect(() => {
    Func(cate);
  }, [cate]);

  function Func(category) {
    if (local) {
      axios
        .get(url + `/replenish/methods/${category}`, { headers })
        .then((response) => {
          setDat(response.data.methods);
          setLoadingCate(false);
        })
        .catch((error) => {
          // console.error("Error:", error);
        });
    }
  }

  async function FuncMothed(category, slug) {
    if (local) {
      try {
        const response = await axios.get(
          url + `/replenish/${category}?method=${slug}`,
          {
            headers,
          }
        );
        setDepozit(response.data);
        setModal(true);
      } catch (error) {
        // console.error("Error:", error);
      }
    }
  }

  useEffect(() => {
    if (nikcurrancy) {
      const dataDepozit = currencies
        .filter((obj) => {
          return obj.currency.includes(nikcurrancy);
        })
        .map((el) => el);
      setOpenModal(dataDepozit);
    }
  }, [nikcurrancy]);
  // console.log(currencies);

  useEffect(() => {
    if (openModal[0]) {
      FuncMothed("cryptocurrency", openModal[0].slug);
      setOpenModal([]);
    }
  }, [openModal]);

  function Name(nik) {
    setName(nik);
  }

  function FuncForm(category, slug, sum) {
    if (local) {
      axios
        .get(url + `/replenish/${category}?method=${slug}&sum=${sum}`, {
          headers,
        })
        .then((response) => {
          setForm(response.data);
          setOpen(response.data.response);
        })
        .catch((error) => {
          // console.error("Error:", error);
          Alert("error", error.response.data.messages);
          setLoadingForm(true);
        });
    }
  }

  function funcText(bec) {
    setText(bec);
  }

  const handleCopyButtonClick = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = depozit.deposit_address;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    Alert("success", "успешно скопировано !");
  };

  return (
    <div className="top_up">
      {loading ? (
        <div className="loading_div">
          <Loading />
        </div>
      ) : (
        <div className="container">
          <div className="top_up_header">
            <h1> Пополнить баланс </h1>
            <div className="menu_header">
              <button
                style={{
                  background: one
                    ? color
                      ? "var(--green)"
                      : "var(--orange)"
                    : "#00000000",
                }}
                onClick={() =>
                  setOne(true) ||
                  setTwo(false) ||
                  setThree(false) ||
                  setFour(false) ||
                  Func(datas_category[0].slug)
                }
                className="nav"
              >
                {datas_category[0] ? datas_category[0].name : ""}
              </button>
              <button
                style={{
                  background: two
                    ? color
                      ? "var(--green)"
                      : "var(--orange)"
                    : "#00000000",
                }}
                onClick={() =>
                  setOne(false) ||
                  setTwo(true) ||
                  setThree(false) ||
                  setFour(false) ||
                  Func(datas_category[1].slug)
                }
                className="nav"
              >
                {datas_category[1] ? datas_category[1].name : ""}
              </button>
              <button
                style={{
                  background: three
                    ? color
                      ? "var(--green)"
                      : "var(--orenge)"
                    : "#00000000",
                }}
                onClick={() =>
                  setOne(false) ||
                  setTwo(false) ||
                  setThree(true) ||
                  setFour(false) ||
                  Func(datas_category[2].slug)
                }
                className="nav"
              >
                {datas_category[2] ? datas_category[2].name : ""}
              </button>
              <button
                style={{
                  background: four
                    ? color
                      ? "var(--green)"
                      : "var(--orenge)"
                    : "#00000000",
                }}
                onClick={() =>
                  setOne(false) ||
                  setTwo(false) ||
                  setThree(false) ||
                  setFour(true) ||
                  Func(datas_category[3].slug)
                }
                className="nav"
              >
                {datas_category[3] ? datas_category[3].name : ""}
              </button>
            </div>
          </div>
          {loadingCate ? (
            <div className="loading_div">
              <Loading />
            </div>
          ) : datas_method == [] ? (
            ""
          ) : (
            <div className="wrapper">
              {datas_method.map((el, index) =>
                el.logo ? (
                  <div
                    onClick={() =>
                      Name(el) || el.category == "cryptocurrency"
                        ? FuncMothed(el.category, el.slug)
                        : el.category == "fiat"
                        ? setModalForm(true) || Name(el)
                        : el.category == "terminals" || el.category == "cash"
                        ? funcText(el) || setModalText(true)
                        : alert("error")
                    }
                    key={index}
                    className="box"
                  >
                    <img src={el.logo} alt="" />
                    <div>
                      <h1>{el.currency}</h1>
                      <p>{el.name}</p>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          )}
          {modal &&
            (depozit.response == true ? (
              <div className="modal">
                <div onClick={() => setModal(false)} className="not"></div>
                <div className="modal_container">
                  <h1>{name.name} депозитный адрес</h1>
                  <p className="text-center" style={{textAlign:"center"}}>
                    Минимальная сумма ≈ 10 USDT.<br />
                    Если отправить криптовалюту на
                    неверный адрес (например, биткойн на адрес Bitcoin Cash),
                    криптовалюта будет потеряна
                  </p>
                  <img src={depozit.qrcode_url} alt="" className="deposit-qr-image"/>
                  <p className="address" style={{textAlign:"center"}}>
                    {name.name == "Tether" ? name.name + " TRC20" : name.name}{" "}
                    Адрес
                  </p>
                  <input
                    disabled={true}
                    type="text"
                    value={depozit.deposit_address}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <button onClick={handleCopyButtonClick} className="generate">
                    Скопировать
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal">
                <Loading />
              </div>
            ))}
          {modalForm && (
            <div className="modal">
              <div
                onClick={() =>
                  setModalForm(false) ||
                  setOpen(false) ||
                  setLoadingForm(true) ||
                  setValueForm("") ||
                  setForm([])
                }
                className="not"
              ></div>
              {open == true ? (
                <div className="modal_form">
                  <h1>Подтверждение платежа</h1>
                  <div className="save_form">
                    <div className="box_form">
                      <p>Сумма к зачислению</p>
                      <p className="form">
                        {form.confirm.debit} {form.confirm.currency}
                      </p>
                    </div>
                    <div className="box_form">
                      <p>Сумма к оплате</p>
                      <p className="form">
                        {form.confirm.amount} {form.confirm.currency}
                      </p>
                    </div>
                    <div className="box_form">
                      <p>Наша комиссия</p>
                      <p className="form">
                        {form.confirm.commission} {form.confirm.currency}
                      </p>
                    </div>
                  </div>
                  {React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: form.form },
                  })}
                </div>
              ) : (
                <div className="modal_form">
                  <h1>Пополнить через</h1>
                  <h1>"{name.name}"</h1>
                  <p> Комиссия {name.commission} %</p>
                  <form>
                    <input
                      value={valueForm}
                      onChange={(e) => setValueForm(e.target.value)}
                      type="number"
                      placeholder="Введите"
                    />
                    <button
                      disabled={loadingForm ? false : true}
                      style={{
                        background:
                          valueForm == ""
                            ? "#000"
                            : color
                            ? "var(--green)"
                            : "var(--orange)",
                      }}
                      onClick={() =>
                        valueForm == ""
                          ? setLoadingForm(true)
                          : FuncForm(name.category, name.slug, valueForm) ||
                            setLoadingForm(false)
                      }
                      className="btn"
                    >
                      {loadingForm ? "пополнить баланс" : <Loading2 />}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
          {modalText && (
            <div className="modal">
              <div onClick={() => setModalText(false)} className="not"></div>
              <div className="modal_text">
                <h1>Пополнить через {text.name}</h1>
                {React.createElement("p", {
                  dangerouslySetInnerHTML: {
                    __html: text.info.description ? text.info.description : "",
                  },
                })}
                <button onClick={() => setModalText(false)} className="btn">
                  Понятно
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopUp;
