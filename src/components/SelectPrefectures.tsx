// 都道府県を選択するチェックボックス

import { usePrefectures } from "@/libs/ResasApi";

const SelectPrefectures: React.FC = () => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {prefectures()
            ? prefectures()!.map((prefecture, prefIdx) => (
                <div key={prefIdx}>{prefecture["prefName"]}</div>
              ))
            : "Error"}
        </>
      )}
    </div>
  );
};

export default SelectPrefectures;
