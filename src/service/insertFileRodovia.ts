import axios, { AxiosResponse } from "axios";
import { insertFileRodoviasURL } from "../consts/service";

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
    console.log(error);
    throw error;
  }
}

export default fetchInsertRodoviaFile;
