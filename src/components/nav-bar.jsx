import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function NavBar() {


  return (
    <div className="container d-flex justify-content-between p-5">
      <button type="btn" className=" btn btn-light">
        <FontAwesomeIcon icon={faPlus} style={{ color: "#436eba" }} />
      </button>
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-light dropdown-toggle"
          data-bs-toggle="dropdown"
        ></button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="https://www.google.com/">
              Share
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="https://www.google.com/">
              Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
