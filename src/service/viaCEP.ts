import axios, { AxiosResponse } from "axios";
import { urlAPIViaCEP } from "../consts/service";
import { ViaCEP } from "../models/service";

async function fetchCEP(cep: string): Promise<ViaCEP> {
  try {
    const response: AxiosResponse<ViaCEP> = await axios.get(
      urlAPIViaCEP + `/${cep}` + "/json"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchCEP;
