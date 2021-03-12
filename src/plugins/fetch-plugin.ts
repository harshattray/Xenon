import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const bifrostCache = localForage.createInstance({
	name: "bifrost",
});

export const fetchPlugin = (codeBlock:string) => {
	return {
		name: "unpkg-path-plugin",
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log("onResole", args);
				if (args.path === "index.js") {
					return { path: args.path, namespace: "a" };
				}
				if (args.path.includes("./") || args.path.includes("../")) {
					return {
						namespace: "a",
						path: new URL(
							args.path,
							"https://unpkg.com" + args.resolveDir + "/"
						).href,
					};
				}
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				if (args.path === "index.js") {
					return {
						loader: "jsx",
						contents: codeBlock,
					};
				}

				const cachedResult = await bifrostCache.getItem<esbuild.OnLoadResult>(args.path);

				if (cachedResult) {
					return cachedResult;
				}
				const { data, request } = await axios.get(args.path);
				const result :esbuild.OnLoadResult = {
					loader: "jsx",
					contents: data,
					resolveDir: new URL("./", request.responseURL).pathname,
				};
				await bifrostCache.setItem(args.path, result);
				return result;
			});
		},
	};
};
