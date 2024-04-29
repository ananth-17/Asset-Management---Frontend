import axiosInstance from "./axiosInstance"

const axiosBaseQuery = 
	({ baseUrl } = { baseUrl: 'http://localhost:8080/'}) =>
	async ({ url, method, body, params, headers, responseType} :any ) => {
		try {
			const result = await axiosInstance({
				url: baseUrl + url,
				method,
				data: body,
				params,
				headers,
				responseType: responseType === undefined ? 'json' : responseType
			})
			console.log("result ", result);
			return { data: result};
		} catch (axiosError) {
			console.log("axiosError ", axiosError);
			const err:any = axiosError;
			return{
				error: {
					status: err.response?.status,
					message: err.response?.data || err.message
				}
			}
		}
	}

export default axiosBaseQuery;