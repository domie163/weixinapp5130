<template>
    <view class="content">
        <form class="app-update-pv">
                <!--<view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                          class="title">音乐</view>
                    <picker @change="yinyueChange" :value="yinyueIndex" :range="yinyueOptions" range-key="yinyueName">
                        <view
                                :style='{"padding":"0 30rpx","boxShadow":"0 0 16rpx var(--publicSubColor) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"var(--publicMainColor)","borderRadius":"20rpx","color":"var(--publicMainColor)","textAlign":"left","borderWidth":"2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.yinyueId?ruleForm.yinyueName:"请选择音乐"}}</view>
                    </picker>
                </view>-->
                <!--<view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                          class="title">用户</view>
                    <picker @change="yonghuChange" :value="yonghuIndex" :range="yonghuOptions" range-key="yonghuName">
                        <view
                                :style='{"padding":"0 30rpx","boxShadow":"0 0 16rpx var(--publicSubColor) inset","backgroundColor":"rgba(255, 255, 255, 1)","borderColor":"var(--publicMainColor)","borderRadius":"20rpx","color":"var(--publicMainColor)","textAlign":"left","borderWidth":"2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.yonghuId?ruleForm.yonghuName:"请选择用户"}}</view>
                    </picker>
                </view>-->
                <view :style='{"boxShadow":"0","backgroundColor":"rgba(255, 255, 255, 0.25)","borderColor":"rgba(228, 232, 230, 1)","margin":"0 0 0px 0","borderWidth":"2rpx","borderStyle":"none none solid none ","height":"100rpx"}'
                      class="cu-form-group">
                    <view :style='{"width":"160rpx","fontSize":"28rpx","color":"var(--publicMainColor)","textAlign":"left"}'
                          class="title">类型</view>
                    <picker @change="yinyueCollectionTypesChange" :value="yinyueCollectionTypesIndex" :range="yinyueCollectionTypesOptions" range-key="indexName">
                        <view
                                :style='{"padding":"0 30rpx","boxShadow":"0 0 0px rgba(0,0,0,.6) inset","margin":"0","borderColor":"var(--publicMainColor)","backgroundColor":"#fff","color":"rgba(0, 0, 0, 1)","textAlign":"left","borderRadius":"0","borderWidth":"10rpx 2rpx","fontSize":"28rpx","borderStyle":"solid","height":"88rpx","marginTop":"7rpx"}'
                                class="uni-input">{{ruleForm.yinyueCollectionTypes?ruleForm.yinyueCollectionValue:"请选择类型"}}</view>
                    </picker>
                </view>

            <view class="btn">
                <button
                        :style='{"boxShadow":"0 0 16rpx rgba(0,0,0,0) inset","backgroundColor":"var(--publicMainColor)","borderColor":"#409EFF","borderRadius":"8rpx","color":"rgba(255, 255, 255, 1)","borderWidth":"0","width":"70%","fontSize":"32rpx","borderStyle":"solid","height":"80rpx"}'
                        @tap="onSubmitTap" class="bg-red">提交</button>
            </view>
        </form>

					<w-picker mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="insertTimeConfirm"
                              ref="insertTime" themeColor="#333333"></w-picker>
					<w-picker mode="dateTime" step="1" :current="false" :hasSecond="false" @confirm="createTimeConfirm"
                              ref="createTime" themeColor="#333333"></w-picker>


    </view>
</template>

