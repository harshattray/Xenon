import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { fetchPackage } from "./plugins/fetch-package";

let service: esbuild.Service;

export const ServiceTrigger = async (userGenCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	}

	try {
		const result = await service.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [fetchPlugin(), fetchPackage(userGenCode)],
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
			jsxFactory:'_React.createElement',
			jsxFragment:'_React.Fragment'
		});
		return  {
			code: result.outputFiles[0].text,
			err:''
		}
	} catch (e) {
		return{
			code:'',
			err: e.message
		}
	}
};

export default ServiceTrigger;
