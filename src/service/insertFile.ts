import axios, { AxiosResponse } from "axios";
import { insertFileURL } from "../consts/service";
import { InsertFileData } from "../models/service";

interface InsertFileResponse {
  status: number;
}

async function fetchInsertFile(
  fileData: InsertFileData
): Promise<InsertFileResponse> {
  try {
    const response: AxiosResponse<InsertFileResponse> = await axios.post(
        insertFileURL,
        fileData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default fetchInsertFile;
