import React, { useCallback, useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Spinner from "../../components/Spinner/Spinner";

import classes from "./Release.module.scss";
import mainClasses from "../pages.module.scss";
import Collapse from "react-bootstrap/Collapse";
import isAuthorized from "../../util/isAuthorized";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

const DEFAULT_VALUES = {
  title: "",
  year: "",
  format: "",
};

function Release({ setAlert, reFetch, canEdit }) {
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

  const buttonLabel = isNew ? "Add new release" : "Update release";

  ///////////////
  // useStates //
  ///////////////

  const [loading, setLoading] = useState(true);
  const [release, setRelease] = useState();
  const [formats, setFormats] = useState([]);
  const [tracks, setTracks] = useState([]);

  console.log("tracks", tracks);

  ///////////
  // Fetch //
  ///////////

  const fetchData = useCallback(
    async (url, params) => {
      const res = await axios.get(url, { params });

      setRelease(res.data?.release);
      setFormats(res.data?.formatOptions);
      setTracks(res.data?.tracks);

      reset(res.data.release);
    },
    [reset]
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
    fetchData("/releases", { id });
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
          {release && (
            <>
              <div className={classes.grid}>
                <FormInput
                  disabled={!canEdit || loading}
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  register={register}
                  required
                />
                {formats && (
                  <FormSelect
                    disabled={!canEdit || loading}
                    label="Format"
                    register={register}
                    id="format"
                    options={formats}
                    required
                  />
                )}
                <FormInput
                  disabled={!canEdit || loading}
                  id="year"
                  label="Year"
                  type="number"
                  min={1950}
                  max={2050}
                  placeholder="Year"
                  register={register}
                  required
                />
              </div>
              {canEdit && (
                <Collapse in={isDirty}>
                  <div>
                    <Button
                      type="submit"
                      disabled={!isDirty || !canEdit}
                      variant="primary"
                    >
                      {buttonLabel}
                    </Button>
                    <hr className="text-light" />
                  </div>
                </Collapse>
              )}
              {tracks && tracks.length > 0 && (
                <Table size="sm" bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th style={{ width: "0", whiteSpace: "nowrap" }}>
                        Track No.
                      </th>
                      <th className="px-2">Tracklist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks.map((props) => {
                      console.log(props);

                      const { id, title, trackId } = props;
                      return (
                        <tr key={id}>
                          <td>{trackId}</td>
                          <td className="px-2 position-relative">
                            <Link
                              to={`/tracks?id=${id}`}
                              className="stretched-link"
                            >
                              {title}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
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
    console.log("isAuthorizedUser", isAuthorizedUser);
    if (isNew) {
      try {
        setLoading(true);
        const response = await axios.post("/releases", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New release added!" });
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
          setAlert({ success: "Release updated!" });
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
