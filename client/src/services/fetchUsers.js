import axios from "axios";

export default async () => {
  const result = await axios
    .get("http://localhost:8000/api/users")
    .then(res => res);

  return result;
};
