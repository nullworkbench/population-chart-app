import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Prefecture, isRESASError } from "@/libs/ResasApi";

// resasApiを使うための基本設定を行なったaxiosインスタンス
const resasApi = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: { "x-api-key": process.env.NEXT_PUBLIC_RESAS_API_KEY! },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[] | string>
) {
  // ResasApiから都道府県一覧を取得して返す
  await resasApi
    .get("/prefectures")
    .then((axiosRes) => {
      // ResasApi独自のエラーをチェック
      const resasError = isRESASError(axiosRes.data);
      if (resasError) {
        // エラーがあればステータスコードとエラーメッセージを書き込む
        console.log(`${resasError.statusCode}: ${resasError.errorMessage}`);
        res.writeHead(resasError.statusCode, resasError.errorMessage);
      } else {
        // 正常に完了
        res.status(200).json(axiosRes.data["result"] as Prefecture[]);
      }
    })
    .catch((error: AxiosError) => {
      res.writeHead(Number(error.code ?? 500), error.message);
    });
}
