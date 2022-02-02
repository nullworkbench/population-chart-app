// 都道府県を選択するチェックボックス

import { ChangeEvent } from "react";
import styled from "styled-components";

import { usePrefectures } from "@/libs/ResasApi";

type Props = {
  // 親のuseStateを呼び出す
  selectedPrefs: number[];
  handleCheckboxChange: Function;
};

const SelectPrefectures: React.FC<Props> = (prop) => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

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
                    prop.handleCheckboxChange(
                      e.target.checked,
                      prefecture.prefCode
                    )
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
