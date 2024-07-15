import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>HomePage</div>
      <Link to="/me">Click to see Profile</Link>
    </>
  );
};

export default HomePage;
