import React from "react";
import "./BigInput.css";
export const BigInput: React.FC<{
  name: string;
  onGettingValue: (value: string) => void;
}> = (props) => {
  const onOptionCLick = (event: any) => {
    props.onGettingValue(event.currentTarget.value);
  };
  return (
    <form>
      <textarea
        placeholder={props.name}
        className="placeholder  message"
        onChange={(event) => {
          onOptionCLick(event);
        }}
      ></textarea>
    </form>
  );
};
