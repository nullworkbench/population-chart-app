import useSWR from "swr";

// RESAS APIのエンドポイント
const endPoint = "https://opendata.resas-portal.go.jp/api/v1";

// RESAS APIキーをheaderに設定
const headers = new Headers();
headers.set("X-API-KEY", process.env.RESAS_API_KEY!);

// 共通で利用するフェッチャー
const fetcher = (url: string) =>
  fetch(url, {
    headers,
  }).then((res) => res.json());

// 都道府県情報を取得する
export function usePrefectures() {
  const apiURL = endPoint + "/prefectures";
  const { data, error } = useSWR(apiURL, fetcher);

  return {
    prefectures: data,
    isLoading: !error && !data,
    isError: error,
  };
}
