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

// 地方名
const regionNames = [
  { name: "北海道・東北", prefCodeRange: { min: 1, max: 7 } },
  { name: "関東", prefCodeRange: { min: 8, max: 14 } },
  { name: "北陸・信越", prefCodeRange: { min: 15, max: 20 } },
  { name: "東海", prefCodeRange: { min: 21, max: 24 } },
  { name: "近畿", prefCodeRange: { min: 25, max: 30 } },
  { name: "中国・四国", prefCodeRange: { min: 31, max: 39 } },
  { name: "九州・沖縄", prefCodeRange: { min: 40, max: 47 } },
];

const SelectPrefectures: React.FC<Props> = (prop) => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  if (isLoading) {
    return <p data-testid="loadingText">Loading...</p>;
  } else {
    const prefs = prefectures();
    if (prefs) {
      return (
        <Wrapper>
          {prefs.map((pref, prefIdx) => (
            <Checkbox
              key={prefIdx}
              checked={false}
              label={pref.prefName}
              handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                prop.handleCheckboxChange(e.target.checked, pref)
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
