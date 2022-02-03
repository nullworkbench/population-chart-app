import axios from "axios";
import useSWR from "swr";

// 都道府県の型
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

// 総人口の型
type Population = {
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

// 取得は成功しているが、RESAS-APIのエラーがあるか判定する
function isRESASError(data: any): {
  statusCode: number;
  errorMessage: string;
} | void {
  const objKeys = Object.keys(data);
  if (objKeys.includes("statusCode")) {
    // statusCodeがあるときは何らかのエラーが発生している
    console.log("Error getting data");
    return {
      statusCode: Number(data["statusCode"]),
      errorMessage: data["message"],
    };
  } else if (objKeys.length == 0) {
    // messageなしの何らかのエラー
    return { statusCode: Number(data), errorMessage: `${data} Error.` };
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
  return { statusCode: 400, errorMessage: "Some Error Occured." };
}
