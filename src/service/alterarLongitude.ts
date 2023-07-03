import axios, { AxiosResponse } from "axios";
import { alterarLongitudeURL } from "../consts/service";
import { AlterarLongitudeData } from "../models/service";

interface AlterarLongitudeResponse {
  status: number;
}

async function fetchAlterarLongitude(
  alterarLongitude: AlterarLongitudeData

): Promise<AlterarLongitudeResponse> {
  try {
    const response: AxiosResponse<AlterarLongitudeResponse> = await axios.put(
      alterarLongitudeURL,
      null,
      {
        params: {
          idEscola: alterarLongitude.idEscola,
          longitude: alterarLongitude.longitude
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAlterarLongitude;
