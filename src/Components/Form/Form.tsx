import React, { useEffect, useState } from "react";
import DropdownList from "../DropdownList/DropdownList";
import DropdownListDown from "../DropdownListUnder/DropdownListDown";
import Input from "../Input/Input";
import "./Form.css";
const Form: React.FC = (props) => {
  const [email, getEmail] = useState("");
  const [name, getName] = useState("");
  const [comment, getComment] = useState("");
  const [service, getService] = useState("");
  const [symbols, getSymbols] = useState(0);
  const [price, showPrice] = useState(0);
  const [value, getValue] = useState("");
  const [deadline, showDeadline] = useState("");
  useEffect(() => {
    if (value && symbols) {
      coutingPriceAndDeadline(symbols, value);
    }
  }, [value]);
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
        date.setMinutes(date.getMinutes() + MINS_GAP);
      } else if (WORKING_HOURS_DAY_END <= h) {
        date.setDate(date.getDate() + 1);
        date.setHours(WORKING_HOURS_DAY_START);
        date.setMinutes(date.getMinutes() + MINS_GAP);
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
      normalizeHours(date);
    }
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

  const coutingPriceAndDeadline = (symbols: number, value: string) => {
    let price: number = 0;
    if (value === "Українська" || value === "Російська") {
      price = symbols * 0.05;
      price > 50 ? showPrice(price) : showPrice(50);
      let hours = Math.ceil(symbols / 1333);
      showDeadline(countingDeadline(new Date(), hours, 30));
    } else {
      price = symbols * 0.12;
      price > 120 ? showPrice(price) : showPrice(120);
      let hours = Math.ceil(symbols / 333);
      showDeadline(countingDeadline(new Date(), hours, 30));
    }
  };

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
        </div>
        <div>
          <textarea
            placeholder="Введіть текст"
            className="placeholder  message"
            onChange={(e) => {
              let symbols = e.target.value.replace(/\s/g, "").split("").length;
              getSymbols(symbols);
              if (value) {
                if (symbols) {
                  coutingPriceAndDeadline(symbols, value);
                } else {
                  showPrice(0);
                  showDeadline("");
                }
              }
            }}
          ></textarea>
        </div>
        <div className="row-div">
          <div className="block-column">
            <Input
              name={"Ваша електронна пошта"}
              margin={"0px"}
              onGettingValue={getEmail}
            />
          </div>
          <div className="block-column">
            <Input
              name={"Ваше ім'я"}
              margin={"30px"}
              onGettingValue={getName}
            />
          </div>
        </div>
        <div className="row-div">
          <div className="block-column">
            <Input
              name={"Коментар або покликання"}
              margin={"0px"}
              onGettingValue={getComment}
            />
          </div>
          <div className="block-column">
            <DropdownListDown
              name={changingName(service)}
              options={changingOptions(service)}
              onItemSelect={getValue}
            />
          </div>
        </div>
      </div>
      <div className="column-div">
        <h1 className="price">
          {parseFloat(price.toFixed(2))} <span className="currency">грн</span>
        </h1>
        <h1 className="deadline">{deadline}</h1>
        <div>
          <button
            className="orderButton"
            onClick={(e) => {
              e.preventDefault();
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
