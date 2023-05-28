import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    props.history.push(`/search/name/${name}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-sm mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            id="query"
            name="query"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className="input-group-btn">
            <button className="btn btn-primary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
