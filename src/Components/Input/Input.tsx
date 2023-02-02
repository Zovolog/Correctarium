import React, {  FC, useRef } from 'react';
import './Input.css';

interface IProps {
  name: string;
  margin: string;
  onGettingValue: (value: string) => void;
}

const Input: FC<IProps> = ({name,margin,onGettingValue}: IProps) => {

  const onOptionCLick = (event:any) => {
    onGettingValue(event.currentTarget.value);
  }

  const label = useRef<HTMLLabelElement>(null)
  const field = useRef<HTMLInputElement>(null)
  function addingStyle(el:React.FormEvent<HTMLInputElement>){
    if(el.currentTarget.value === ''){
      el.currentTarget.classList.remove('activeInput');
      label.current?.classList.remove('none');
    }else{
      el.currentTarget.classList.add('activeInput');
    }
      
  }

  function removingStyle(el:React.FormEvent<HTMLInputElement>){
    el.currentTarget.classList.remove('activeInput');
    if(field.current?.value===''){
      label.current?.classList.remove('none');
    }else{
      el.currentTarget.classList.remove('activeInput');
      label.current?.classList.add('none');
    }
    
  }

  return (
    <div className="form-item" style={{marginLeft:margin}}>
    <input type="text" className="form-input" onChange={(event)=>{onOptionCLick(event);addingStyle(event)}} onBlur={removingStyle} ref={field}/>
    <label className="form-label" ref={label}>{name}</label>
  </div>
  );
}

export default Input;

