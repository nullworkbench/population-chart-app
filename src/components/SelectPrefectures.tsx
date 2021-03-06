// 都道府県を選択するチェックボックス

import styled from "styled-components";

import { usePrefectures } from "@/libs/ResasApi";

import Checkbox from "@/components/ui/Checkbox";
import { ChangeEvent, useEffect } from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import AccordionItem from "@/components/ui/accordion/AccordionItem";

type Props = {
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

const SelectPrefectures: React.FC<Props> = (props) => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  // デフォルトでチェックを入れておく都道府県のprefCode
  const defaultCheckedPrefCode = 13;

  // 都道府県の取得が終わったタイミングで、デフォルトでオンの都道府県をチェックする
  useEffect(() => {
    if (!isLoading && !isError) {
      props.handleCheckboxChange(
        true,
        prefectures.find((p) => p.prefCode == defaultCheckedPrefCode)
      );
    }
    // propなども含めると無限ループに陥るためルールを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <p data-testid="loadingText">Loading...</p>;
  }
  if (isError) {
    return <p data-testid="errorMessage">An Error Occured. Please Reload.</p>;
  }
  return (
    <div>
      {/* 地方ごとに分類して都道府県を表示 */}
      <Accordion>
        {regionNames.map((region, rIdx) => {
          return (
            <AccordionItem
              key={rIdx}
              title={region.name}
              openDefault={region.name == "関東" ? true : false}
            >
              <RegionWrapper>
                {prefectures
                  .filter(
                    (p) =>
                      p.prefCode >= region.prefCodeRange.min &&
                      p.prefCode <= region.prefCodeRange.max
                  )
                  .map((pref, prefIdx) => (
                    <Checkbox
                      key={prefIdx}
                      // デフォルトでチェックする都道府県の場合はtrue
                      checked={
                        pref.prefCode == defaultCheckedPrefCode ? true : false
                      }
                      label={pref.prefName}
                      handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
                        props.handleCheckboxChange(e.target.checked, pref)
                      }
                    />
                  ))}
              </RegionWrapper>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

const RegionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.3rem;
`;

export default SelectPrefectures;
