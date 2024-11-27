import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styles from "./FormSelect.module.scss";

function FormSelect({ register, id, options }) {
  return (
    <FloatingLabel
      controlId="floatingSelectGrid"
      label="Format"
      className={`${styles.label} mb-3`}
    >
      <Form.Select
        className={`${styles.select} text-secondary border-secondary`}
        {...register(id, { onselect: (val) => console.log("val", val) })}
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
