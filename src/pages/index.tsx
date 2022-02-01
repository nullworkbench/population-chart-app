import type { NextPage } from "next";
import styles from "@/styles/Home.module.scss";

import { usePrefectures } from "@/libs/ResasApi";

const Home: NextPage = () => {
  // 都道府県一覧を取得
  const { prefectures, isLoading, isError } = usePrefectures();

  return (
    <>
      {/* 都道府県一覧 */}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {prefectures()
              ? prefectures().map((prefecture, prefIdx) => (
                  <div key={prefIdx}>{prefecture["prefName"]}</div>
                ))
              : "Error"}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
