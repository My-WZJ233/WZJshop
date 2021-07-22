import {getGoodsList} from "../../service/goods";

Page({
	data: {
		keyword: '',
		categories: null,
		switchTitle1: '包邮',
		switchTitle2: '团购',
		itemTitle: '分类',
		sortOption: [{
				text: '默认',
				value: 0
			},
			{
				text: '销量',
				value: 1
			},
			{
				text: '推荐',
				value: 2
			},
			{
				text: '价格',
				value: 3
			},
			{
				text: '评论',
				value: 4
			},
		],
		goodsList: [],
		isLoading: false,
		sortValue: 0,
		mainActiveIndex: 0,
		isLast: false,//触底
		fromLast: false,
		page: 1,
      	sort: 'default', // 当前排序项
      	category_id: 0, // 分类ID
	},

	// 获取商品
	onLoad: function (options) {
		this.getData()
	},
    
	getData() {
		this.setData({isLoading: true, isLast: false})
      	if (!this.data.fromLast) this.setData({goodsList: []})
      	const {page, keyword, sortValue, category_id} = this.data

      	// 筛选
      	let params = {page, title: keyword, category_id}
      	if(sortValue!=='default') params[sortValue] = 1
		  // 获取数据
		  console.log(params);
      	getGoodsList(params).then(res => {
        	const {data, per_page} = res.goods
        	this.setData({
          		isLoading: false,
          		categories: JSON.parse(JSON.stringify(res.categories).replace(/name/gi,'text')),
          		goodsList: [...this.data.goodsList, ...data]
        	})

        	// 返回的商品数据,小于每页的数据, 那么是最后一页
        	if (data.length < per_page) {
        	  	this.setData({
        	  	    isLast: true
        	  	})
        	}
      	})
	},
	// 触底操作
    onReachBottom() {
		if (this.data.isLast) return
      	// 带着分页信息重新请求数据
      	this.setData({
        	fromLast: true,
        	page: this.data.page + 1
      	})
      	this.getData()
      	this.setData({fromLast: false})
	},

	// 获取用户输入
	onSearch(event) {
        this.setData({
          	keyword: event.detail
        })
        this.getData()
    },
	// onClick() {
	// 	Toast('搜索' + this.data.value);
	// },

	// 清空搜索
    clearSearch() {
      	this.setData({
        	keyword: '',
      	});
      	this.getData()
    },

	/**
     * 筛选框
     */
    // 排序列改变
    onSortChange(event) {
		this.setData({
		  	sortValue: event.detail
		})
		this.getData()
	},

	onClickNav({ detail = {} }) {
		this.setData({
			mainActiveIndex: detail.index || 0,
		});
	},
	onClickItem({ detail = {} }) {
		const category_id = this.data.category_id === detail.id ? 0 : detail.id;
		this.setData({ category_id });
		
	},
	//  分类查找
    onConfirm() {
		this.getData()
		this.selectComponent('#item').toggle();
	},
});