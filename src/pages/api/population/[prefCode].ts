import { NextApiRequest, NextApiResponse } from "next";

import { resasApi, isRESASError, Population } from "@/libs/ResasApi";
import { AxiosError } from "axios";

// 拡張してprefCodeを型補完（queryはstring型のみ）
export interface ExNextApiRequest extends NextApiRequest {
  query: {
    prefCode: string;
  };
}

async function useHandler(req: ExNextApiRequest, res: NextApiResponse) {
  const prefCode = Number(req.query.prefCode);

  // ResasApiから人口情報を取得して返す
  await resasApi
    .get(`/population/composition/perYear?prefCode=${prefCode}&cityCode=-`)
    .then((axiosRes) => {
      // ResasApi独自のエラーをチェック
      const resasError = isRESASError(axiosRes.data);
      if (resasError) {
        // エラーがあればステータスコードとエラーメッセージを書き込む
        console.log(`${resasError.statusCode}: ${resasError.errorMessage}`);
        res.writeHead(resasError.statusCode, resasError.errorMessage);
      } else {
        // 正常に完了
        const population: Population = {
          prefCode,
          data: axiosRes.data["result"]["data"][0]["data"],
        };
        res.status(200).json(population);
      }
    })
    .catch((error: AxiosError) => {
      res.writeHead(Number(error.code ?? 500), error.message);
    });
}

export default useHandler;
