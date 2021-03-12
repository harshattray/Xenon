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
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: "jsx",
					contents: codeBlock,
				};
			});

            build.onLoad({filter:/.*/},async(args: any) =>{
                const cachedResult = await bifrostCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				if (cachedResult) return cachedResult;
            })

			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				
				const { data, request } = await axios.get(args.path);
				const escapedCssString = data
					.replace(/\n/g, "")
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents =`
                const style = document.createElement("style");
                style.innerText = '${escapedCssString}';
                document.head.appendChild(style)
                `
				//style.innerText = 'body{ background-color: "cyan"}';

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: contents,
					resolveDir: new URL("./", request.responseURL).pathname,
				};
				await bifrostCache.setItem(args.path, result);
				return result;
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
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
