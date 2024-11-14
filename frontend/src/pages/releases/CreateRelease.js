import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormSelect } from "react-bootstrap";
import axios from "axios";
import Releases from "./Releases";
import FormInput from "../../components/formComponents/FormInput";

function CreateRelease() {
  const { register, handleSubmit } = useForm();

  const [formats, setFormats] = useState([]);

  useEffect(() => {
    getFormats();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Add new release</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          id="title"
          label="Title"
          placeholder="Title"
          required={true}
        />
        <FormInput
          register={register}
          id="artist"
          label="Artist"
          placeholder="Artist"
          required={true}
        />
        <FormInput
          register={register}
          id="year"
          label="Year"
          placeholder="Year"
          required={true}
        />
        <Form.Floating className="mb-3">
          <FormSelect id="floatingSelect" {...register("type")}>
            <option value="">Välj...</option>
            {formats.map((props) => {
              const { id, format, text } = props;
              return (
                <option key={id} value={format}>
                  {text}
                </option>
              );
            })}
          </FormSelect>
          <label for="floatingSelect">Format</label>
        </Form.Floating>
        <div className="w-100 d-flex justify-content-end">
          <Button
            type="submit"
            onClick={() => {
              console.log("Submitted!");
            }}
          >
            Add release
          </Button>
        </div>
      </Form>
      <Releases />
    </div>
  );

  async function onSubmit(params) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/V1/releases/add",
        params
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(params);
  }

  async function getFormats() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/V1/releases/types"
      );
      setFormats(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default CreateRelease;
