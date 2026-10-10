import { defineConfig, type Rollup } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

const srcRoot = fileURLToPath(new URL("./src", import.meta.url));

/**
 * One output module per source module (`preserveModules`), so a consumer's bundler keeps only the
 * components it imports instead of receiving one 800 kB file. `src/` is the root, so
 * `src/index.ts` lands at `dist/index.js` / `dist/index.cjs` (what package.json points at) and
 * `src/components/general/Button.tsx` at `dist/components/general/Button.js`, beside the `.d.ts`
 * tsc writes for it.
 *
 * Dependencies are still bundled (only React is external), each as its own module. Rollup would
 * place them under `dist/node_modules/`, which git (.gitignore) and `npm pack` both skip, so they
 * are renamed to `dist/vendor/`. Rollup's commonjs helpers land in `dist/_virtual/`.
 */
function moduleOutput(format: "es" | "cjs", ext: "js" | "cjs"): Rollup.OutputOptions {
  return {
    format,
    preserveModules: true,
    preserveModulesRoot: srcRoot,
    entryFileNames: (chunk) => `${chunk.name.replace(/(^|\/)node_modules\//g, "$1vendor/")}.${ext}`,
    assetFileNames: "assets/[name][extname]",
    exports: "named",
  };
}

export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    dts({
      include: ["src"],
      outDir: "dist",
      rollupTypes: true,
    }),
  ],
  build: {
    // dist/ is committed: start from an empty folder so it holds exactly what this build writes
    // (the modules, assets/styles.css, and public/'s fonts and logos) and never a stale file.
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "SynapseUI",
      cssFileName: "styles",
    },
    rollupOptions: {
      // Bundle border-beam so consumers get brand-patched beam without a peer dep.
      external: ["react", "react-dom", "react/jsx-runtime"],
      // The formats are listed here, not in `lib.formats`: each one needs its own extension.
      output: [moduleOutput("es", "js"), moduleOutput("cjs", "cjs")],
    },
    cssCodeSplit: false,
  },
});
