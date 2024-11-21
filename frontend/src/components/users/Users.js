import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../util/auth";
import { Button, Table } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1 className="container mt-5">Loading…</h1>;
  }
  if (error) {
    return <h1 className="container mt-5">Error: {error}</h1>;
  }

  return (
    <div className="container mt-5">
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, firstName, lastName, email }) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      deleteUser(id);
                    }}
                  >
                    Delete user
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/V1/users" /* , {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      } */
      );
      console.log(response);

      const result = await response.data;
      setUsers(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/V1/users/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );
      const result = response.data;
      console.log("Deleting...", result);
      fetchData();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
}
