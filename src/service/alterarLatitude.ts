import axios, { AxiosResponse } from "axios";
import { alterarLatitudeURL } from "../consts/service";
import { AlterarLatitudeData } from "../models/service";

interface AlterarLatitudeResponse {
  status: number;
}

async function fetchAlterarLatitude(
  alterarLatitude: AlterarLatitudeData

): Promise<AlterarLatitudeResponse> {
  try {
    const response: AxiosResponse<AlterarLatitudeResponse> = await axios.put(
      alterarLatitudeURL,
      null,
      {
        params: {
          idEscola: alterarLatitude.idEscola,
          latitude: alterarLatitude.latitude
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchAlterarLatitude;
