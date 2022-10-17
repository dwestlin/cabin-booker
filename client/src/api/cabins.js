import { API_URL } from "./common";

const fetchAvailableCabins = () => {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${API_URL}/cabins`, options)
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    });
};

const fetchBookedCabins = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.accessToken}`,
    },
  };

  return fetch(`${API_URL}/admin/cabins`, options)
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    })
    .catch((error) => console.error(error));
};

const bookCabin = (id, mailadress) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cabinId: id,
      mailadress: mailadress,
    }),
  };

  return fetch(`${API_URL}/cabin`, options)
    .then((response) => response.json())
    .then((result) => {
      if (!result.data.status) {
        return {
          status: false,
          message: `Något gick fel i bokningen, prova igen`,
        };
      }

      return { status: true, message: `${mailadress} har bokat en stuga` };
    })
    .catch((error) => {
      return {
        status: false,
        message: `Något gick fel i bokningen, prova igen`,
      };
    });
};

export { fetchAvailableCabins, fetchBookedCabins, bookCabin };
