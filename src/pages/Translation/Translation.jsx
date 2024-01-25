import React, {useEffect, useState} from "react";
import "./Translation.css";
import {Alert} from "../../components/IU/alert/alert";
import axios from "axios";
import {url} from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/IU/loading/loading";
import Loading2 from "../../components/IU/loading2/loading2";

const data = [
    {
        id: 1,
        one: 1,
        text: "Выберите токен и адрес для вывода",
        project:
            "Выберите токен и сеть для вывода средств, вставьте адрес вывода на этой странице.",
    },
    {
        id: 2,
        one: 2,
        text: "Подтверждение перевода",
        project: "Пожалуйста, подождите подтверждения перевода в блокчейн-сети.",
    },
    {
        id: 3,
        one: 3,
        text: "Вывод средств успешно выполнен.",
        project:
            "Блокчейн-сеть подтвердила перевод.  переведет актив на ваш адрес для вывода.",
    },
];

const Translation = ({datas_tran, color, balanceTether}) => {
    const {currancy} = useParams();
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [modal, setModal] = useState(true);
    const [local, setLocal] = useState("");
    const [dataCar, setDataCar] = useState([]);
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [networkUse, setNetworkUse] = useState("");
    const [select, setSelect] = useState(false);
    const [datas, setDatas] = useState([]);
    const [commiss, setCommiss] = useState([]);
    const navigate = useNavigate();
    const [commissions, setCommissions] = useState([]);
    const [datasCurApp, setDatasCurApp] = useState([]);
    const [modalShow, setModalShow] = useState(false)
    const [code, setCode] = useState('')
    const tran = datas_tran
        .filter((obj) => {
            return obj.currency.includes(currancy);
        })
        .map((el) => el);
    const datasCur = Object.values(datasCurApp).map((data) => data);
    function withdraw(cur) {
        setDataCar(cur);
    }

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
                .get(url + `/cashout/parameters/${currancy}`, {headers})
                .then((response) => {
                    setDatasCurApp(response.data.parameters.networks);
                    setCommissions(response.data.parameters.commission);
                })
                .catch((error) => {
                    Alert("error", error.response.data.messages);
                    navigate("/dashboard/translation");
                });
        }
    }, [local]);

    const withdrawFunc = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newData = {
                sum: summa,
                currency: tran[0].currency,
                wallet: networkUse,
                network: dataCar.network ? dataCar.network : datasCur[0].network,
            };
            const response = await axios.post(url + "/cashout/create", newData, {
                headers,
            });
            console.log(response)
            setDatas(response.data);
            setModal(true);
        } catch (error) {
            Alert("error", error.response.data.messages);
            setLoading(false);
        }
    };

    function FuncConfirm(id) {
        setLoading2(true);
        if (local) {
            axios
                .post(url + `/cashout/confirm/${id}`, {
                    '2fa_otp': code,
                }, {headers: headers})
                .then((response) => {
                    console.log(response)
                    setModal(false);
                    Alert("success", "успешно!");
                    if (response.data.response === true) {
                        navigate("/dashboard/operations");
                        setModalShow(false)
                    }
                    balanceTether();
                })
                .catch((error) => {
                        if (error.response.data.security === "2fa") {
                        setModalShow(true)
                    }
                    Alert("error", error.response.data.messages);
                    setLoading2(false);
                });
        }
    }

    useEffect(() => {
        if (datasCur[0]) {
            const comm = dataCar.commission
                ? dataCar.commission
                : datasCur[0].commission
                    ? datasCur[0].commission
                    : "";
            setCommiss(comm);
        }
    });
    const summa = value2 === "" ? "0" : value2 - commiss;

    return (
      <div id="translation">
        {datasCur[0] ? (
          <div className="container">
            <div className="translation_all_block">
              {data.map((el, id) => (
                <div className="display_flex_ll" key={id}>
                  <div className="div">
                    <h2 color={color ? "var(--green)" : "var(--orange)"}>
                      {el.one}
                    </h2>
                  </div>
                  <div className="content">
                    <h1>{el.text}</h1>
                    <p>{el.project}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="tether">
              <div className="user_usdt">
                <div className="create">
                  <div className="create_capital">
                    <h3>Минимальная сумма</h3>
                    <h2>
                      {" "}
                      {dataCar.min_qty
                        ? dataCar.min_qty
                        : datasCur[0].min_qty}{" "}
                    </h2>
                  </div>
                  <div className="create_capital mat">
                    <h3>Наша комиссия</h3>
                    <h2>{commissions ? commissions : "-"}</h2>
                  </div>
                </div>
                <div className="create one_cre">
                  <div className="create_capital">
                    <h3>Комиссия сети</h3>
                    <h2>
                      {dataCar.commission
                        ? dataCar.commission
                        : datasCur[0].commission}
                    </h2>
                  </div>
                  <div className="create_capital">
                    <h3>Максимальная сумма</h3>
                    <h2>
                      {dataCar.max_qty ? dataCar.max_qty : datasCur[0].max_qty}
                    </h2>
                  </div>
                </div>
                <form onSubmit={withdrawFunc}>
                  <label>Сеть</label>
                  <div className="relative">
                    <input
                      disabled={select ? true : false}
                      className="input"
                      onClick={() => setSelect(!select)}
                      type="text"
                      value={
                        dataCar.network ? dataCar.network : datasCur[0].network
                      }
                      onChange={(e) => setValue1(e.target.value)}
                      placeholder="Выберите сеть вывода средств"
                    />
                    {select && (
                      <>
                        <div
                          onClick={() => setSelect(false)}
                          className="not"
                        ></div>
                        <div
                          onClick={() => setSelect(false)}
                          className="select_div"
                        >
                          {datasCur.map((el, index) => (
                            <div
                              key={index}
                              onClick={() => withdraw(el)}
                              className="select_box"
                            >
                              <p>{el.network}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <label>Сумма отправления</label>
                  <input
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                    type="text"
                    placeholder="Сумма отправления"
                  />
                  <label>Cумма к получению</label>
                  <input
                    className="not_allowed"
                    disabled={true}
                    value={summa}
                    type="text"
                    placeholder="Cумма к получению"
                  />
                  <label>Номер {tran.currency} кошелька</label>
                  <input
                    value={networkUse}
                    onChange={(e) => setNetworkUse(e.target.value)}
                    type="text"
                    placeholder={`Введите номер ${
                      dataCar.network ? dataCar.network : datasCur[0].network
                    } кошелька *`}
                  />
                  <button
                    disabled={loading}
                    onClick={withdrawFunc}
                    className="btn"
                  >
                    {loading ? <Loading2 /> : "Продолжить"}
                  </button>
                </form>
                {modal &&
                  (datas.response == true ? (
                    <div className="modal">
                      <div
                        onClick={() =>
                          setModal(false) ||
                          setLoading(false) ||
                          setLoading2(false)
                        }
                        className="not_confirm"
                      ></div>
                      <div className="save_form">
                        <h1>Подтвердите действия</h1>
                        <div className="box_form">
                          <p>Сумма к списанию</p>
                          <p className="form">
                            {parseFloat(value2).toFixed(tran.decimal)}
                          </p>
                        </div>
                        <div className="box_form">
                          <p>Сумма к зачислению</p>
                          <p className="form">{datas.confirm.amount}</p>
                        </div>
                        <div className="box_form">
                          <p>Комиссия сети</p>
                          <p className="form">{datas.confirm.commission}</p>
                        </div>
                        <div className="box_form">
                          <p>Валюта</p>
                          <p className="form">{datas.confirm.currency}</p>
                        </div>
                        <button
                          disabled={loading2}
                          onClick={() => FuncConfirm(datas.confirm.id)}
                          className="btn_confirm"
                        >
                          {loading2 ? <Loading2 /> : "Потвердить"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    setModal(false) || setLoading2(false) || setLoading(false)
                  ))}
              </div>
              <div className="noticw_div">
                <div className="notice">
                  <h1>Уведомление об выводе</h1>
                  <p className="pro">
                    Наслаждайтесь нулевой комиссией и быстрой скоростью вывода
                    средств на кастодиальный кошелек.
                  </p>
                  <p className="pro">
                    В настоящее время обрабатывает все связанные с этим деловые
                    вопросы в соответствии с последними правилами соответствия,
                    запущенными корейскими платформами. Пожалуйста, не выводите
                    средства на платформы Upbit или Coinone до завершения
                    процесса, иначе вы можете потерять свои активы.
                  </p>
                  <p className="coin">
                    Пожалуйста, не отправляйте средства на адрес ICO или для
                    краудфандинга. Мы не несем ответственности за
                    распространение любых будущих токенов, которые вы можете
                    получить.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading_div">
            <Loading />
          </div>
        )}
        {modalShow === true && (
          <div className="modal_login" onClick={() => setModalShow(false)}>
            <div className="login_modal" onClick={(e) => e.stopPropagation()}>
              <h2>Двухфакторная аутентификация</h2>
              <p>Зайдите в свой аунтефикатор и введите полученный код</p>
              <form
                className="from"
                onSubmit={(e) => {
                  e.preventDefault();
                  FuncConfirm(datas.confirm.id, code);
                }}
              >
                <input
                  type="number"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Введите защитный код *"
                  required
                />
                <button
                  disabled={loading2}
                  onClick={() => FuncConfirm(datas.confirm.id, code)}
                  className="btn_confirm"
                >
                  {loading2 ? <Loading2 /> : "Потвердить"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default Translation;
