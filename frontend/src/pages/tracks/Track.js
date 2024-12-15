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
import Details from "../../components/Details/Details";
import HeaderSection from "../../components/HeaderSection";
import TrackList from "./TrackList";

import { BASE_URL, DEFAULT_TRACK_VALUES } from "../defaultValues";
import isAuthorized from "../../util/isAuthorized";
import classes from "./Track.module.scss";
import mainClasses from "../pages.module.scss";
import Loading from "../../components/Loading";

axios.defaults.baseURL = BASE_URL;

function Track({ setAlert, reFetch, canEdit }) {
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

  const [loading, setLoading] = useState(true);
  const [singleItem, setSingleItem] = useState();
  const [formats, setFormats] = useState([]);
  const [items, setItems] = useState([]);

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        console.log("res", res);

        if (!res.data?.releases || res.data?.releases.length === 0) {
          setAlert({
            danger: `Cannot create track with no release.\nMake sure to create release first.`,
          });
        }

        setSingleItem(res.data?.track);
        setFormats(res.data?.releases);
        setItems(res.data?.releaseTracks);

        reset(res.data.track);
      } catch (error) {
        setAlert({ danger: error.message });
      }
    },
    [reset, setAlert]
  );

  useEffect(() => {
    if (isNew) {
      reset(DEFAULT_TRACK_VALUES);
      setLoading(false);
    }
  }, [isNew, reset]);

  useEffect(() => {
    fetchData("/tracks", { id });
    setLoading(false);
  }, [fetchData, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={mainClasses["fade-in"]}>
      <div className="container">
        <Details>
          <HeaderSection badgeText="TRACK" title={watchTitle} />
          {singleItem && (
            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              onKeyDown={handleKeyDown}
            >
              <div className={classes.grid}>
                <FormInput
                  disabled={loading || !canEdit}
                  id="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  register={register}
                  required
                />
                <FormInput
                  disabled={loading || !canEdit}
                  id="trackNumber"
                  label="Track ID"
                  type="number"
                  placeholder="Track ID"
                  register={register}
                  required
                  min={1}
                />
                {formats && (
                  <FormSelect
                    disabled={loading || !canEdit}
                    label="Release"
                    register={register}
                    id="release"
                    options={formats}
                    required
                    setValue={setValue}
                  />
                )}
              </div>
              <h3 className="mt-0">Samples</h3>
              <Table bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>Quote</td>
                    <td>Source</td>
                    <td>Type</td>
                    <td>Year</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                  </tr>
                </tbody>
              </Table>
              {formats && formats.length > 0 && (
                <Collapse in={isDirty}>
                  <div>
                    <Button
                      type="submit"
                      disabled={!isDirty || !canEdit}
                      variant="primary"
                      className="text-light mb-3"
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                </Collapse>
              )}
            </Form>
          )}
          {items && items.length > 0 && (
            <TrackList
              tracks={items}
              title={formats.find((r) => r.key === singleItem.release)}
            />
          )}
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
        const response = await axios.post("/tracks", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New track added!" });
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
        const response = await axios.put(`/tracks?id=${id}`, params);

        if (response.data.changedRows) {
          setAlert({ success: "Track updated!" });
          reFetchItem();
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
    fetchData("/tracks", { id });
  }
}

export default Track;
