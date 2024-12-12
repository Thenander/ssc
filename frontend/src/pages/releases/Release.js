import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Spinner from "../../components/Spinner/Spinner";
import Details from "../../components/Details/Details";
import TrackList from "../tracks/TrackList";

import isAuthorized from "../../util/isAuthorized";
import classes from "./Release.module.scss";
import mainClasses from "../pages.module.scss";

axios.defaults.baseURL = "http://localhost:8080/api/V1";

const DEFAULT_VALUES = { title: "", year: "", format: "" };

function Release({ setAlert, reFetch, canEdit }) {
  const { register, formState, handleSubmit, reset, watch } = useForm();
  const { isDirty } = formState;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isNew = id === "new";

  const watchTitle = watch("title");

  const buttonLabel = isNew ? "Add new release" : "Update release";

  const [loading, setLoading] = useState(true);
  const [singleItem, setSingleItem] = useState();
  const [formats, setFormats] = useState([]);
  const [items, setItems] = useState([]);

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        setSingleItem(res.data?.release);
        setFormats(res.data?.formatOptions);
        setItems(res.data?.tracks);

        reset(res.data.release);
      } catch (error) {
        setAlert({ danger: error.message });
      }
    },
    [reset, setAlert]
  );

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

  return (
    <div className={mainClasses["fade-in"]}>
      <Spinner loading={loading} />
      <div className="container">
        <Details>
          <div className="d-flex justify-content-between align-items-start">
            <h2 style={{ display: "inline" }} className="me-3">
              {watchTitle}
            </h2>
            <Badge pill={true} bg="info" text="dark">
              RELEASE
            </Badge>
          </div>
          {singleItem && (
            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              onKeyDown={handleKeyDown}
            >
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
            </Form>
          )}
          {items && items.length > 0 && <TrackList tracks={items} />}
        </Details>
      </div>
    </div>
  );

  async function onSubmit(params) {
    const isAuthorizedUser = isAuthorized(canEdit, setAlert);
    if (!isAuthorizedUser) {
      return;
    }
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
          reFetchItem();
          // navigate(pathname);
          reFetch();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }

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

  function reFetchItem() {
    fetchData("/releases", { id });
  }
}

export default Release;
