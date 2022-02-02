import axios, { AxiosError } from "axios";
import useSWR from "swr";

// 都道府県の型
type Prefecture = {
  prefCode: number;
  prefName: string;
};

// 総人口の型
export type Population = {
  prefCode: number;
  data: { year: number; value: number }[];
};

// RESAS APIのエンドポイント
const endPoint = "https://opendata.resas-portal.go.jp/api/v1";

// RESAS APIキーをheaderに設定
const headers = { "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY! };

// 共通で利用するフェッチャー
const fetcher = (url: string) =>
  axios.get(url, { headers }).then((res) => res.data);

// 都道府県情報を取得する
export function usePrefectures() {
  const apiURL = endPoint + "/prefectures";
  const { data, error } = useSWR(apiURL, fetcher);

  return {
    // データは整形して返す
    prefectures: (): Prefecture[] | null => {
      // undefinedの場合は取得中なので早期return
      if (data == undefined) return null;
      // messageがnullの場合は取得が成功している
      if (data["message"] == null) {
        return data["result"] as Prefecture[];
      }
      return null;
    },
    isLoading: !error && !data,
    isError: error,
  };
}

// 総人口情報を取得する
export function usePopulation(prefCode: number) {
  const apiURL = `${endPoint}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`;
  const { data, error } = useSWR(apiURL, fetcher);

  return {
    population: (): Population | null => {
      // undefinedの場合は取得中なので早期return
      if (data == undefined) return null;
      // messageがnullの場合は取得が成功している
      if (data["message"] == null) {
        return {
          prefCode,
          data: data["result"]["data"][0]["data"],
        };
      }
      return null;
    },
    isLoading: !error && !data,
    isError: error,
  };
}

// 指定されたprefCodeから総人口情報を取得する
export async function getPopulation(
  prefCode: number
): Promise<Population | void> {
  try {
    console.log("get");
    const res = await axios.get(
      `${endPoint}/population/composition/perYear?prefCode=${prefCode}&cityCode=-`,
      { headers }
    );

    const objKeys = Object.keys(res.data);
    if (objKeys.includes("statusCode")) {
      // statusCodeがあるときは何らかのエラーが発生している
      return;
    } else if (
      objKeys.length == 1 &&
      objKeys[0] == "message" &&
      res.data[objKeys[0]] == null
    ) {
      // 429 Too Many Requests
      return;
    } else if (
      objKeys.includes("message") &&
      res.data[objKeys.indexOf("message")] == null
    ) {
      // 正しく取得できている
      return { prefCode, data: res.data["result"]["data"][0]["data"] };
    }
    return;
  } catch (error) {
    // エラー
    return;
  }
}
