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
  function handleCheckboxChange(
    e: ChangeEvent<HTMLInputElement>,
    prefCode: number
  ) {
    if (e.target.value) {
      // 選択したとき
      // 引数のprefCodeと一致しないもののみを返す（一致するものを削除する）
      const _new = prop.selectedPrefs.filter((pref, idx) => pref != prefCode);
      _new.push(prefCode);
      prop.setSelectedPrefs([..._new]);
    } else {
      // 選択を解除したとき
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper>
          {prefectures()
            ? prefectures()!.map((prefecture, prefIdx) => (
                <CheckBoxWrap key={prefIdx}>
                  <input
                    type="checkbox"
                    id={"pref" + prefecture.prefCode}
                    onChange={(e) =>
                      handleCheckboxChange(e, prefecture.prefCode)
                    }
                  />
                  <label htmlFor={"pref" + prefecture.prefCode}>
                    {prefecture.prefName}
                  </label>
                </CheckBoxWrap>
              ))
            : "Error"}
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
