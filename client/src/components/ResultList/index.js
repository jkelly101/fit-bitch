import React from "react";

function ResultList(props) {
  return (
    <ul className="list-group mt-3">
      {props.results.map((result) => (
        <li className="list-group-item m-auto" key={result.id}>
          <img
            alt={result.title}
            className="img-fluid"
            src={result.images.original.url}
            width="800px"
          />
        </li>
      ))}
    </ul>
  );
}

export default ResultList;
