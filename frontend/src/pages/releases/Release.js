import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Alert, Table } from "react-bootstrap";
import Spinner from "../../components/Spinner/Spinner";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api/V1";

let count = 0;

function Release() {
  console.log("Release:", count++);

  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  console.log("response", response);

  let [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    fetchData("/releases", { id });
  }, [id]);

  if (error) {
    return <Alert type="danger" message={error} />;
  }

  if (loading) {
    return (
      <div className="position-relative py-5">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div>hej</div>
    </div>
  );

  async function fetchData(url, params) {
    setLoading(true);
    try {
      const res = await axios.get(url, { params });
      setResponse(res.data);
    } catch (err) {
      setError("Cannot fetch data");
    } finally {
      setLoading(false);
    }
  }
}

export default Release;
