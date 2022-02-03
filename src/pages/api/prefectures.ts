import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import { Prefecture } from "@/libs/ResasApi";

// resasApiを使うための基本設定を行なったaxiosインスタンス
const resasApi = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: { "x-api-key": process.env.NEXT_PUBLIC_RESAS_API_KEY! },
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[] | string>
) {
  // ResasApiから都道府県一覧を取得して返す
  resasApi.get("/prefectures").then((axiosRes) => {});
  res.status(200).json("John");
}
