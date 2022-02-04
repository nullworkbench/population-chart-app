import { NextApiRequest, NextApiResponse } from "next";

// 拡張してprefCodeを型補完（queryはstring型のみ）
interface ExNextApiRequest extends NextApiRequest {
  query: {
    prefCode: string;
  };
}

function useHandler(req: ExNextApiRequest, res: NextApiResponse) {
  const {
    query: { prefCode },
  } = req;
}

export default useHandler;
