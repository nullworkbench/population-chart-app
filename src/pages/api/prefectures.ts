import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { resasApi, Prefecture, isResasError } from "@/libs/ResasApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[] | string>
) {
  // ResasApiから都道府県一覧を取得して返す
  await resasApi
    .get("/prefectures")
    .then((axiosRes) => {
      // ResasApi独自のエラーをチェック
      const resasError = isResasError(axiosRes.data);
      if (resasError) {
        // エラーがあればステータスコードとエラーメッセージを書き込む
        console.log(`${resasError.statusCode}: ${resasError.errorMessage}`);
        res.writeHead(resasError.statusCode, resasError.errorMessage);
      } else {
        // 正常に完了
        res.status(200).json(axiosRes.data["result"] as Prefecture[]);
      }
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        res.writeHead(Number(error.response.status), error.message);
      } else {
        console.log(`Error getting prefectures: ${error}`);
      }
    });
}
