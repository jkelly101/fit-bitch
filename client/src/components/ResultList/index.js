import React from "react";

function ResultList(props) {
  return (
    <ul className="list-group mt-3">
      {props.results.map(result => (
        <li className="list-group-item" key={result.id}>
          <img alt={result.title} className="img-fluid" src={result.images.original.url} />
        </li>
      ))}
    </ul>
  );
}

export default ResultList;
