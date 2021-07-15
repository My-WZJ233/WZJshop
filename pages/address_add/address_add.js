import { areaList } from '@vant/area-data';
import validate from '../../utils/validate'
import {addAddress, getAddressInfo, updateAddress} from '../../service/address'
import toast from '../../utils/toast'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        areaList,
        showCity: false,

        name: '',
        phone: '',
        address: '',
        province: '',
        city: '',
        county: '',
        is_default: 0,

        error_name: '',
        error_phone: '',
        error_address: '',
        error_city: '',

        selectCity: '',

        editId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 如果有ID, 那就是编辑操作
        if(options.id) {
            wx.setNavigationBarTitle({title: '编辑地址'})
            this.setData({
                editId: options.id
            })
            // 请求API, 获取要编辑的数据详情
            getAddressInfo(options.id).then(res => {
                console.log(res)
                this.setData({
                    ...res,
                    selectCity: res.province + "-" + res.city + '-' + res.county,
                    checked: res.is_default ? true : false
                })
            })
        }
    },

    /**
     * 是否默认
     */
    onChange(event) {
        this.setData({
            checked: event.detail,
            is_default: event.detail ? 1 : 0
        })
    },

    /**
     * 显示城市选择
     */
    openCity() {
        this.setData({
            showCity: true
        })
    },

    /**
     * 关闭城市选择
     */
    closeCity() {
        this.setData({
            showCity: false
        })
    },

    /**
     * 确认城市选择
     */
    confirmCity(event) {
        const values = event.detail.values
        this.setData({
            showCity: false,
            province: values[0].name,
            city: values[1].name,
            county: values[2].name,
            selectCity: values[0].name + '-' + values[1].name + '-' + values[2].name
        })
        this.checkInput()
    },

    /**
     * 添加地址 / 更新地址
     */
    onAddAddress() {
        // 1. 表单验证
        const check = this.checkInput()
        if (!check) return

        // 2. 处理提交的数据
        const {name, phone, province, city, county, address, is_default} = this.data
        const data = {name, phone, province, city, county, address, is_default}

        // 如果有编辑的id, 那么使用更新数据的 API
        if (this.data.editId) {
            // 3. 执行修改
            updateAddress(this.data.editId, data).then(() => {
                // 4. 弹窗提醒
                toast.success('修改成功', () => {
                    // 5. 返回列表
                    wx.navigateBack()
                })

            })

        } else { // 没有 editId, 那就是添加数据
            // 3. 执行添加
            addAddress(data).then(() => {
                // 4. 弹窗提醒
                toast.success('添加成功', () => {
                    // 5. 返回列表
                    wx.navigateBack()
                })

            })
        }
       
    },

    /**
     * 表单数据验证
     * @returns {boolean}
     */
    checkInput() {
        const checkName = validate.min(this.data.name, 2)
        const checkPhone = validate.phone(this.data.phone)
        const checkCity = validate.min(this.data.city, 2)
        const checkAddress = validate.min(this.data.address, 2)

        if(!checkName) {
            this.setData({error_name: '请输入收货联系人'})
        } else {
            this.setData({error_name: ''})
        }

        if (!checkPhone) {
            this.setData({ error_phone: '手机号格式不正确'})
        } else {
            this.setData({error_phone: ''})
        }

        if(!checkCity) {
            this.setData({error_city: '请选择城市'})
        } else {
            this.setData({error_city: ''})
        }

        if(!checkAddress) {
            this.setData({error_address: '请输入详细地址'})
        } else {
            this.setData({error_address: ''})
        }

        // 全部验证通过才返回 true
        if(checkName && checkPhone && checkCity && checkAddress) return true
        return false
    }
})