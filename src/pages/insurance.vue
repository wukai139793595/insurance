<template>
    <div class="insurance">
        <div class="head">
            <div class="turn-back">
                <img src="../assets/icon/left-direction.png" alt="">
            </div>
            <div class="title">
                保单管理
            </div>
            <div class="select" @click="selectShow($event)">
                <img src="../assets/icon/select-icon.png" alt="">
                <span>筛选</span>
            </div>
        </div>
        <div class="search">
            <div class="input" @click="toSearch($event)">
                <img src="../assets/icon/search-icon.png" alt="">
                <span>搜索</span>
            </div>
        </div>
        <scroll @refresh="refresh" @loadmore="loadmore">
            <div class="container">
                <div class="people-wrap" v-for="(item, index) in insuranceList" :key='index'>
                    <div class="name-box">
                        <div class="name">戴安娜</div>
                        <div class="is-insurance">已交保</div>
                    </div>
                    <div class="competite-info">
                        <div class="competite-name">
                            <span>赛事名称：</span>
                            <span>新版赛事管理费下限测试</span>
                        </div>
                        <div class="group-name">
                            <span>小组名称：</span>
                            <span>围棋一组</span>
                        </div>
                        <div class="begin-time">
                            <span>起止时间：</span>
                            <span>2019-02-18至2019-03-18</span>
                        </div>
                    </div>
                    <div class="insurance-sum">
                        <span>保险金额:</span>
                        <span>10元</span>
                    </div>
                    <div class="surrender">
                        退保
                    </div>
                </div>
            </div>            
        </scroll>
        <transition name="slide">
            <div class="select-content" v-if="isShow">
                <div class="mask" @click="selectShow($event)"></div>
                <div class="select-box">
                    <div class="select-hint">保险起止时间</div>
                    <div class="time-wrap">
                        <el-date-picker
                            class="data-picker"
                            v-model="value11"
                            type="date"
                            :placeholder="today|moment('YYYY-MM-DD')"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <!-- <div class="time-start">2019-02-18</div> -->
                        <span class="line"></span>
                        <el-date-picker
                            v-model="value12"
                            type="date"
                            :placeholder="today|moment('YYYY-MM-DD')"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                    <div class="status-hint">
                        状态
                    </div>
                    <div class="type-wrap">
                        <div v-for="(ele, ind) in selectList" :key="ind" :class="{isSelect: isSelectArr[ind]}" @click="selectChange($event, ind)">
                            {{selectList[ind]}}
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <div class="reset">重置</div>
                        <div class="submit">确认</div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Scroll from '@/components/scroll.vue'
