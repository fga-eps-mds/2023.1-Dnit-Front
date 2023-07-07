import axios, { AxiosResponse } from "axios";
import { federativeUnitURL } from "../consts/service";
import { FederativeUnit } from "../models/service";

async function fetchFederativeUnit(): Promise<FederativeUnit[]> {
  try {
    const response: AxiosResponse<FederativeUnit[]> = await axios.get(
      federativeUnitURL
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchFederativeUnit;
