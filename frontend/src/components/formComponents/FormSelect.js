import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "./FormSelect.module.scss";

function FormSelect({ register, id, options }) {
  return (
    <FloatingLabel
      controlId="floatingSelectGrid"
      label="Format"
      className={styles.label}
    >
      <Form.Select
        className={`${styles.select} text-secondary border-secondary`}
        {...register(id, { onselect: (val) => console.log("val", val) })}
      >
        <option value="" className="text-secondary">
          Choose...
        </option>
        {options.map((select) => (
          <option
            key={select.code}
            value={select.code}
            className="text-secondary"
          >
            {select.text}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
}

export default FormSelect;
