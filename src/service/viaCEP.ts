import axios, { AxiosResponse } from "axios";
import { urlAPIViaCEP } from "../consts/service";
import { viaCEP } from "../models/service";

async function fetchCEP(cep: string): Promise<viaCEP[]> {
  try {
    const response: AxiosResponse<viaCEP[]> = await axios.get(
        urlAPIViaCEP + `/${cep}` + '/json'
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchCEP;
