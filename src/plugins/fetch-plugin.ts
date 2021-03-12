import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const bifrostCache = localForage.createInstance({
	name: "bifrost",
});

export const fetchPlugin = (codeBlock: string) => {
	return {
		name: "unpkg-path-plugin",
		setup(build: esbuild.PluginBuild) {
			/**
			 * Handle root entry file of index.js
			 */
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return {
					path: "index.js",
					namespace: "a",
				};
			});

			/**
			 * for handling relative paths "./" or "../"
			 */
			build.onResolve({ filter: /^\.+\// }, async (args: any) => {
				return {
					namespace: "a",
					path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
						.href,
				};
			});

			/**
			 * for handling main file
			 */
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				};
			});

			/**
			 *
			 */

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				if (args.path === "index.js") {
					return {
						loader: "jsx",
						contents: codeBlock,
					};
				}

				const cachedResult = await bifrostCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				if (cachedResult) {
					return cachedResult;
				}
				const { data, request } = await axios.get(args.path);
				const result: esbuild.OnLoadResult = {
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
