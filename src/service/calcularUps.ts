import axios, { AxiosResponse } from "axios";
import { calcularUpsURL } from "../consts/service";
import { CalcularUpsData } from "../models/service";

interface calcularUpsResponse {
  status: number;
}

async function fetchCalcularUps(
  latitude: number,
  longitude:number
): Promise<calcularUpsResponse> {
  try {
    const response: AxiosResponse<calcularUpsResponse> = await axios.get(
      calcularUpsURL, { params: { Latitude: latitude, Longitude: longitude } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchCalcularUps;
