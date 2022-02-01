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
        <Wrapper>
          {prefectures()
            ? prefectures()!.map((prefecture, prefIdx) => (
                <CheckBox
                  key={prefIdx}
                  prefCode={prefecture.prefCode}
                  prefName={prefecture.prefName}
                />
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

const CheckBox: React.FC<{ prefCode: number; prefName: string }> = (prop) => {
  const Div = styled.div`
    width: 6rem;
    padding: 1rem 0.5rem;
  `;
  return (
    <Div>
      <input type="checkbox" id={"pref" + prop.prefCode} />
      <label htmlFor={"pref" + prop.prefCode}>{prop.prefName}</label>
    </Div>
  );
};

export default SelectPrefectures;
