<template>
    <div class="search">
        <div class="container">
            <div class="input-wrap">
                <img src="../assets/icon/search-icon.png" alt="">
                <input type="text" placeholder="请输入姓名/小组/赛事">
            </div>
            <div class="cancel" @click="toInsurance($event)">取消</div>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        toInsurance(event) {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="less">
.search{
    width: 750px;
    .container{
        width: 702px;
        height: 50px;
        margin: 20px auto;
        display: flex;
        justify-content: space-between;
        .input-wrap{
            width: 500px;
            background-color: #f6f6f6;
            img{
                width: 50px;
                height: 50px;
                margin-left: 20px;
                vertical-align: middle;
            }
            input{
                border: none;
                height: 50px;
                line-height: 50px;
                font-size: 24px; /*px*/

            }
            input::placeholder{
                color: #999;
                font-size: 24px; /*px*/
            }
        }
        .cancel{
            color: #3399ff;
            font-size: 26px;/*px*/
        }
    }
}
</style>
