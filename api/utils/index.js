const fs = require("fs");

const readFile = async (path) => {
  try {
    const data = await fs.promises.readFile(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    return { status: false, message: "Something went wrong" };
  }
};

const writeFile = async (path, data) => {
  try {
    const result = await fs.promises.writeFile(
      path,
      Buffer.from(JSON.stringify(data)),
      "utf8"
    );
    return { status: true, message: "Successfully written to file" };
  } catch (err) {
    console.error(err);
    return { status: false, message: "Something went wrong" };
  }
};

const createResponseMessage = ({ status, message = null, data = [] }) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
module.exports = { writeFile, readFile, createResponseMessage };
