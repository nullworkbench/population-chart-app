import useSWR from "swr";

// RESAS APIのエンドポイント
const endPoint = "https://opendata.resas-portal.go.jp/api/v1";

// RESAS APIキーをheaderに設定
const headers = new Headers();
headers.set("X-API-KEY", process.env.NEXT_PUBLIC_RESAS_API_KEY!);

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
    // データは整形して返す
    prefectures: (): [] | null => {
      // messageがnullの場合は取得が成功している
      if (data["message"] == null) {
        return data["result"];
      } else {
        return null;
      }
    },
    isLoading: !error && !data,
    isError: error,
  };
}
