import axios, { AxiosResponse } from "axios";

interface CadastroPlanilhaResponse {
  status: number;
  data: [];
}

async function fetchImportaPlanilha(
  cadastroPlanilhaURL: string,
  fileData: FormData
): Promise<CadastroPlanilhaResponse> {
  try {
    const response: AxiosResponse<CadastroPlanilhaResponse> = await axios.post(
      cadastroPlanilhaURL,
      fileData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchImportaPlanilha;
