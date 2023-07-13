import axios, { AxiosResponse } from "axios";
import { escolasInepURL } from "../consts/service";
import { InepSchoolData } from "../models/service";

async function fetchEscolasInep(municipio: number): Promise<InepSchoolData[]> {
  try {
    const response: AxiosResponse<InepSchoolData[]> = await axios.get(
      `${escolasInepURL}?municipio=${municipio}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { fetchEscolasInep };
