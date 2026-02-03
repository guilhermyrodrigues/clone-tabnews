import bcryptjs from "bcryptjs";

const pepper = process.env.PASSWORD_PEPPER || "";

async function hash(password) {
  password += pepper;
  const rounds = getNumberOfRounds();
  return await bcryptjs.hash(password, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedHashedPassword) {
  providedPassword += pepper;
  return await bcryptjs.compare(providedPassword, storedHashedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
