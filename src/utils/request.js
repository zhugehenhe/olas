import axios from "axios";

const instance = axios.create({
	withCredentials: false, //跨域请求时是否携带凭证信息
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 15000,
	responseType: "json", // 响应数据格式
	responseEncoding: "utf8", // 响应数据编码
	headers: {
		"Content-Type": "application/json",
		Authorization: "",
	},
});
axios.defaults.headers = {
	"Content-Type": "application/json;charset=utf-8",
};
/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
	console.log("请求参数：", config);
	return config;
});
/**
 * 响应拦截器
 */
instance.interceptors.response.use((response) => {
	console.log("响应参数：", response);
	return response.data;
});

export default instance;
