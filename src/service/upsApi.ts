import axios, { AxiosResponse } from "axios";
import * as URL from "../consts/service"
import { CalcularUpsData, CalcularUpsResponse } from "../models/service";
import { ResponseStatus, sendCadastros } from "./apiUtils";

export async function sendCadastroRodovia(data: FormData): Promise<ResponseStatus> {
    return sendCadastros<FormData>(URL.cadastroRodoviasURL, data);
}

export async function sendCadastroSinistro(data: FormData): Promise<ResponseStatus> {
    return sendCadastros<FormData>(URL.cadastroSinistrosURL, data);
}

export async function fetchCalculaUps(
    coordenadasData: CalcularUpsData
): Promise<CalcularUpsResponse> {
    try {
        const response: AxiosResponse<CalcularUpsResponse> = await axios.get(
            URL.calcularUpsURL,
            {
                params: {
                    Latitude: coordenadasData.latitude,
                    Longitude: coordenadasData.longitude,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}