import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch-plugin";
import {fetchPackage} from "./plugins/fetch-package";

let service: esbuild.Service;

export const ServiceTrigger = async (userGenCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	}
	const result = await service.build({
		entryPoints: ["index.js"],
		bundle: true,
		write: false,
		plugins: [fetchPlugin(), fetchPackage(userGenCode)],
		define: {
			"process.env.NODE_ENV": '"production"',
			global: "window",
		},
	});
	return result.outputFiles[0].text;
};

export default ServiceTrigger;
