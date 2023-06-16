import axios, { AxiosResponse, GenericAbortSignal } from "axios";
import { inepSchoolsUrl } from "../consts/service";
import { InepSchoolData } from "../models/service";


async function fetchSchoolByName(name: string, signal: GenericAbortSignal): Promise<InepSchoolData[]> {

    try {
        console.log("AAAAAAAAAA")
        const response: AxiosResponse<InepSchoolData[]> = await axios.get(
            `${inepSchoolsUrl}?nome=` + name, {
            signal:signal
        }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { fetchSchoolByName };
