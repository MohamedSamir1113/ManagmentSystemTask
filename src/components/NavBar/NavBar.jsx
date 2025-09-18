import { useMediaQuery } from "react-responsive";
import { useUser } from "../../contexts/UserContext";

// Navigation bar component with search functionality
const NavBar = ({ setIsCollapsed, isCollapsed }) => {
  const isSmall = useMediaQuery({ query: "(max-width: 678px)" });
  const { searchQuery, setSearchQuery } = useUser();

  // Search bar component
  const SearchBar = (
    <div className="d-flex align-items-center me-5">
      <input
        type="text"
        className="form-control me-1"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i className="fa-regular text-muted fa-bell"></i>
    </div>
  );

  return (
    <div className="bg-white py-2 mb-3 d-flex align-items-center justify-content-between">
      {!isSmall && (
        <i
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: "pointer" }}
          className={`fa-solid px-5 ${isCollapsed ? "fa-circle-right" : "fa-circle-left"}`}
        ></i>
      )}
      {SearchBar}
    </div>
  );
};

export default NavBar;
