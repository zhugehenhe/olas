import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

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
//请求拦截器
instance.interceptors.request.use((config) => {
	if (config.headers.Authorization == "") {
		const token = localStorage.getItem("token");
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
});
//响应拦截器
instance.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// 处理错误
		console.log("响应错误：", error);
		if (error.response.data.status == 401) {
			ElMessage.error("登录已过期，请重新登录");
			localStorage.clear();
			router.push("/login");
		}
		return Promise.reject(error);
	}
);

export default instance;
