import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import FormInput from "../../components/formComponents/FormInput";
import Alert from "../../components/Alert.js";
import { useForm } from "react-hook-form";
import styles from "./Release.module.scss";
import { createPortal } from "react-dom";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/V1";

let count = 0;

function Release({ success, setSuccess }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { isDirty } = formState;

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [release, setRelease] = useState();
  const [formats, setFormats] = useState([]);

  console.log("RENDER:  (frontend > src > pages > Release.js)", ++count);

  const fetchData = useCallback(
    async (url, params) => {
      const res = await axios.get(url, { params });

      setFormats(res.data?.formatOptions);
      setRelease(res.data?.release);

      reset(res.data.release);
    },
    [reset]
  );

  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    fetchData("/releases", { id });
  }, [fetchData, id]);

  if (loading) {
    return (
      <div className="position-relative py-5">
        <Spinner />
      </div>
    );
  }

  const onSubmit = async (params) => {
    setLoading(true);

    if (id === "new") {
      console.log(id);

      try {
        const response = await axios.post("/releases", params);
        console.log("axios.post('/releases', params)", response);
        if (response.data.affectedRows) {
          setSuccess("Added!");
          navigate(pathname);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.put(`/releases?id=${id}`, params);

        if (response.data.changedRows) {
          setSuccess("Updated!");
        }
        console.log("axios.put('/releases?id={id}', params)", response);

        fetchData("/releases", { id });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (event) => {
    const isSubmitButtonFocused =
      document.activeElement && document.activeElement.type === "submit";

    if (event.key === "Enter" && !isSubmitButtonFocused) {
      event.preventDefault();
    }
  };

  const onError = (error) => {
    console.log("error", error);
  };

  return (
    <div className="container mt-5">
      {createPortal(
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />,
        document.body
      )}
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        onKeyDown={handleKeyDown}
      >
        {release && (
          <>
            <div className={styles.grid}>
              <FormInput
                disabled={loading}
                id="artist"
                label="Artist"
                type="text"
                placeholder="Artist"
                register={register}
              />
              <FormInput
                disabled={loading}
                id="title"
                label="Title"
                type="text"
                placeholder="Title"
                register={register}
              />
              <FormInput
                disabled={loading}
                id="year"
                label="Year"
                type="number"
                min={1950}
                max={2050}
                placeholder="Year"
                register={register}
              />
              <FloatingLabel controlId="floatingSelectGrid" label="Format">
                <Form.Select className="mb-3" {...register("format")}>
                  <option value="">Choose...</option>
                  {formats.map((format) => (
                    <option key={format.code} value={format.code}>
                      {format.text}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </div>
            <Button type="submit" disabled={!isDirty}>
              Submit
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default Release;
