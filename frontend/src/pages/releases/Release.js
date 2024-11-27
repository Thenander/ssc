import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Release.module.scss";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

const formValues = {
  title: "",
  artist: "",
  year: "",
  format: "",
};

function Release({ setSuccess, reFetch }) {
  //////////////
  // useHooks //
  //////////////

  const { register, formState, handleSubmit, reset, watch } = useForm();
  const { isDirty } = formState;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const watchTitle = watch("title");

  const buttonLabel = id === "new" ? "Add new release" : "Update release";

  ///////////////
  // useStates //
  ///////////////

  const [loading, setLoading] = useState(true);
  const [release, setRelease] = useState();
  const [formats, setFormats] = useState([]);

  ///////////
  // Fetch //
  ///////////

  const fetchData = useCallback(
    async (url, params) => {
      const res = await axios.get(url, { params });

      setFormats(res.data?.formatOptions);
      setRelease(res.data?.release);

      reset(res.data.release);
    },
    [reset]
  );

  ////////////////
  // useEffects //
  ////////////////

  useEffect(() => {
    if (id === "new") {
      console.log("nurå?");

      reset(formValues);
      setLoading(false);
    }
  }, [id, reset]);

  useEffect(() => {
    fetchData("/releases", { id });
    setLoading(false);
  }, [fetchData, id]);

  /////////////
  // Returns //
  /////////////

  return (
    <>
      <Spinner loading={loading} />
      <div className="container mt-5">
        <h3 style={{ color: "#ffffffde" }}>{watchTitle}</h3>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          onKeyDown={handleKeyDown}
        >
          {release && (
            <>
              <div className={classes.grid}>
                <FormInput
                  disabled={loading}
                  id="artist"
                  label="Artist"
                  type="text"
                  placeholder="Artist"
                  register={register}
                  required
                />
                <FormInput
                  disabled={loading}
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  register={register}
                  required
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
                  required
                />
                {formats && (
                  <FormSelect
                    register={register}
                    id="format"
                    options={formats}
                  />
                )}
              </div>
              <Button
                type="submit"
                disabled={!isDirty}
                variant="primary"
                className="text-light"
              >
                {buttonLabel}
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );

  //////////////
  // Handlers //
  //////////////

  async function onSubmit(params) {
    if (id === "new") {
      try {
        setLoading(true);
        const response = await axios.post("/releases", params);

        if (response.data.affectedRows) {
          setSuccess("New release added!");
          navigate(pathname);
          reFetch();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.put(`/releases?id=${id}`, params);

        if (response.data.changedRows) {
          setSuccess("Release updated!");
          navigate(pathname);
          reFetch();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function onError(error) {
    console.log("error", error);
    setLoading(false);
  }

  function handleKeyDown(event) {
    const isSubmitButtonFocused =
      document.activeElement && document.activeElement.type === "submit";

    if (event.key === "Enter" && !isSubmitButtonFocused) {
      event.preventDefault();
    }
  }
}

export default Release;
