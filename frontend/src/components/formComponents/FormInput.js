import React, { useState } from "react";
import Form from "react-bootstrap/Form";

/**
 * @param {Object} param0 { id, label, type, placeholder }
 * @returns React form input component
 */
function FormInput({
  id,
  label,
  type,
  placeholder,
  className = "",
  register,
  required = false,
  inputError,
}) {
  const [value, setValue] = useState();
  const hasValue = value ? "" : "*";

  return (
    <Form.Group className={`${className} w-100`}>
      <Form.Floating className="mb-3">
        <Form.Control
          style={getErrorColor("borderColor")}
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, {
            required,
            onChange: (e) => {
              setValue(e.target.value);
            },
          })}
        />
        <label
          style={getErrorColor("color")}
          htmlFor={id}
        >{`${label}${hasValue}`}</label>
      </Form.Floating>
    </Form.Group>
  );

  function getErrorColor(color) {
    return inputError && !value ? { [color]: "rgb(200 0 0)" } : {};
  }
}

export default FormInput;
