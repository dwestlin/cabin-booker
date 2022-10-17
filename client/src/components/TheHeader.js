import { Link, useNavigate } from "react-router-dom";

const TheHeader = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="title">
        <strong>Cabin</strong> Booker
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to={"/"}>Start</Link>
          </li>
          {loggedInUser?.isAdmin ? (
            <li>
              <Link to={"/admin"}>Admin board</Link>
            </li>
          ) : null}
          <li>
            {loggedInUser ? (
              <button className="btn" onClick={handleLogout}>
                Logga ut
              </button>
            ) : (
              <Link to={"/login"}>Logga in</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TheHeader;
