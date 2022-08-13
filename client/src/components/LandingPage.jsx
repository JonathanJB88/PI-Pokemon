import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to my Pokemon World</h1>
      <Link to={"/home"}>
        <button>Let's Go</button>
      </Link>
    </div>
  );
};

export default LandingPage;
