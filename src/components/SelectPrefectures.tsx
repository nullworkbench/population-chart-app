// 都道府県を選択するチェックボックス

import styled from "styled-components";

import { Prefecture } from "@/libs/ResasApi";
import { usePrefectures } from "@/libs/ResasApi";

import Checkbox from "@/components/ui/Checkbox";
import { ChangeEvent } from "react";

type Props = {
  // 親のuseStateを呼び出す
  selectedPrefs: Prefecture[];
  handleCheckboxChange: Function;
};

const SelectPrefectures: React.FC<Props> = (prop) => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  if (isLoading) {
    return <p data-testid="loadingText">Loading...</p>;
  } else {
    if (prefectures()) {
      return (
        <Wrapper>
          {prefectures()!.map((prefecture, prefIdx) => (
            <Checkbox
              key={prefIdx}
              checked={false}
              label={prefecture.prefName}
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                prop.handleCheckboxChange(e.target.checked, prefecture)
              }
            />
          ))}
        </Wrapper>
      );
    } else {
      return <p data-testid="errorMessage">An Error Occured. Please Reload.</p>;
    }
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SelectPrefectures;
