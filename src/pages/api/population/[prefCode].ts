import { NextApiRequest, NextApiResponse } from "next";

import { resasApi, isResasError, Population } from "@/libs/ResasApi";
import axios from "axios";

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
      const resasError = isResasError(axiosRes.data);
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
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        res.writeHead(Number(error.response.status), error.message);
      } else {
        res.writeHead(500, `${error}`);
      }
    });
}

export default useHandler;
