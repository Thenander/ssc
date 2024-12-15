import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function SampleList({ samples = [], sample }) {
  return (
    <div>
      {sample && (
        <div>
          <h3 className="mt-0">Sample list - {sample.value.split(" - ")[0]}</h3>
        </div>
      )}

      <Table hover variant="dark">
        <tbody>
          {samples.map((props) => {
            const { id, sample } = props;
            return (
              <tr key={id}>
                <td className="px-2 position-relative">
                  <Link to={`/samples?id=${id}`} className="stretched-link">
                    {sample}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default SampleList;
