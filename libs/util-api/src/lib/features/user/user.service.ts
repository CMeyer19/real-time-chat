import axios from "axios";
import { baseApiRoute, IUser } from "../user";

const getLoggedInUser_async = async (): Promise<IUser> => {
  const response = await axios.get<IUser>(baseApiRoute);

  return response.data;
}

export {
  getLoggedInUser_async
};
