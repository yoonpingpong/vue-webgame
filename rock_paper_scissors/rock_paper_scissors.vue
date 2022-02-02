<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('rock')">바위</button>
            <button @click="onClickButton('paper')">보</button>
            <button @click="onClickButton('scissors')">가위</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<script>
    const rspCoords = {
        rock: '0',
        scissors: '-142px',
        paper: '-284px'
    };

    // 가위바위보 점수표
    const scores = {
        rock: 1,
        paper: 0,
        scissors: -1
    };

    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function (v) {
            return v[1] === imgCoord;
        })[0];
    }

    let interval = null;
    export default {
        data() {
            return {
                imgCoord: rspCoords.rock,
                result: '',
                score: 0
            }
        },
        computed: {
            computedStyleObject() {
                return {
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
                };
            }
        },
        methods: {
            changeHand(){
                // 손가락 돌리기
                interval = setInterval(() => {
                    if (this.imgCoord === rspCoords.rock){
                        this.imgCoord = rspCoords.paper;
                    } else if (this.imgCoord === rspCoords.paper) {
                        this.imgCoord = rspCoords.scissors;
                    } else if (this.imgCoord === rspCoords.scissors) {
                        this.imgCoord = rspCoords.rock;
                    }
                }, 100);
            },
            onClickButton(choice){
                clearInterval(interval); // interval 중단
                const myScore = scores[choice]; // 내 선택
                const cpuScore = scores[computerChoice(this.imgCoord)]; // 컴퓨터 선택
                
                // 결과 계산하기
                const diff = myScore - cpuScore;
                if (diff === 0) {
                    this.result = '비겼습니다.'
                } else if ([-1, 2].includes(diff)) {
                    this.result = '이겼습니다.'
                    this.score += 1;
                } else {
                    this.result = '졌습니다.'
                    this.score -= 1;
                }

                setTimeout(() => {
                    this.changeHand(); // 손가락 돌리기
                }, 1000)
            }
        },
        beforeCreate() {
            console.log('beforeCreate');
        },
        created() {
            console.log('created');
        },
        beforeMount() {
            console.log('beforeMount');
        },
        mounted() {
            console.log('mounted');
            this.changeHand(); // 손가락 돌리기
        },
        beforeUpdate() {
            console.log('beforeUpdate');
        },
        updated() {
            console.log('updated');
        },
        beforeDestroy() {
            console.log('beforeDestroy');
            // 컴포넌트 사라질 경우, interval 중단
            clearInterval(interval);
        },
        destroyed() {
            console.log('destoryed');
        },
    }
    
</script>

<style scoped>
   #computer{
       width: 142px;
       height: 200px;
       background-position: 0 0;
   }
</style>