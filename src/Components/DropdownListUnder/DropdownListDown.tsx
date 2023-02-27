import React, { FC, memo, useCallback, useMemo, useRef, useState } from "react";

import "./DropdownListDown.css";
import img from "./arrow_down.svg";

interface IProps {
  options: string[];
  name: string;
  onItemSelect: (value: string) => void;
}

const DropdownListDown: FC<IProps> = ({
  options,
  name,
  onItemSelect,
}: IProps) => {
  const onOptionCLick = useCallback(
    (item: string) => {
      onItemSelect(item);
    },
    [onItemSelect]
  );

  const [value, setValue] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const selectHeader = useRef<HTMLDivElement>(null);
  const selectCurrent = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLDivElement>(null);
  const currentText = useRef<HTMLSpanElement>(null);

  const openingSelect = (
    el: React.FormEvent<HTMLDivElement>,
    options: string[]
  ) => {
    if (options.length === 0) {
      selectHeader.current?.classList.add("select-not-clikable");
    } else {
      selectHeader.current?.classList.add("blue-border");
      if (list.current?.classList.value === "select is-active") {
        console.log(1);
        list.current?.classList.remove("is-active");
        icon.current?.classList.remove("active_icon");
      } else {
        list.current?.classList.add("is-active");
        icon.current?.classList.add("active_icon");
      }
    }
  };

  const settingValue = (el: React.FormEvent<HTMLDivElement>) => {
    let text = el.currentTarget.innerText;
    icon.current?.classList.remove("active_icon");
    selectCurrent.current?.classList.remove("select__current");
    selectCurrent.current?.classList.remove("non-active");
    list.current?.classList.remove("is-active");
    selectCurrent.current?.classList.add("active");
    setValue(text);
  };

  const unFocus = (el: React.FormEvent<HTMLDivElement>) => {
    selectHeader.current?.classList.remove("select-not-clikable");
    selectHeader.current?.classList.remove("blue-border");
    list.current?.classList.remove("is-active");
    if (value != "") {
      selectCurrent.current?.classList.add("non-active");
      selectCurrent.current?.classList.remove("select__current");
      icon.current?.classList.remove("active_icon");
    }
    list.current?.classList.remove("is-active");
    selectCurrent.current?.classList.remove("active");
    icon.current?.classList.remove("active_icon");
  };

  const select = useMemo(() => {
    return options.map((item, index) => (
      <div
        key={index}
        className="select__item"
        onClick={function (event) {
          settingValue(event);
          onOptionCLick(item);
        }}
      >
        {item}
      </div>
    ));
  }, [options]);

  return (
    <div>
      <div
        className="select"
        ref={list}
        style={{ marginLeft: "30px" }}
        onBlur={unFocus}
        tabIndex={0}
      >
        <div
          ref={selectHeader}
          onClick={(e) => {
            openingSelect(e, options);
          }}
          className="select__header"
        >
          <span className="select__current" ref={selectCurrent}>
            {name}
          </span>
          <span className="value" ref={currentText}>
            {value}
          </span>
          <div className="select__icon" ref={icon}>
            <img width="7px" height="7px" src={img} />
          </div>
        </div>
        <div className="select__body">{select}</div>
      </div>
    </div>
  );
};
export default memo(DropdownListDown);
