import axios, { AxiosResponse } from "axios";
import { urlAPIViaCEP } from "../consts/service";
import { ViaCEPData } from "../models/service";

async function fetchCEP(cep: string): Promise<ViaCEPData> {
  try {
    const response: AxiosResponse<ViaCEPData> = await axios.get(
      urlAPIViaCEP + `/${cep}` + "/json"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCEP;
