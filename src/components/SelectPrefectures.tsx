// 都道府県を選択するチェックボックス

import styled from "styled-components";

import { usePrefectures } from "@/libs/ResasApi";

import Checkbox from "@/components/ui/Checkbox";
import { ChangeEvent, useEffect } from "react";

type Props = {
  // 親のuseStateを呼び出す
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

  // デフォルトでチェックを入れておく都道府県のprefCode
  const defaultCheckedPrefCode = 13;

  // 都道府県の取得が終わったタイミングで、デフォルトでオンの都道府県をチェックする
  useEffect(() => {
    const prefs = prefectures();
    if (prefs) {
      prop.handleCheckboxChange(
        true,
        prefs.find((p) => p.prefCode == defaultCheckedPrefCode)
      );
    }
    // propなども含めると無限ループに陥るためルールを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <p data-testid="loadingText">Loading...</p>;
  } else {
    const prefs = prefectures();
    if (prefs) {
      return (
        <div>
          {/* 地方ごとに分類して都道府県を表示 */}
          {regionNames.map((region, rIdx) => {
            return (
              <RegionWrapper key={rIdx}>
                <p>{region.name}</p>
                <div className="prefs">
                  {prefs
                    .filter(
                      (p) =>
                        p.prefCode >= region.prefCodeRange.min &&
                        p.prefCode <= region.prefCodeRange.max
                    )
                    .map((pref, prefIdx) => (
                      <CheckboxWrapper key={prefIdx}>
                        <Checkbox
                          // デフォルトでチェックする都道府県の場合はtrue
                          checked={
                            pref.prefCode == defaultCheckedPrefCode
                              ? true
                              : false
                          }
                          label={pref.prefName}
                          handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            prop.handleCheckboxChange(e.target.checked, pref)
                          }
                        />
                      </CheckboxWrapper>
                    ))}
                </div>
              </RegionWrapper>
            );
          })}
        </div>
      );
    } else {
      return <p data-testid="errorMessage">An Error Occured. Please Reload.</p>;
    }
  }
};

const RegionWrapper = styled.div`
  margin-bottom: 0.5rem;
  & > p {
    margin-bottom: 0.2rem;
  }
  & > .prefs {
    display: flex;
    flex-wrap: wrap;
  }
`;

const CheckboxWrapper = styled.div`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default SelectPrefectures;
