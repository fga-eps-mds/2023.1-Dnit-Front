import axios, { AxiosResponse } from "axios";
import { cadastroEscolaPlanilhaURL } from "../consts/service";

interface InsertFileResponse {
  status: number;
  data: [];
}

async function fetchInsertFile(
  fileData: FormData
): Promise<InsertFileResponse> {
  try {
    const response: AxiosResponse<InsertFileResponse> = await axios.post(
      cadastroEscolaPlanilhaURL,
      fileData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchInsertFile;
