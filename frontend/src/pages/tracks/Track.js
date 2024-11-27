import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Track.module.scss";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

const formValues = { title: "", trackNumber: "", release: "" };

function Track({ setSuccess, reFetch }) {
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

  const buttonLabel = id === "new" ? "Add new track" : "Update track";

  ///////////////
  // useStates //
  ///////////////

  const [loading, setLoading] = useState(true);
  const [track, setTrack] = useState();
  const [releases, setReleases] = useState([]);

  ///////////
  // Fetch //
  ///////////

  const fetchData = useCallback(
    async (url, params) => {
      const res = await axios.get(url, { params });

      setReleases(
        res.data?.releases?.map(({ artist, title, text, id }) => {
          const value = `${title} - ${artist} (${text})`;
          const key = id;
          return { key, value };
        })
      );
      setTrack(res.data?.track);

      reset(res.data.track);
    },
    [reset]
  );

  ////////////////
  // useEffects //
  ////////////////

  useEffect(() => {
    if (id === "new") {
      reset(formValues);
      setLoading(false);
    }
  }, [id, reset]);

  useEffect(() => {
    fetchData("/tracks", { id });
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
          {track && (
            <>
              <div className={classes.grid}>
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
                  id="trackNumber"
                  label="Track ID"
                  type="text"
                  placeholder="Track ID"
                  register={register}
                  required
                />
                {releases && (
                  <FormSelect
                    register={register}
                    id="release"
                    options={releases}
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
        const response = await axios.post("/tracks", params);

        if (response.data.affectedRows) {
          setSuccess("New track added!");
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
        const response = await axios.put(`/tracks?id=${id}`, params);

        if (response.data.changedRows) {
          setSuccess("Track updated!");
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

export default Track;
