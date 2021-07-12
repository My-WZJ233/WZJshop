// components/upload-oss/upload-oss.js
import {ossToken} from "../../service/auth";

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    options: {
        styleIsolation: 'shared'
    },

    /**
     * 组件的初始数据
     */
    data: {
        fileList: [],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 读取文件后的事件, 一般在这里执行上传
         */
        afterRead(event) {
            const { file } = event.detail;
           

            // 执行上传
            // 参考示例 https://help.aliyun.com/document_detail/92883.html?spm=a2c4g.11174283.6.1739.25074c07xF24iT#title-stj-kja-pvd
            // 请求API, 获取oss token
            ossToken().then(res => {
                wx.showLoading({
                    title: '上传中..'
                })
                const {host, policy, accessid, signature} = res
                const key = 'upload/' + file.url.slice(11);

                wx.uploadFile({
                    url: host, // 开发者服务器的URL。
                    filePath: file.url,
                    name: 'file', // 必须填file。
                    formData: {
                        key,
                        policy,
                        OSSAccessKeyId: accessid,
                        signature,
                    },
                    success: (res) => {
                        wx.hideLoading()
                        if (res.statusCode === 204) {

                            wx.showToast({
                                title: '上传成功',
                                icon: 'success'
                            })

                            // 将key传递给父组件
                            this.triggerEvent('getfilekey', key)
                        }
                    },
                    fail: err => {
                        wx.hideLoading()
                        console.log(err);
                    }
                });
            })
        },

        /**
         * 上传前的事件, 一般做一些上传前的校验
         */
        beforeRead(event) {
            const { file, callback } = event.detail;
            callback(file.type === 'image')
        },

        /**
         * 超过大小限制
         */
        overSize() {
            wx.showToast({
                title: '文件不能超过 10MB',
                icon: 'none'
            })
        },
    }
})
