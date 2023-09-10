import bcrypt from "bcrypt";

const Round = 10;

export const HashPasswordConvert = async (password) => {
  try {
    const pwd = await bcrypt.hash(password, Round);
    return pwd;
  } catch (er) {
    throw new Error("Something is Wrong");
  }
};

export const VerifyPassword = async (password, hashPassword) => {
  try {
    let isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (er) {
    throw new Error("Password comparion error");
  }
};
