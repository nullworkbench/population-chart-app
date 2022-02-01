// 都道府県を選択するチェックボックス

import { ChangeEvent } from "react";
import styled from "styled-components";

import { usePrefectures } from "@/libs/ResasApi";

type Props = {
  // 親のuseStateを呼び出す
  selectedPrefs: number[];
  setSelectedPrefs: Function;
};

const SelectPrefectures: React.FC<Props> = (prop) => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  // チェックを切り替えたときに選択一覧の配列を更新する
  function handleCheckboxChange(checked: boolean, prefCode: number) {
    // 引数のprefCodeと一致するものを削除する
    const _new = prop.selectedPrefs.filter((pref) => pref != prefCode);
    // 選択したときは要素を追加
    if (checked) {
      _new.push(prefCode);
    }
    // 親の配列を更新
    prop.setSelectedPrefs(_new);
  }
  return (
    <div>
      {isLoading ? (
        <p data-testid="loadingText">Loading...</p>
      ) : (
        <Wrapper>
          {prefectures() ? (
            prefectures()!.map((prefecture, prefIdx) => (
              <CheckBoxWrap
                key={prefIdx}
                style={{
                  // 選択中の場合は背景色をつける
                  background: prop.selectedPrefs.includes(prefecture.prefCode)
                    ? "#67e8f9"
                    : "none",
                }}
              >
                <input
                  type="checkbox"
                  id={"pref" + prefecture.prefCode}
                  onChange={(e) =>
                    handleCheckboxChange(e.target.checked, prefecture.prefCode)
                  }
                />
                <label htmlFor={"pref" + prefecture.prefCode}>
                  {prefecture.prefName}
                </label>
              </CheckBoxWrap>
            ))
          ) : (
            <p data-testid="errorMessage">An Error Occured. Please Reload.</p>
          )}
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckBoxWrap = styled.div`
  width: 6rem;
  padding: 1rem 0.5rem;
`;

export default SelectPrefectures;
