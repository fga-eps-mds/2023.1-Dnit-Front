import axios, { AxiosResponse } from "axios";
import { calcularUpsURL } from "../consts/service";
import { CalcularUpsData } from "../models/service";

interface calcularUpsResponse {
  status: number;
  ups2018: number;
  ups2019: number;
  ups2020: number;
  ups2021: number;
  ups2022: number;
  upsGeral: number;
}

async function fetchCalcularUps(
  coordenadasData: CalcularUpsData
): Promise<calcularUpsResponse> {
  try {
    const response: AxiosResponse<calcularUpsResponse> = await axios.get(
      calcularUpsURL, { params: { Latitude: coordenadasData.latitude, Longitude: coordenadasData.longitude } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchCalcularUps;
