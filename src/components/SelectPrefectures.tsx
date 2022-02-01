// 都道府県を選択するチェックボックス
import styled from "styled-components";

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
                <CheckBox
                  key={prefIdx}
                  prefCode={prefecture.prefCode}
                  prefName={prefecture.prefName}
                />
              ))
            : "Error"}
        </>
      )}
    </div>
  );
};

const CheckBox: React.FC<{ prefCode: number; prefName: string }> = (prop) => {
  return (
    <div>
      <input type="checkbox" id={"pref" + prop.prefCode} />
      <label htmlFor={"pref" + prop.prefCode}>{prop.prefName}</label>
    </div>
  );
};

export default SelectPrefectures;
