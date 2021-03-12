import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

export const fetchPackage = (codeBlock: string) => {
	const bifrostCache = localForage.createInstance({
		name: "bifrost",
	});
	return {
		name: "fetch-package",
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				if (args.path === "index.js") {
					return {
						loader: "jsx",
						contents: codeBlock,
					};
				}
				// const cachedResult = await bifrostCache.getItem<esbuild.OnLoadResult>(
				// 	args.path
				// );

				// if (cachedResult) {
				// 	return cachedResult;
				// }
				const { data, request } = await axios.get(args.path);

				const fileType = args.path.match(/.css$/) ? "css" : "jsx";

				const escapedCssString = data
					.replace(/\n/g, "")
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents =
					fileType === "css"
						? `
                const style = document.createElement("style");
                style.innerText = '${escapedCssString}';
                document.head.appendChild(style)
                `
						: data;
				//style.innerText = 'body{ background-color: "cyan"}';

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: contents,
					resolveDir: new URL("./", request.responseURL).pathname,
				};
				await bifrostCache.setItem(args.path, result);
				return result;
			});
		},
	};
};
