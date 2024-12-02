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

function Track({ setAlert, reFetch }) {
  //////////////
  // useHooks //
  //////////////

  const { register, formState, handleSubmit, reset, watch } = useForm();
  const { isDirty } = formState;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isNew = id === "new";

  const watchTitle = watch("title");

  const buttonLabel = isNew ? "Add new track" : "Update track";

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
      try {
        const res = await axios.get(url, { params });

        setReleases(res.data?.releases);
        setTrack(res.data?.track);

        reset(res.data.track);
      } catch (error) {
        setAlert({ danger: error.message });
      }
    },
    [reset, setAlert]
  );

  ////////////////
  // useEffects //
  ////////////////

  useEffect(() => {
    if (isNew) {
      reset(formValues);
      setLoading(false);
    }
  }, [isNew, reset]);

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
      <div className="container">
        <h3>{watchTitle}</h3>
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
                  required="Title is required"
                />
                <FormInput
                  disabled={loading}
                  id="trackNumber"
                  label="Track ID"
                  type="text"
                  placeholder="Track ID"
                  register={register}
                  required="Track ID is required"
                />
                {releases && (
                  <FormSelect
                    label="Release"
                    register={register}
                    id="release"
                    options={releases}
                    required="Release is required"
                  />
                )}
              </div>
              {isDirty && (
                <Button
                  type="submit"
                  disabled={!isDirty}
                  variant="primary"
                  className="text-light mb-5"
                >
                  {buttonLabel}
                </Button>
              )}
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
    if (isNew) {
      try {
        setLoading(true);
        const response = await axios.post("/tracks", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New track added!" });
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
          setAlert({ success: "Track updated!" });
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

  // Form hook errors
  function onError(error) {
    console.error(error);

    setAlert({ danger: "Required fields are missing" });
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
