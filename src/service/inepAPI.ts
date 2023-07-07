import axios, { AxiosResponse, GenericAbortSignal } from "axios";
import { EscolasInepURL } from "../consts/service";
import { InepSchoolData } from "../models/service";


async function fetchEscolasInep( municipio: number): Promise<InepSchoolData[]> {

    try {
        const response: AxiosResponse<InepSchoolData[]> = await axios.get(
            `${EscolasInepURL}?municipio=${municipio}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { fetchEscolasInep };
