<template>
    <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
    let background;
    export default {
        name: 'LottoBall',
        props: {
            // props 내 자료형을 기재해야함
            number: Number
        },
        computed: {
            // 기존 값을 가지고 새로운 값을 도출할 경우 computed 내 작성할 것
            // computed 하나의 값을 리턴하고, watch는 특정 동작을 수행함
            styleObject() {
                if (this.number <= 10){
                    background = 'red'
                } else if (this.number <= 20) {
                    background = 'orange'
                } else if (this.number <= 30) {
                    background = 'yellow'
                } else if (this.number <= 40) {
                    background = 'green'
                } else {
                    background = 'blue'
                }
                return {
                    background
                }
            }
        }
    }
</script>

<style scoped>
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        text-align: center;
        margin-right: 20px;
    }
</style>