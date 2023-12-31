import React, { useState, useEffect } from "react";
import "./Settings.css";
import { FaPen } from "react-icons/fa";
import password from "../../img/password.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsClockHistory, BsCheckCircle } from "react-icons/bs";
import { ImNotification } from "react-icons/im";
import { MdOutlineNotInterested } from "react-icons/md";
import { url } from "../../api";
import axios from "axios";
import Loading from "../../components/IU/loading/loading";
import turn from "../../img/turn.svg";
import { Alert } from "../../components/IU/alert/alert";
import Loading2 from "../../components/IU/loading2/loading2";
import Authenticator from "../Authenticator/Authenticator";

const Settings = ({
  color,
  datas_personal,
  personalChange,
  personal,
  setPersonal,
  is2faEnabled,
}) => {
  const [countryModal, setCountryModal] = useState(false);
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [date, setDate] = useState("");
  const [passwordId, setPasswordId] = useState("");
  const [innData, setInnData] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [countryApp, setCountryApp] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [visible2, setVisible2] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [local, setLocal] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [imageUrlPassport, setImageUrlPassport] = useState(null);
  const [imageUrlAddress, setImageUrlAddress] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState(true);
  const [account, setAccount] = useState(false);
  const [safety, setSafety] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const countryArray = Object.values(countryData).map((data) => data);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [imgPassport, setImgPassport] = useState();
  const [imgAddress, setImgAddress] = useState();
  const [modal2fa, setModal2fa] = useState(false);
  const [modal2f, setModal2f] = useState(false);

  const [data2fa, setData2fa] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${local}`,
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files && event.target.files[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      const formData = new FormData();
      formData.append("photo", imageFile);
      axios
        .post(url + "/profile/personal/edit", formData, { headers })
        .then((response) => {
          Alert("success", response.data.messages);
          personalChange();
        })
        .catch((error) => {
          alert.error("Ошибка загрузки изображения:", error);
        });
    }
  };
  const renderImagePreview = () => {
    if (selectedImage) {
      return <img src={URL.createObjectURL(selectedImage)} alt="Preview" />;
    } else {
      return (
        <img src={datas_personal ? datas_personal[0].avatar : ""} alt="" />
      );
    }
  };
  const updateData = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Alert("error", "Новый пароль и повторный ввод пароля не совпадают!");
      return;
    }
    try {
      const newData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      const response = await axios.post(url + `/profile/password`, newData, {
        headers,
      });
      Alert("success", response.data.messages);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setVisible1(false);
      setVisible2(false);
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };
  const NameChange = async (e) => {
    e.preventDefault();
    try {
      const newDataName = {
        firstname,
        lastname,
      };
      const response = await axios.post(
        url + `/profile/personal/edit-profile`,
        newDataName,
        {
          headers,
        }
      );
      if (response.data.response == true) {
        Alert("success", response.data.messages);
        personalChange();
      }
    } catch (error) {
      Alert("error", error.response.data.messages);
    }
  };

 function photoPassport(event) {
   const imageFile = event.target.files[0];
   if (imageFile) {
     setImageUrlPassport(imageFile);
   }
 }

 function photoAddress(event) {
   const imageFile = event.target.files[0];
   if (imageFile) {
     setImageUrlAddress(imageFile);
   }
 }
  console.log(imageUrlPassport);

const VerificationChange = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append("firstname", name);
    formData.append("lastname", last);
    formData.append("date_birth", date);
    formData.append("passport_id", passwordId);
    formData.append("inn", innData);
    formData.append("country", countryApp);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("photo_passport", imageUrlPassport);
    formData.append("photo_address", imageUrlAddress);

    const response = await axios.post(url + `/profile/verification`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
    });
    console.log(response.data);
    setLoading(false);
  } catch (error) {
    Alert(
      "error",
      error.response.data ? `error: ${error.response.data}` : "error"
    );
    setLoading(false);
  }
};

  useEffect(() => {
    if (local) {
      axios
        .get(url + "/countries/", { headers })
        .then((response) => {
          setCountryData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [local]);

  function countryFunc(count) {
    setCountry(count.name);
    setCountryApp(count.code);
  }

  const handle2faGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/profile/security/2fa/generate/",
        null,
        { headers }
      );
      setLoading(false);
      if (response.status === 200) {
        setData2fa(response.data.security);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setLoading(false);
      setData2fa("Ошибка при выполнении запроса");
    }
  };

  return (
    <div className="settings">
      {datas_personal[0] ? (
        <div className="container">
          <div className="header_set">
            <h1>Настройки аккаунта</h1>
            <div className="menu_set">
              <button
                style={{ background: profile ? "var(--green)" : "#00000000" }}
                onClick={() =>
                  setProfile(true) || setAccount(false) || setSafety(false)
                }
                className="nav"
              >
                Настройки профиля
              </button>
              <button
                style={{ background: account ? "var(--green)" : "#00000000" }}
                onClick={() =>
                  setProfile(false) || setAccount(true) || setSafety(false)
                }
                className="nav"
              >
                Верификация акаунта
              </button>
              <button
                style={{ background: safety ? "var(--green)" : "#00000000" }}
                onClick={() =>
                  setProfile(false) || setAccount(false) || setSafety(true)
                }
                className="nav"
              >
                Безопасность
              </button>
            </div>
          </div>
          {profile && (
            <div className="wrapper">
              <div className="wrapper_set">
                <div className="not_arrowed">
                  <div className="user">
                    <form onSubmit={handleImageChange}>
                      <label>
                        {renderImagePreview()}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </form>
                    <div className="user_data">
                      <p>Фотография</p>
                      <p>профиля</p>
                    </div>
                    <FaPen className="icon" size={20} />
                  </div>
                  <form onSubmit={NameChange} className="not_input">
                    <input
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      type="text"
                      placeholder="Имя"
                    />
                    <input
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      type="text"
                      placeholder="Фамилия"
                    />
                    <input
                      className="disabled"
                      disabled={true}
                      type="text"
                      placeholder="Номер Телефона"
                    />
                    <input
                      className="disabled"
                      disabled={true}
                      value={
                        datas_personal[0].email ? datas_personal[0].email : ""
                      }
                      type="text"
                      placeholder="Электронная почта"
                    />
                    <button onSubmit={NameChange} className="save">
                      Сохранить
                    </button>
                  </form>
                </div>
              </div>
              <form onSubmit={updateData}>
                <div className="wrapper_set">
                  <img className="pass" src={password} alt="" />
                  <input
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    type="text"
                    placeholder="Старый пароль"
                  />
                  <h1>Новый пароль</h1>
                  <div className="relative">
                    <input
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="password"
                      type={visible1 ? "text" : "password"}
                      placeholder="Придумайте пароль"
                    />
                    <div
                      className="span-icon"
                      onClick={() => setVisible1(!visible1)}
                    >
                      {" "}
                      {visible1 ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="password"
                      type={visible2 ? "text" : "password"}
                      placeholder="Повторите новый пароль"
                    />
                    <div
                      className="span-icon"
                      onClick={() => setVisible2(!visible2)}
                    >
                      {" "}
                      {visible2 ? <FaEye /> : <FaEyeSlash />}{" "}
                    </div>
                  </div>
                  <button type="submit" className="save">
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          )}
          {account && (
            <div
              className="wrapper_account"
              style={{
                display: "grig",
                gridTemplateColumns:
                  datas_personal[0].verification.value == 2 ||
                  datas_personal[0].verification.value == 3
                    ? "1fr"
                    : "1fr 1fr",
              }}
            >
              <div
                style={{
                  display:
                    datas_personal[0].verification.value == 2 ||
                    datas_personal[0].verification.value == 3
                      ? "none"
                      : "block",
                }}
                className="wrapper_set"
              >
                <form onSubmit={VerificationChange} className="verification">
                  <label>Имя</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Имя"
                    required
                  />
                  <label>Фамилия</label>
                  <input
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    type="text"
                    placeholder="Фамилия"
                    required
                  />
                  <label>Дата рождения</label>
                  <input
                    id="date_data"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                    required
                  />
                  <label>ID паспорта</label>
                  <input
                    value={passwordId}
                    onChange={(e) => setPasswordId(e.target.value)}
                    type="text"
                    placeholder="ID паспорта"
                    required
                  />
                  <label>ИНН</label>
                  <input
                    value={innData}
                    onChange={(e) => setInnData(e.target.value)}
                    type="number"
                    placeholder="ИНН"
                    required
                  />
                  <label>Страна</label>
                  <div className="country">
                    <div
                      className="select_input"
                      onClick={() => setCountryModal(!countryModal)}
                    ></div>
                    <input
                      className="absolute"
                      value={country}
                      disabled={true}
                      onChange={(e) => setCountry(e.target.value)}
                      type="text"
                      placeholder="Страна"
                      required
                    />
                    <TiArrowSortedDown
                      onClick={() => setCountryModal(!countryModal)}
                      className="icon_arrows_country"
                      style={{
                        color: color ? "var(--green)" : "var(--orange)",
                      }}
                      size={30}
                    />
                    {countryModal && (
                      <>
                        <div
                          onClick={() => setCountryModal(false)}
                          className="select_country_not"
                        ></div>
                        <div className="select_country">
                          {countryArray[0].map((el) => (
                            <div
                              key={el.id}
                              onClick={() =>
                                countryFunc(el) || setCountryModal(false)
                              }
                              className="box_counrty"
                            >
                              <p>{el.name}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <label>Город</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="Город"
                    required
                  />
                  <label>Адрес</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Адрес"
                    required
                  />
                  <div className="image_data">
                    <label>
                      {imageUrlPassport ? (
                        <img
                          className="img_app"
                          src={URL.createObjectURL(imageUrlPassport)}
                          alt=""
                        />
                      ) : (
                        <div className="btn_data">Добавить фото паспорта</div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={photoPassport}
                        style={{ display: "none" }}
                      />
                    </label>
                    <label>
                      {imageUrlAddress ? (
                        <img
                          className="img_app"
                          src={URL.createObjectURL(imageUrlAddress)}
                          alt=""
                        />
                      ) : (
                        <div className="btn_data">Добавить фото адреса</div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={photoAddress}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <button
                    disabled={loading}
                    onClick={VerificationChange}
                    className="save"
                  >
                    {loading ? <Loading2 /> : "Отправить"}
                  </button>
                </form>
              </div>
              {datas_personal[0].verification.value == 1 ? (
                <p className="activeited_false">
                  {datas_personal[0].verification.name}
                  <ImNotification
                    className="icon_ver"
                    color="#e25c5c"
                    size={100}
                  />
                </p>
              ) : datas_personal[0].verification.value == 2 ? (
                <p className="activeited_true">
                  {datas_personal[0].verification.name}
                  <BsCheckCircle
                    className="icon_ver"
                    color="var(--green)"
                    size={100}
                  />
                </p>
              ) : datas_personal[0].verification.value == 3 ? (
                <p className="activeited_norm">
                  {datas_personal[0].verification.name}
                  <BsClockHistory
                    className="icon_ver"
                    color="yellow"
                    size={100}
                  />
                </p>
              ) : datas_personal[0].verification.value == 4 ? (
                <p className="activeited_not">
                  {datas_personal[0].verification.name}
                  <MdOutlineNotInterested
                    className="icon_ver"
                    color="red"
                    size={100}
                  />
                </p>
              ) : (
                ""
              )}
            </div>
          )}
          {safety && (
            <div className="capsula">
              <img src={turn} alt="" />
              <div>
                <p>
                  Используется для ввода кода подтверждения Google при снятии и
                  изменении настроек безопасности
                </p>
                {is2faEnabled === false && (
                  <button
                    style={{ background: "var(--green)" }}
                    className="turn"
                    onClick={() => {
                      handle2faGenerate();
                      setModal2fa(!modal2fa);
                    }}
                  >
                    Включить
                  </button>
                )}
                {is2faEnabled === true && (
                  <button
                    style={{ background: "var(--orange)" }}
                    className="turn"
                    onClick={() => {
                      setModal2f(!modal2f);
                    }}
                  >
                    Отключить
                  </button>
                )}
              </div>
            </div>
          )}
          <Authenticator
            is2faEnabled={is2faEnabled}
            data2fa={data2fa}
            setModal2fa={setModal2fa}
            modal2fa={modal2fa}
            setModal2f={setModal2f}
            modal2f={modal2f}
          />
        </div>
      ) : (
        <div className="loading_div">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Settings;
