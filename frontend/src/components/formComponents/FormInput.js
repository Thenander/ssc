import React from "react";
import Form from "react-bootstrap/Form";

/**
 * @param {Object} param0 { id, label, type, placeholder }
 * @returns React form input component
 */
function FormInput({
  success,
  disabled,
  id,
  label,
  type,
  placeholder,
  register,
  callback = () => {},
  required = false,
  className = "",
  style = {},
  min,
  max,
  ...props
}) {
  return (
    <Form.Group className={`w-100 ${className}`}>
      <Form.Floating className="mb-3">
        <Form.Control
          className="border-secondary"
          onChange={(e) => callback(e)}
          style={{ ...style }}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id, {
            min,
            max,
            required,
            setValueAs: (v) => v.toString(),
          })}
          {...props}
        />
        <label className="text-secondary" htmlFor={id}>
          {label}
        </label>
      </Form.Floating>
    </Form.Group>
  );
}

export default FormInput;
