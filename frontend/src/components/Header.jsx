import React from "react";
import PropTypes from "prop-types";
import AddTodo from "./AddTodo";

import mainLogo from "../assets/mainLogo.png";
import searchInList from "../assets/icons8-search-in-list-24.png";

Header.propTypes = {
  title: PropTypes.string,
};
Header.defaultProps = {
  title: "Your Title Here",
};

function Header(props) {
  return (
    <>
      <nav className="navbar z-3 text-center py-3 position-sticky top-0">
        <div className="container-fluid row row-cols-1 row-cols-md-2 row-cols-lg-3 m-auto">
          {/* Name & Logo */}
          <div className="pe-1 col d-flex justify-content-center align-items-center">
            <div>
              <img alt="Logo" width="45" src={mainLogo} />
            </div>
            <div className="fw-bold title ms-3">{props.title}</div>
          </div>

          <AddTodo addTodo={props.addTodo} />

          {/* Input Form for Searhing task  */}
          <div className="col p-2 my-4 m-md-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className=" m-auto searchForm d-flex justify-content-evenly align-items-center"
              role="search"
            >
              <img src={searchInList} alt="serch" className="searchLogo" />
              <input
                className="form-control inputBox  "
                type="search"
                value={props.filterText}
                placeholder="Search assigned tasks here...."
                onChange={(e) => props.onFilterTextChange(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
