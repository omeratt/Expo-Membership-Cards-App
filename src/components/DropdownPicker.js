import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownPicker = ({ data, setToCompany }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  //   const [items, setItems] = useState(data);
  const [items, setItems] = useState(data);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={(val) => {
        // console.log(val.value);
        setToCompany(val);
        setValue(val);
      }}
      setItems={setItems}
    />
  );
};

export default DropdownPicker;
