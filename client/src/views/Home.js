import React, { useState, useEffect, Fragment } from "react";
import Cabin from "../components/Cabin";
import { fetchAvailableCabins } from "../api/cabins";

const Home = () => {
  const [cabins, setCabins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchAvailableCabins();
      setCabins(results);
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <div>
        <h1>Tillgängliga stugor</h1>
      </div>
      {cabins.length > 0
        ? cabins.map((cabin, index) => <Cabin key={index} cabin={cabin} />)
        : null}
    </Fragment>
  );
};

export default Home;
