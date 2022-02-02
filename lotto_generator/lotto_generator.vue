<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key=ball :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번 더!</button> 
    </div>
</template>

<script>
    import lotto_ball from './lotto_ball'

    function getWinNumbers() {
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];

        while (candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((p, c) => p -c);

        return [...winNumbers, bonusNumber];
    }

    const timeouts = [];
    export default {
        components: {
            'lotto-ball': lotto_ball
        },
        data() {
            return {
                winNumbers: getWinNumbers(),
                winBalls: [],
                bonus: null,
                redo: false
            }
        },
        computed: {

        },
        methods: {
            onClickRedo() {
                this.winNumbers = getWinNumbers();
                this.winBalls = [];
                this.bonus = null;
                this.redo = false;

                this.showBalls();
            },
            showBalls() {
                // for (let i=0; i < this.winNumbers.length -1; i++){
                //     interval = setTimeout(() => {
                //         this.winBalls.push(this.winBalls[i]);
                //     }, (i + 1) * 1000);
                // }

                // 추첨된 6개 로또볼 보여주기
                for (const [idx, number] of this.winNumbers.entries()){
                    if (idx === this.winNumbers.length - 1) break;

                    timeouts[idx] = setTimeout(() => {
                        this.winBalls.push(number);
                    }, (idx + 1) * 1000);
                }

                // 7초 후 보너스 로또볼 보여주기
                timeouts[this.winNumbers.length - 1] = setTimeout(() => {
                    this.bonus = this.winNumbers[this.winNumbers.length - 1]
                    this.redo = true;
                }, 7000)
            }
        },
        mounted() {
            this.showBalls();
        },
        beforeDestroy() {
            // 메모리 누수 방지를 위해 setTimeout 취소
            timeouts.forEach((interval) => {
                clearTimeout(interval);
            });
        },
        watch: {
            // watch는 가급적 사용 안하는 것이 좋음

            // winBalls(value, oldValue) {
            //     console.log(`value: ${value}`)
            //     console.log(`oldValue: ${oldValue}`)
            //     if (value.length === 0) {
            //         this.showBalls();
            //     }
            // }

            // bonus(value, oldValue){
            //     if (value === null){
            //         this.showBalls();
            //     }
            // }

            // redo(value, oldValue) {
            //     if (value === false){
            //         this.showBalls();
            //     }
            // }
        }
    }    
</script>

<style scoped>
  
</style>