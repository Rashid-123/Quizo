// import * as path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// const basenameProd = "/shadcn-sample/";

// export default defineConfig(({ command }) => {
//   const isProd = command === "build";

//   return {
//     base: isProd ? basenameProd : "/",
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     define: {
//       __GLOBAL_BASENAME__: JSON.stringify(isProd ? basenameProd : ""),
//     },
//     build: {
//       commonjsOptions: {
//         transformMixedEsModules: true,
//       },
//     },
//   };
// });

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  return {
    base: "", // ✅ Fix: Remove the `/shadcn-sample` base
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
