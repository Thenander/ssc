import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

import Collapse from "react-bootstrap/Collapse";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormTextArea from "../../components/formComponents/FormTextArea.js";
import FormSelect from "../../components/formComponents/FormSelect";
import Details from "../../components/Details/Details";
import HeaderSection from "../../components/HeaderSection";
import Loading from "../../components/Loading";
import SampleList from "./SampleList.js";

import { BASE_URL, DEFAULT_SAMPLE_VALUES } from "../defaultValues";
import isAuthorized from "../../util/isAuthorized";
import classes from "./Sample.module.scss";
import mainClasses from "../pages.module.scss";
import TrackList from "./TrackList.js";

axios.defaults.baseURL = BASE_URL;

function Sample({ setAlert, reFetch, canEdit }) {
  const { register, formState, handleSubmit, reset, watch, setValue, control } =
    useForm();
  const { isDirty } = formState;

  const { fields } = useFieldArray({
    name: "releases",
    control,
  });

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
  const [tracks, setTracks] = useState([]);
  const [source, setSource] = useState();

  const fetchData = useCallback(
    async (url, params) => {
      try {
        const res = await axios.get(url, { params });

        if (!res.data?.sources || res.data?.sources.length === 0) {
          setAlert({
            danger: `Cannot create sample with no source.\nMake sure to create source first.`,
          });
        }

        const data = {
          sample: res.data.sample.sample,
          source: res.data.sample.source,
          type: res.data.sample.type,
          releases: res.data.releases,
        };

        const transformedReleaseTracks = res.data?.releases.flatMap((release) =>
          release.tracks
            .filter((track) => track.checked)
            .map((track) => ({
              releaseId: release.id,
              releaseTitle: release.title,
              year: release.year,
              trackId: track.id,
              trackTitle: track.title,
              trackNumber: track.trackNumber,
            }))
        );

        setSingleItem(res.data?.sample);
        setTypes(res.data?.types);
        setItems(res.data?.sourceSamples);
        setSources(res.data?.sources);
        setTracks(transformedReleaseTracks);
        setSource(res.data?.sample.sourceTitle);

        reset(data);
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
              <div className={canEdit ? classes.grid3 : classes.grid2}>
                {canEdit && (
                  <ReleasesAccordion fields={fields} register={register} />
                )}
                {items && items.length > 0 && (
                  <>
                    <div
                      className={`${classes["sample-header"]} ${
                        canEdit && "ms-3"
                      }`}
                    >
                      <h3 className="m-0">{source}:</h3>
                    </div>
                    <SampleList
                      samples={items}
                      sample={types.find(
                        (r) => r.key.toString() === singleItem.source.toString()
                      )}
                    />
                  </>
                )}
              </div>
              {types && types.length > 0 && (
                <Collapse in={isDirty}>
                  <div>
                    <Button
                      type="submit"
                      disabled={!isDirty || !canEdit}
                      className="mb-3"
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                </Collapse>
              )}
              <div>
                {tracks && tracks.length > 0 && <TrackList tracks={tracks} />}
              </div>
            </Form>
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

        if (response.status === 200) {
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

        if (response.status === 200) {
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

function ReleaseAccordion({ release, releaseIndex, register }) {
  const { id, title: releaseTitle, year, tracks } = release;

  return (
    <Accordion key={id}>
      <Accordion.Item eventKey={id}>
        <Accordion.Header>
          {releaseTitle} - {year}
        </Accordion.Header>
        <Accordion.Body>
          {tracks.map((track, trackIndex) => (
            <TrackCheckbox
              key={track.id}
              track={track}
              releaseIndex={releaseIndex}
              trackIndex={trackIndex}
              register={register}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

function TrackCheckbox({ track, releaseIndex, trackIndex, register }) {
  const { id, title: trackTitle } = track;

  return (
    <Form.Check
      key={id}
      type="checkbox"
      label={trackTitle}
      {...register(`releases.${releaseIndex}.tracks.${trackIndex}.checked`)}
    />
  );
}

function ReleasesAccordion({ fields, register }) {
  return (
    <Accordion className="mb-3">
      <Accordion.Item eventKey="releases">
        <Accordion.Header>Releases</Accordion.Header>
        <Accordion.Body>
          {fields.map((release, releaseIndex) => (
            <ReleaseAccordion
              key={release.id}
              release={release}
              releaseIndex={releaseIndex}
              register={register}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
