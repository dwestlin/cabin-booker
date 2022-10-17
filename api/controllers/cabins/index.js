const { writeFile, readFile, createResponseMessage } = require("../../utils");

const getAvailableCabins = async (req, res) => {
  try {
    let result = await readFile("./data/cabins.json");
    const avaliableCabins = JSON.parse(result).filter(
      (cabin) => !cabin.isBooked
    );
    res.json(createResponseMessage({ status: true, data: avaliableCabins }));
  } catch (error) {
    return res
      .status(400)
      .json(createResponseMessage({ status: false, message: error }));
  }
};

const getBookedCabins = async (req, res) => {
  try {
    let result = await readFile("./data/cabins.json");
    const cabins = JSON.parse(result).filter((cabin) => cabin.isBooked);
    res.json(createResponseMessage({ status: true, data: cabins }));
  } catch (error) {
    return res
      .status(400)
      .json(
        createResponseMessage({
          status: false,
          message: "Something unexpected happend, Please try again",
        })
      );
  }
};

const bookCabin = async (req, res) => {
  const { cabinId, mailadress } = req.body;

  if (!cabinId || !mailadress) {
    return res
      .status(400)
      .json(
        createResponseMessage({
          status: true,
          message: "You must provivde with cabinId and mailadress",
        })
      );
  }

  try {
    const result = await readFile("./data/cabins.json");
    const cabins = JSON.parse(result);
    const foundCabinIndex = cabins.findIndex((cabin) => cabin.id === cabinId);

    if (foundCabinIndex > -1) {
      cabins[foundCabinIndex].isBooked = true;
      cabins[foundCabinIndex].bookedBy = mailadress;
      const data = await writeFile("./data/cabins.json", cabins);
      return res.json(createResponseMessage({ status: true, data: data }));
    }
    res.json(
      createResponseMessage({ status: false, message: "No cabin found" })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json(createResponseMessage({ status: false, message: error }));
  }
};

module.exports = { getAvailableCabins, getBookedCabins, bookCabin };
