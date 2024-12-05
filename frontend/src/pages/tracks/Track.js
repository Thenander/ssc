import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Track.module.scss";
import mainClasses from "../pages.module.scss";
import isAuthorized from "../../util/isAuthorized";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

const DEFAULT_VALUES = { title: "", trackNumber: "", release: "" };

function Track({ setAlert, reFetch: reFetchAllTracks, canEdit }) {
  //////////////
  // useHooks //
  //////////////

  const { register, formState, handleSubmit, reset, watch, setValue } =
    useForm();
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
  const [relaseTracks, setRelaseTracks] = useState([]);

  ///////////
  // Fetch //
  ///////////

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        setReleases(res.data?.releases);
        setTrack(res.data?.track);
        setRelaseTracks(res.data?.releaseTracks);

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
      reset(DEFAULT_VALUES);
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
    <div className={mainClasses["fade-in"]}>
      <Spinner loading={loading} />
      <div className="container">
        <h2>{watchTitle}</h2>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          onKeyDown={handleKeyDown}
        >
          {track && (
            <>
              <div className={classes.grid}>
                <FormInput
                  disabled={loading || !canEdit}
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  register={register}
                  required="Title is required"
                />
                <FormInput
                  disabled={loading || !canEdit}
                  id="trackNumber"
                  label="Track ID"
                  type="number"
                  placeholder="Track ID"
                  register={register}
                  required="Track ID is required, no less than 1"
                  min={1}
                />
                {releases && (
                  <FormSelect
                    disabled={loading || !canEdit}
                    label="Release"
                    register={register}
                    id="release"
                    options={releases}
                    required="Release is required"
                    setValue={setValue}
                  />
                )}
              </div>
              <Table bordered hover striped variant="dark">
                <thead>
                  <tr>
                    <th style={{ width: "0", whiteSpace: "nowrap" }}>
                      Track No.
                    </th>
                    <th>Name</th>
                    <th>Release</th>
                    <th style={{ width: "0", whiteSpace: "nowrap" }}>Format</th>
                    <th style={{ width: "0", whiteSpace: "nowrap" }}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {relaseTracks.map(
                    ({
                      id,
                      trackNumber,
                      title,
                      releaseTitle,
                      format,
                      year,
                    }) => {
                      return (
                        <tr key={id}>
                          <td className="position-relative">{trackNumber}</td>
                          <td className="position-relative">{title}</td>
                          <td className="position-relative">{releaseTitle}</td>
                          <td className="position-relative">{format}</td>
                          <td className="position-relative">{year}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
              <Collapse in={isDirty}>
                <div>
                  <Button
                    type="submit"
                    disabled={!isDirty || !canEdit}
                    variant="primary"
                    className="text-light"
                  >
                    {buttonLabel}
                  </Button>
                  <hr className="text-light" />
                </div>
              </Collapse>
            </>
          )}
        </Form>
      </div>
    </div>
  );

  //////////////
  // Handlers //
  //////////////

  async function onSubmit(params) {
    const isAuthorizedUser = isAuthorized(canEdit, setAlert);
    if (!isAuthorizedUser) {
      return;
    }
    if (isNew) {
      try {
        setLoading(true);
        const response = await axios.post("/tracks", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New track added!" });
          navigate(pathname);
          reFetchAllTracks();
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
          reFetchTrack();
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

    setAlert({
      danger: "Required fields are missing or not filled in correctly",
    });
    setLoading(false);
  }

  function handleKeyDown(event) {
    const isSubmitButtonFocused =
      document.activeElement && document.activeElement.type === "submit";

    if (event.key === "Enter" && !isSubmitButtonFocused) {
      event.preventDefault();
    }
  }

  function reFetchTrack() {
    fetchData("/tracks", { id });
  }
}

export default Track;
