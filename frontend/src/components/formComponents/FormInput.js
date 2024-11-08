import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

/**
 * @param {Object} param0 { id, label, type, placeholder }
 * @returns React form input component
 */
function FormInput({
  success,
  id,
  label,
  type,
  placeholder,
  className = "",
  register,
  required = false,
  inputError,
  callback = () => {},
  style = {},
  ...props
}) {
  const [value, setValue] = useState(null);
  const hasValue = value ? "" : "*";

  useEffect(() => setValue(null), [success]);

  return (
    <Form.Group className={`w-100 ${className}`}>
      <Form.Floating className="mb-3">
        <Form.Control
          onChange={(e) => callback(e)}
          style={{ ...style, ...getErrorColor("borderColor") }}
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, {
            required,
            onChange: (e) => {
              setValue(e.target.value.trim());
            },
          })}
          {...props}
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
