import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "./FormSelect.module.scss";

function FormSelect({ label, register, id, options, required = false }) {
  return (
    <FloatingLabel
      controlId="floatingSelectGrid"
      label={label}
      className={`${styles.label} mb-3`}
    >
      <Form.Select
        className={`${styles.select} text-secondary border-secondary`}
        {...register(id, { required })}
      >
        <option value="" className="text-secondary">
          Choose...
        </option>
        {options.map(({ key, value }) => (
          <option key={key} value={key} className="text-secondary">
            {value}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default FormSelect;
