import { loadEnvConfig } from "@next/env";
// 環境変数を扱うための設定
const setupEnv = async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

export default setupEnv;