import axios from 'axios'
import Vue from 'vue'
import {postInsuranceClassify} from '../api/api.js'
export default {
    data () {
        return {
            value11: '',
            value12: '',
            isShow: false,
            selectList: [
                '全部',
                '已交保',
                '已退保'
            ],
            isSelectArr: [
                false,
                true,
                false
            ],
            insuranceList: [],
            oneInsurance: [
                {
                    "policy_holderd_name":"刘忠良",//投保人姓名
                    "state":"3",//保单状态 1为待投保,2为成功,3为退保,4为失败
                    "title":"退费测试赛1",  //赛事名
                    "start_date":"2019-02-16 00:00:00.000",  //保险开始时间
                    "end_date":"2019-02-17 00:00:00.000",  //保险结束时间
                    "amount_payable":"1000",  //应付金额，实际金额为 amount_payable/100
                },
                {
                    "policy_holderd_name":"刘忠良",//投保人姓名
                    "state":"3",//保单状态 1为待投保,2为成功,3为退保,4为失败
                    "title":"退费测试赛1",  //赛事名
                    "start_date":"2019-02-16 00:00:00.000",  //保险开始时间
                    "end_date":"2019-02-17 00:00:00.000",  //保险结束时间
                    "amount_payable":"1000",  //应付金额，实际金额为 amount_payable/100
                },
                {
                    "policy_holderd_name":"刘忠良",//投保人姓名
                    "state":"3",//保单状态 1为待投保,2为成功,3为退保,4为失败
                    "title":"退费测试赛1",  //赛事名
                    "start_date":"2019-02-16 00:00:00.000",  //保险开始时间
                    "end_date":"2019-02-17 00:00:00.000",  //保险结束时间
                    "amount_payable":"1000",  //应付金额，实际金额为 amount_payable/100
                },
                {
                    "policy_holderd_name":"刘忠良",//投保人姓名
                    "state":"3",//保单状态 1为待投保,2为成功,3为退保,4为失败
                    "title":"退费测试赛1",  //赛事名
                    "start_date":"2019-02-16 00:00:00.000",  //保险开始时间
                    "end_date":"2019-02-17 00:00:00.000",  //保险结束时间
                    "amount_payable":"1000",  //应付金额，实际金额为 amount_payable/100
                }
            ]
        }
    },
    components: {
        Scroll
    },
    methods: {
        initData () {
            this.insuranceList.push(...this.oneInsurance);
        },
        refresh () {
            this.insuranceList = [];
            this.initData();
        },
        loadmore (fun) {
            this.insuranceList.push(...this.oneInsurance);
            fun();
        },
        toSearch (event) {
            console.log(event)
            this.$router.push({
                path: '/search'
            });
        },
        selectShow (event) {
            this.isShow = !this.isShow;
        },
        selectChange (event, index) {
            this.isSelectArr = this.isSelectArr.map((ele, ind) => {
                if (index === ind) {
                    return true;
                }else{
                    return false;
                }
            })
        }
    },
    created () {
        this.today = Date.now();
        console.log(this,this.$moment);
        console.log(this.moment);
        this.initData();
    },
    mounted() {
        Vue.nextTick(() => {
            // postInsuranceClassify().then((res) => {
            //     console.log(res)
            // })
        })
    }
}
</script>
<style lang="less">
.insurance{
    width: 750px;
    height: 100%;
    position: relative;
    display: inline-block;
    .head{
        width: 702px;
        margin-left: auto;
        margin-right: auto;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 30px;
        .turn-back{
            width: 40px;
            height: 40px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            font-size: 30px;/*px*/
            color: #333;
        }
        .select{
            height: 100%;
            img{
                width: 40px;
                height: 40px;
                vertical-align: top;
            }
            span{
                font-size: 30px;/*px*/
                color: #676767;
            }
        }
    }
    .search{
        width: 100%;
        height: 40px;
        margin-top: 10px;
        margin-bottom: 40px;
        box-sizing: border-box;
        position: relative;
        .input{
            width: 702px;
            height: 40px;
            margin: 0 auto;
            line-height: 40px;
            background-color: #f6f6f6;
            img{
                width: 40px;
                height: 40px;
                vertical-align: top;
                margin-left: 40px;
            }
            span{
                font-size: 28px; /*px*/
                color: #999;
                margin-left: 20px;
            }
        }
    }
    .container{
        width: 100%;
        .people-wrap{
            width: 702px;
            margin: 0 auto 40px;
            position: relative;
            .name-box{
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 26px;
                .name{
                    font-size: 30px; /*px*/
                    font-weight: bold;
                    color: #333;
                }
                .is-insurance{
                    font-size: 24px; /*px*/
                    color: #999;
                }
            }
            .competite-info{
                width: 100%;
                box-sizing: border-box;
                padding-left: 40px;
                font-size: 30px; /*px*/
                color: #666;
                margin-bottom: 30px;
                &>div{
                    margin-bottom: 10px;
                }
            }
            .insurance-sum{
                span:nth-of-type(1){
                    font-size: 26px;/*px*/
                    color: #999;
                }
                span:nth-of-type(2) {
                    font-size: 28px;/*px*/
                    color: #333;
                    font-weight: bold;
                }
            }
            .surrender{
                position: absolute;
                bottom: 4px;
                right: 4px;
                width: 140px;
                height: 50px;
                background-color: #3399ff;
                border-radius: 25px;
                font-size: 32px;/*px*/
                color: #fff;
                text-align: center;
                line-height: 50px;
                font-weight: bold;
            }
        }
    }
    .slide-enter-active{
        transition:all 0.5s ease;
    }
     .slide-leave-active{
        transition:all 0.5s ease;
    }
    .slide-leave-to{
        transform: translateX(100%);
    }
    .slide-enter{
        transform: translateX(100%);
    }

    .select-content{
        width: 750px;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        display: flex;
        .mask{
            width: 100px;
            background-color: rgba(0,0,0,.6);
        }
        .select-box{
            flex: 1;
            background-color: #fff;
            padding-top: 50px;
            position: relative;
            .select-hint{
                color: #333;
                font-size: 30px; /*px*/
                font-weight: bold;
                text-indent: 40px;
            }
            .time-wrap{
                margin-top: 30px;
                margin-bottom: 40px;
                display: flex;
                justify-content: space-around;
                .line{
                    width: 20px;
                    display: block;
                    position: relative;
                    // font-size: 40px;/*px*/
                }
                .line::after{
                    content: '';
                    width: 100%;
                    height: 2px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    background-color: #666;
                }
                .el-date-editor{
                    background-color: #f4f4f4;
                    .el-input__inner{
                        text-align: center;
                        font-size: 26px;/*px*/
                        color: #666;
                    }
                }
                // div{
                //     width: 40%;
                //     height: 60px;
                //     border-radius: 30px;
                //     line-height: 60px;
                //     color: #666;
                //     font-size: 26px;/*px*/
                //     background-color: #f4f4f4;
                //     text-align: center;
                // }
            }
            .status-hint{
                font-size: 30px; /*px*/
                color: #333;
                font-weight: bold;
                text-indent: 40px;
            }
            .type-wrap{
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
                div{
                    width: 160px;
                    height: 60px;
                    font-size: 30px;/*px*/
                    color: #666;
                    background-color: #f4f4f4;
                    border-radius: 30px;
                    text-align: center;
                    line-height: 60px;
                    letter-spacing: 4px;
                }
                .isSelect{
                    background-color: #3399ff;
                    color: #fff;
                }
            }
        }
        .btn-wrap{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            display: flex;
            div{
                width: 50%;
                height: 100px;
                line-height: 100px;
                text-align: center;
                font-size: 30px; /*px*/
            }
            .reset{
                border-top: 2px solid #e5e5e5;
                color: #666;

            }
            .submit{
                background-color: #3399ff;
                color: #fff;
            }

        }
    }
}
</style>
