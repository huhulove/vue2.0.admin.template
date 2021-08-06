const config = {
	baseUrl: 'http://www.huhulove.com/api/',
	fileUrl: 'http://192.168.1.220:9005/api/',
	mainTitle: '医工/第三方智能化平台'
};
if (typeof window !== 'undefined' && window.document) {
	window.globalConfig = config;
} else {
	module.exports = config;
}
