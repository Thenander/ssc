import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Details from "../../components/Details/Details";
import HeaderSection from "../../components/HeaderSection";
import SampleList from "../Samples/SampleList.js";

import { BASE_URL, DEFAULT_SOURCE_VALUES } from "../defaultValues";
import isAuthorized from "../../util/isAuthorized";
import classes from "./Source.module.scss";
import mainClasses from "../pages.module.scss";
import Loading from "../../components/Loading";

axios.defaults.baseURL = BASE_URL;

function Source({ setAlert, reFetch, canEdit }) {
  const { register, formState, handleSubmit, reset, watch } = useForm();
  const { isDirty } = formState;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isNew = id === "new";

  const watchTitle = watch("title");

  const buttonLabel = isNew ? "Add new source" : "Update source";

  const [loading, setLoading] = useState(true);
  const [singleItem, setSingleItem] = useState();
  const [types, setTypes] = useState([]);
  const [items, setItems] = useState([]);

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        setSingleItem(res.data?.source);
        setTypes(res.data?.typeOptions);
        setItems(res.data?.samples);

        reset(res.data.source);
      } catch (error) {
        setAlert({ danger: error.message });
      }
    },
    [reset, setAlert]
  );

  useEffect(() => {
    if (isNew) {
      reset(DEFAULT_SOURCE_VALUES);
      setLoading(false);
    }
  }, [isNew, reset]);

  useEffect(() => {
    fetchData("/sources", { id });
    setLoading(false);
  }, [fetchData, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={mainClasses["fade-in"]}>
      <div className="container">
        <Details>
          <HeaderSection badgeText="SOURCE" title={watchTitle} />
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
                <FormInput
                  disabled={!canEdit || loading}
                  id="producer"
                  label="Producer / Director / Artist"
                  type="text"
                  placeholder="Producer / Director / Artist"
                  register={register}
                  required
                />
                {types && (
                  <FormSelect
                    disabled={!canEdit || loading}
                    label="Type"
                    register={register}
                    id="type"
                    options={types}
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
                    <Button type="submit" disabled={!isDirty || !canEdit}>
                      {buttonLabel}
                    </Button>
                    <hr className="text-light" />
                  </div>
                </Collapse>
              )}
            </Form>
          )}
          {items && items.length > 0 && <SampleList samples={items} />}
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
        const response = await axios.post("/sources", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New source added!" });
          navigate(pathname);
          reFetch();
        }
      } catch (error) {
        setAlert({ danger: error.message });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await axios.put(`/sources?id=${id}`, params);

        if (response.data.changedRows) {
          setAlert({ success: "Source updated!" });
          reFetchItem();
          // navigate(pathname);
          reFetch();
        }
      } catch (error) {
        setAlert({ danger: error.message });
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
    fetchData("/sources", { id });
  }
}

export default Source;
