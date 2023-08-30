import cityList from "./cityList";
Component({
    properties: {
        books: { type: Array, value: cityList },
        sortIndex:{ type:Array, value:['A','B','C','D','E','F','G','H','I','J','K','L','M','O','P','Q','R','S','T','U','V','W','X','Y','Z'] },
        value: null,
    },
    data: {
        scrollIntoView:null, // 滚动位置
        sortBy:'', // 右侧索引
        sortTargetPosition:[], //   索引bar对应的位置
        scrollBoxIndexPosition:[], // 滚动索引的位置
        scrollBodyTop: 0, // 滚动初始值
        showTip:false, // 显示toolTip
    },
    lifetimes:{
        ready() {
            // 获取右侧滚动索引的每一项位置
            this.createSelectorQuery().selectAll('.select-book__sort-bar__item').boundingClientRect(rect => {
                this.setData({sortTargetPosition: rect?.map( (ele) => ({ id:ele.dataset.sortBy, position: ele.top }) )})
            }).exec()
            // 获取滚动索引的位置
            this.createSelectorQuery().selectAll('.item-row').boundingClientRect(res => {
                this.setData({scrollBoxIndexPosition:res})
            }).exec()
            // 获取滚动body的top值作为差计算
            this.createSelectorQuery().select('.select-book-body').boundingClientRect().exec(res => {
                this.setData({scrollBodyTop:res[0].top})
            })
        }
    },
    methods: {
        /** 点击item */
        handleClick(event){
            const { item } = event.currentTarget.dataset
            this.triggerEvent('click',item)
        },
        /** 点击索引 */
        clickSort(event){
            const { sortBy:id } = event.currentTarget.dataset
            this.setData({scrollIntoView: id})
        },
        handleTouchStart(){
          this.setData({ showTip:true })
        },
        handleTouchEnd(){
            this.setData({ showTip:false })
        },
        /** 触碰索引 */
        handleTouch(event){
            const { clientY } = event.touches[0]
            const findItem = this.data.sortTargetPosition.filter( ele => ele.position <= clientY )
            const id = findItem.pop()?.id
            if(id && id !== this.data.scrollIntoView) this.setData({scrollIntoView: id})
        },

        /** 整体滚动，控制右侧滚动条  */
        scrollBox(event){
            const { scrollTop } = event.detail;
            const findItem = this.data.scrollBoxIndexPosition.filter( ele => ele.top <= scrollTop + (this.data.scrollBodyTop / 2))
            const id = findItem.pop()?.id
            if(id) this.setData({sortBy:id})
        },
    },
});
