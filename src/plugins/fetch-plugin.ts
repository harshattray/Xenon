import * as esbuild from "esbuild-wasm";

export const fetchPlugin = () => {
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
		},
	};
};
