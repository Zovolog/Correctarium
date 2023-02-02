import React, { useState } from "react";
import { BigInput } from "../BigInput/BinInput";
import DropdownList from "../DropdownList/DropdownList";
import Input from "../Input/Input";
import "./Form.css";
const Form: React.FC = (props) => {
  const [email, getEmail] = useState("");
  const [name, getName] = useState("");
  const [comment, getComment] = useState("");
  const [service, getService] = useState("");
  const [text, getText] = useState("");
  const [price, showPrice] = useState(0);
  const [value, getValue] = useState("");
  const [deadline, showDeadline] = useState("");

  const [validationEmail, showValidationEmail] = useState("");
  const [validationComment, showValidationComment] = useState("");
  const [validationService, showValidationService] = useState("");
  const [validationText, showValidationText] = useState("");
  const [validationName, showValidationName] = useState("");
  const [validationValue, showValidationValue] = useState("");

  function countingDeadline(
    date: any,
    hoursShiftInitial: number,
    MINS_GAP: number
  ) {
    const WORKING_HOURS_PER_DAY = 9;
    const WORKING_HOURS_DAY_START = 10;
    const WORKING_HOURS_DAY_END = 19;
    const SATURDAY_INDEX = 6;
    const SUNDAY_INDEX = 7;
    const DAYS_IN_WEEK = 7;
    const hoursShift = hoursShiftInitial % WORKING_HOURS_PER_DAY;
    const daysShift = Math.floor(hoursShiftInitial / WORKING_HOURS_PER_DAY);

    function normalizeHours(date: any) {
      const h = date.getHours();
      if (h < WORKING_HOURS_DAY_START) {
        date.setHours(WORKING_HOURS_DAY_START);
        date.setMinutes(0);
      } else if (WORKING_HOURS_DAY_END <= h) {
        date.setDate(date.getDate() + 1);
        date.setHours(WORKING_HOURS_DAY_START);
        date.setMinutes(0);
      }
    }

    function normalizeDays(date: any) {
      const d = date.getDay();
      switch (d) {
        case SATURDAY_INDEX:
          date.setDate(date.getDate() + DAYS_IN_WEEK - SATURDAY_INDEX + 1);
          break;
        case SUNDAY_INDEX:
          date.setDate(date.getDate() + DAYS_IN_WEEK - SUNDAY_INDEX + 1);
          break;
        default:
          break;
      }
    }

    normalizeHours(date);
    normalizeDays(date);

    for (let index = 0; index < hoursShift; index++) {
      date.setHours(date.getHours() + 1);
    }
    date.setMinutes(date.getMinutes() + MINS_GAP);
    normalizeHours(date);
    normalizeDays(date);

    for (let index = 0; index < daysShift; index++) {
      date.setDate(date.getDate() + 1);
      normalizeDays(date);
    }

    date.setSeconds(0);
    return date.toLocaleString();
  }

  const changingOptions = (service: string) => {
    if (service === "Редагування") {
      return ["Українська", "Російська", "Англійська", "Англійська(носій)"];
    } else if (service === "Переклад") {
      return [
        "Українська/російська - англійська",
        "Англійська - українська",
        "Англійська - російська",
        "Російська - українська",
        "Українська - російська",
      ];
    } else {
      return [];
    }
  };

  const changingName = (service: string) => {
    if (service === "Переклад") {
      return "Мовні пари";
    } else {
      return "Мова";
    }
  };

  const coutingPriceAndDeadline = (text: string, value: string) => {
    let symbols = text.replace(/\s/g, "").split("").length;

    let price = 0;

    if (value === "Українська" || value === "Російська") {
      price = symbols * 0.05;
      price > 50 ? showPrice(price) : showPrice(50);
      let hours = Math.ceil(symbols / 1333);
      if (hours === 1) {
        showDeadline(countingDeadline(new Date(), hours, 30));
      } else {
        showDeadline(countingDeadline(new Date(), hours, 0));
      }
    } else {
      price = symbols * 0.12;
      price > 50 ? showPrice(price) : showPrice(120);
      let hours = Math.ceil(symbols / 333);
      if (hours === 1) {
        showDeadline(countingDeadline(new Date(), hours, 30));
      } else {
        showDeadline(countingDeadline(new Date(), hours, 60));
      }
    }
  };

  const validation = (e: any) => {
    text === "" ? showValidationText("Введіть текст") : showValidationText("");
    email === ""
      ? showValidationEmail("Введіть пошту")
      : showValidationEmail("");
    name === "" ? showValidationName("Введіть імя") : showValidationName("");
    service === ""
      ? showValidationService("Виберіть послугу")
      : showValidationService("");
    comment === ""
      ? showValidationComment("Виберіть мову")
      : showValidationComment("");
    value === ""
      ? showValidationValue("Виберіть мову")
      : showValidationValue("");
  };

  function isField(e: any) {
    let count = 0;
    text !== "" ? count++ : (count = 0);
    email !== "" ? count++ : (count = 0);
    service !== "" ? count++ : (count = 0);
    comment !== "" ? count++ : (count = 0);
    value !== "" ? count++ : (count = 0);
    if (count === 5) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <form className="form">
      <div className="column-div">
        <div className="block-column">
          <DropdownList
            name="Послуга"
            options={["Редагування", "Переклад"]}
            onItemSelect={getService}
            margin="0px"
          />
          <p className="validation-message">{validationService}</p>
        </div>
        <div>
          <BigInput name={"Введіть текст"} onGettingValue={getText} />
          <p className="validation-message">{validationText}</p>
        </div>
        <div className="row-div">
          <div className="block-column">
            <Input
              name={"Ваша електронна пошта"}
              margin={"0px"}
              onGettingValue={getEmail}
            />
            <p className="validation-message">{validationEmail}</p>
          </div>
          <div className="block-column">
            <Input
              name={"Ваше ім'я"}
              margin={"30px"}
              onGettingValue={getName}
            />
            <p className="validation-message">{validationName}</p>
          </div>
        </div>
        <div className="row-div">
          <div className="block-column">
            <Input
              name={"Коментар або покликання"}
              margin={"0px"}
              onGettingValue={getComment}
            />
            <p className="validation-message">{validationComment}</p>
          </div>
          <div className="block-column">
            <DropdownList
              name={changingName(service)}
              options={changingOptions(service)}
              onItemSelect={getValue}
              margin="30px"
            />
            <p className="validation-message">{validationValue}</p>
          </div>
        </div>
      </div>
      <div className="column-div">
        <h1 className="price">{price} грн</h1>
        <h1 className="deadline">{deadline}</h1>
        <div>
          <button
            className="orderButton"
            onClick={(e) => {
              e.preventDefault();
              validation(e);
              if (isField(e)) {
                coutingPriceAndDeadline(text, value);
              }
            }}
          >
            Зробити замовлення
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
