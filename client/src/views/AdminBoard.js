import React, { useEffect, useState, Fragment } from "react";
import Cabin from "../components/Cabin";
import { fetchBookedCabins } from "../api/cabins";

const Home = () => {
  const [cabins, setCabins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetchBookedCabins();
        setCabins(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <div>
        <h1>Bokade stugor</h1>
      </div>
      <div>
        {cabins.length > 0 ? (
          cabins.map((cabin, index) => <Cabin key={index} cabin={cabin} />)
        ) : (
          <h2>Inga bokade stugor för tillfället</h2>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
