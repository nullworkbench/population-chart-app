import axios, { AxiosError } from "axios";
import useSWR from "swr";

// RESAS-API独自エラーを出す用の型
export type RESASError = {
  statusCode: number;
  errorMessage: string;
};

// 都道府県の型
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

// 総人口の型
export type Population = {
  prefCode: number;
  data: { year: number; value: number }[];
};

// resasApiを使うための基本設定を行なったaxiosインスタンス
export const resasApi = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1",
  headers: { "x-api-key": process.env.NEXT_PUBLIC_RESAS_API_KEY! },
});

// RESAS APIのエンドポイント
const endPoint = "https://opendata.resas-portal.go.jp/api/v1";

// RESAS APIキーをheaderに設定
const headers = { "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY! };

// 共通で利用するフェッチャー
const fetcher = (url: string) =>
  axios.get(url, { headers }).then((res) => res.data);

// 都道府県情報を取得する
export function usePrefectures() {
  const apiURL = "/api/prefectures";
  const fetcher2 = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(apiURL, fetcher2);

  return {
    // データは整形して返す
    prefectures: data as Prefecture[],
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
    // Resas独自のエラーをチェック
    const ResasError = isRESASError(res.data);
    if (ResasError) {
      console.log(`${ResasError.statusCode}: ${ResasError.errorMessage}`);
      return;
    }
    // 成功
    return { prefCode, data: res.data["result"]["data"][0]["data"] };
  } catch (error) {
    // エラー
    console.log(`Error getting population: ${error}`);
    return;
  }
}

// 取得は成功しているが、RESAS-APIのエラーがあるか判定する
export function isRESASError(data: any): RESASError | void {
  const objKeys = Object.keys(data);
  if (objKeys.includes("statusCode")) {
    // statusCodeがあるときは何らかのエラーが発生している
    return {
      statusCode: Number(data["statusCode"]),
      errorMessage: data["message"],
    };
  } else if (objKeys.length == 1 && objKeys[0] == "message") {
    // 429 Too Many Requests
    return { statusCode: 429, errorMessage: "Too Many Requests." };
  } else if (
    objKeys.length > 1 &&
    objKeys.includes("message") &&
    data[objKeys.indexOf("message")] == null
  ) {
    // 正しく取得できている
    console.log("getting data successfully");
    return;
  }
  // messageなしの何らかのエラー
  return { statusCode: 400, errorMessage: "Some Error Occured." };
}
