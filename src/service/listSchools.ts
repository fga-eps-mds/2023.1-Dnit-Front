import axios, { AxiosResponse } from "axios";
import { listSchoolsURL } from "../consts/service";
import { SchoolData } from "../models/service";

async function fetchlistSchools(): Promise<SchoolData[]> {
  try {
    const response: AxiosResponse<SchoolData[]> = await axios.get(
      listSchoolsURL
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchlistSchools;