<script>
    import wPicker from "@/components/w-picker/w-picker.vue";

    export default {
        data() {
            return {
                cross: '',
                ro:{
					yinyueId: false,
					yonghuId: false,
					yinyueCollectionTypes: false,
					insertTime: false,
					createTime: false,
        },
            ruleForm: {
					yinyueId: '',
					yonghuId: '',
					yinyueCollectionTypes: '',//数字
					yinyueCollectionValue: '',//数字对应的值
					insertTime: '',
					createTime: '',
            },
            // 登陆用户信息
            user: {},
            yinyueCollectionTypesOptions: [],
            yinyueCollectionTypesIndex : 0,
            yinyueOptions: [],//音乐
            yinyueIndex : 0,//音乐下标
            yonghuOptions: [],//用户
            yonghuIndex : 0,//用户下标

        }
        },
        components: {
            wPicker
        },
        computed: {
            baseUrl() {
                return this.$base.url;
            },
        },
        async onLoad(options) {
            let yinyueParams = {
                page: 1,
                limit: 100,
            }
            let yinyueData = await this.$api.page(`yinyue`, yinyueParams);
            this.yinyueOptions = yinyueData.data.list;
            let yonghuParams = {
                page: 1,
                limit: 100,
            }
            let yonghuData = await this.$api.page(`yonghu`, yonghuParams);
            this.yonghuOptions = yonghuData.data.list;
		/*下拉框*/
			let yinyueCollectionTypesParams = {
                page: 1,
                limit: 100,
                dicCode: 'yinyue_collection_types',
            }
			let yinyueCollectionTypes = await this.$api.page(`dictionary`, yinyueCollectionTypesParams);
			this.yinyueCollectionTypesOptions = yinyueCollectionTypes.data.list


            // 如果是更新操作
            if (options.id) {
                this.ruleForm.id = options.id;
                // 获取信息
                let res = await this.$api.info(`yinyueCollection`, this.ruleForm.id);
                this.ruleForm = res.data;
            }
            if(options.yinyueCollectionId){
                this.ruleForm.yinyueCollectionId = options.yinyueCollectionId;
            }
            // 跨表
            // this.styleChange()
        },
        methods: {
            yinyueChange(e) {
                this.yinyueIndex = e.target.value
                this.ruleForm.yinyueName = this.yinyueOptions[this.yinyueIndex].yinyueName
                this.ruleForm.yinyueId = this.yinyueOptions[this.yinyueIndex].id
            },
            yonghuChange(e) {
                this.yonghuIndex = e.target.value
                this.ruleForm.yonghuName = this.yonghuOptions[this.yonghuIndex].yonghuName
                this.ruleForm.yonghuId = this.yonghuOptions[this.yonghuIndex].id
            },
            // 下拉变化
            yinyueCollectionTypesChange(e) {
                this.yinyueCollectionTypesIndex = e.target.value
                this.ruleForm.yinyueCollectionValue = this.yinyueCollectionTypesOptions[this.yinyueCollectionTypesIndex].indexName
                this.ruleForm.yinyueCollectionTypes = this.yinyueCollectionTypesOptions[this.yinyueCollectionTypesIndex].codeIndex
            },
            // styleChange() {
            // 	this.$nextTick(() => {
            // 		// document.querySelectorAll('.app-update-pv .cu-form-group .uni-yaoxianStyle-yaoxianStyle').forEach(el=>{
            // 		//   el.style.backgroundColor = this.addUpdateForm.yaoxianStyle.content.backgroundColor
            // 		// })
            // 	})
            // },
			// 日期控件
			insertTimeConfirm(val) {
                this.ruleForm.insertTime = val.result;
                this.$forceUpdate();
            },
			// 日期控件
			createTimeConfirm(val) {
                this.ruleForm.createTime = val.result;
                this.$forceUpdate();
            },

            getUUID() {
                return new Date().getTime();
            },
            async onSubmitTap() {
                if (this.ruleForm.id) {
                    await this.$api.update(`yinyueCollection`, this.ruleForm);
                } else {
                    await this.$api.save(`yinyueCollection`, this.ruleForm);
                }
                uni.setStorageSync('pingluenStateState', true);
                this.$utils.msgBack('提交成功');
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            },
            toggleTab(str) {
                this.$refs[str].show();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding: 20upx;
    }

    .content:after {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: '';
        background-attachment: fixed;
        background-size: cover;
        background-position: center;
    }

    textarea {
        border: 1upx solid #EEEEEE;
        border-radius: 20upx;
        padding: 20upx;
    }

    .title {
        width: 180upx;
    }

    .avator {
        width: 150upx;
        height: 60upx;
    }

    .right-input {
        flex: 1;
        text-align: left;
        padding: 0 24upx;
    }

    .cu-form-group.active {
        justify-content: space-between;
    }

    .cu-form-group .title {
        height: auto;
        line-height:30rpx
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 20upx 0;
    }

    .cu-form-group {
        padding: 0 24upx;
        background-color: transparent;
        min-height: inherit;
    }

    .cu-form-group+.cu-form-group {
        border: 0;
    }

    .cu-form-group uni-input {
        padding: 0 30upx;
    }

    .uni-input {
        padding: 0 30upx;
    }

    .cu-form-group uni-textarea {
        padding: 30upx;
        margin: 0;
    }

    .cu-form-group uni-picker::after {
        line-height: 80rpx;
    }

    .select .uni-input {
        line-height: 80rpx;
    }

    .input .right-input {
        line-height: 88rpx;
    }
</style>