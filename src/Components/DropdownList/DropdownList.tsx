import React, { FC, memo, useCallback, useMemo, useRef,useState } from "react";

import "./DropdownList.css";
import img from './arrow_down.svg'


interface IProps {
  options: string[]
  name: string
  margin: string;
  onItemSelect: (value: string) => void;
}

const DropdownList: FC<IProps> = ({ options, name, onItemSelect,margin }: IProps) => {
  const onOptionCLick = useCallback((item: string) => {
    onItemSelect(item);
  },[onItemSelect])

  const [value,setValue] = useState('');
  const list = useRef<HTMLDivElement>(null);
  const selectHeader = useRef<HTMLDivElement>(null);
  const selectCurrent = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLDivElement>(null);
  const currentText = useRef<HTMLSpanElement>(null);

  function activatingList(options:string[]){
    if(options.length === 0){
      return 'select__header select-not-clikable'
    }else{
      return 'select__header'
    }
  }
  
  const openingSelect = (el:React.FormEvent<HTMLDivElement>)=>{
    el.currentTarget.parentElement?.classList.toggle("is-active");
    selectCurrent.current?.classList.remove("select__current");
    selectCurrent.current?.classList.remove("non-active");
    selectCurrent.current?.classList.add("active");
    icon.current?.classList.add("active_icon");
  }

  const settingValue = (el:React.FormEvent<HTMLDivElement>)=>{
    let text = el.currentTarget.innerText;

    list.current?.classList.toggle("is-active");
    icon.current?.classList.remove("active_icon");
    selectCurrent.current?.classList.remove("active");
    selectCurrent.current?.classList.add("non-active");
    setValue(text)
    
  }

  const select = useMemo(() => {
    return options.map((item, index) => (
      <div key={index} className="select__item" onClick={function(event){settingValue(event);onOptionCLick(item);}}>
        {item}
      </div>
    ));
  }, [options]);

  return (
    <div>
    <div className='select' ref={list} style={{marginLeft: margin}}>
      <div className={activatingList(options)}  ref={selectHeader} onClick={openingSelect}>
        <span className="select__current" ref={selectCurrent}>
          {name}
        </span>
        <span className="value" ref={currentText}>{value}</span>
        <div className="select__icon" ref={icon}>
          <img width="7px" height="7px" src={img} />
        </div>
      </div>
      <div className="select__body">{select}</div>
    </div>
    </div>
  );
};
export default memo(DropdownList);
