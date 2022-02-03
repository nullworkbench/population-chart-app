import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ResasApiから都道府県一覧を取得して返す
  res.status(200).json({ name: "John Doe" });
}
