import axios, { AxiosResponse } from "axios";
import { insertFileRodoviasURL } from "../consts/service";
import { InsertFileData } from "../models/service";

interface InsertFileResponse {
    status: number;
}

async function fetchInsertRodoviaFile(
    fileData: FormData
): Promise<InsertFileResponse> {
    try {
        const response: AxiosResponse<InsertFileResponse> = await axios.post(
            insertFileRodoviasURL,
            fileData
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export default fetchInsertRodoviaFile;
