import type { NextPage } from "next";
import styles from "@/styles/Home.module.scss";

import SelectPrefectures from "@/components/SelectPrefectures";

const Home: NextPage = () => {
  return (
    <>
      {/* 都道府県一覧 */}
      <SelectPrefectures />
    </>
  );
};

export default Home;
