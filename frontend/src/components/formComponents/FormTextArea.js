import React, { useEffect, useRef, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

/**
 * @param {Object} param0 { id, label, type, placeholder }
 * @returns React form input component
 */
function FormTextArea({
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
  ...props
}) {
  return (
    <Form.Group className={`w-100 ${className}`}>
      <Form.Floating className="mb-3">
        <Form.Control
          onInput={(e) => {
            e.target.style.height = "";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          as="textarea"
          className="border-secondary"
          onChange={(e) => callback(e)}
          style={{ scrollbarWidth: "none", ...style }}
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...register(id)}
          {...props}
        />
        <label className="text-secondary" htmlFor={id}>
          {label}
        </label>
      </Form.Floating>
    </Form.Group>
  );
}

export default FormTextArea;
