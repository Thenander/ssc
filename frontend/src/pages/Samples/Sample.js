import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import FormTextArea from "../../components/formComponents/FormTextArea.js";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import Details from "../../components/Details/Details";
import HeaderSection from "../../components/HeaderSection";
import Loading from "../../components/Loading";
import SampleList from "./SampleList.js";

import { BASE_URL, DEFAULT_SAMPLE_VALUES } from "../defaultValues";
import isAuthorized from "../../util/isAuthorized";
import classes from "./Sample.module.scss";
import mainClasses from "../pages.module.scss";

axios.defaults.baseURL = BASE_URL;

function Sample({ setAlert, reFetch, canEdit }) {
  const { register, formState, handleSubmit, reset, watch, setValue } =
    useForm();
  const { isDirty } = formState;

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isNew = id === "new";

  const watchTitle = watch("sample");

  const buttonLabel = isNew ? "Add new sample" : "Update sample";

  const [loading, setLoading] = useState(true);
  const [singleItem, setSingleItem] = useState();
  const [types, setTypes] = useState([]);
  const [items, setItems] = useState([]);
  const [sources, setSources] = useState([]);

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        console.log("res", res);

        if (!res.data?.sources || res.data?.sources.length === 0) {
          setAlert({
            danger: `Cannot create sample with no source.\nMake sure to create source first.`,
          });
        }

        setSingleItem(res.data?.sample);
        setTypes(res.data?.types);
        setItems(res.data?.sourceSamples);
        setSources(res.data?.sources);

        reset(res.data.sample);
      } catch (error) {
        setAlert({ danger: error.message });
      }
    },
    [reset, setAlert]
  );

  useEffect(() => {
    if (isNew) {
      reset(DEFAULT_SAMPLE_VALUES);
      setLoading(false);
    }
  }, [isNew, reset]);

  useEffect(() => {
    fetchData("/samples", { id });
    setLoading(false);
  }, [fetchData, id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={mainClasses["fade-in"]}>
      <div className="container">
        <Details>
          <HeaderSection badgeText="SAMPLE" title={watchTitle} />
          {singleItem && (
            <Form
              onSubmit={handleSubmit(onSubmit, onError)}
              onKeyDown={handleKeyDown}
            >
              <div className={classes.grid}>
                <FormTextArea
                  disabled={loading || !canEdit}
                  id="sample"
                  label="Sample"
                  type="text"
                  placeholder="Sample"
                  register={register}
                  required
                ></FormTextArea>
                {types && (
                  <FormSelect
                    disabled={loading || !canEdit}
                    label="Sample type"
                    register={register}
                    id="type"
                    options={types}
                    required
                    setValue={setValue}
                  />
                )}
                {sources && (
                  <FormSelect
                    disabled={loading || !canEdit}
                    label="Source"
                    register={register}
                    id="source"
                    options={sources}
                    required
                    setValue={setValue}
                  />
                )}
              </div>
              {/* <h3 className="mt-0">Tracks</h3>
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
              </Table> */}
              {types && types.length > 0 && (
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
            <SampleList
              samples={items}
              sample={types.find(
                (r) => r.key.toString() === singleItem.source.toString()
              )}
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
        const response = await axios.post("/samples", params);

        if (response.data.affectedRows) {
          setAlert({ success: "New sample added!" });
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
        const response = await axios.put(`/samples?id=${id}`, params);

        if (response.data.changedRows) {
          setAlert({ success: "Sample updated!" });
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
    fetchData("/samples", { id });
  }
}

export default Sample;
