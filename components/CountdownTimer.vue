<template>
<!-- 倒數計時器 -->
    <v-card color="Timer_wrapper purple lighten-2 mb-4 headline rounded-t-xl">
        <v-row>
            <!-- 日 -->
            <v-col class="days text-center">   
                <div>{{ showDays }}</div>
                <span>天</span>
            </v-col>
            <span class="pt-5 display-1">:</span>
            <!-- 時 -->
            <v-col class="hours text-center">
                <div>{{ showHours }}</div>
                <span>時</span>
            </v-col>
            <span class="pt-5 display-1">:</span>
            <!-- 分 -->
            <v-col class="hours text-center">
                <div>{{ showMinutes }}</div>
                <span>分</span>
            </v-col>
            <span class="pt-5 display-1">:</span>
            <!-- 秒 -->
            <v-col class="seconds text-center">
                <div>{{ showSeconds }}</div>
                <span>秒</span>
            </v-col>
        </v-row>
    </v-card>
</template>`

<script>
export default {
    props : ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond' ], // passed from pages/index.vue
    data () {
        return {
            showDays: 0,
            showHours: 0,
            showMinutes: 0,
            showSeconds: 0
        }
    },
    computed : {
        seconds () { // 1 秒為 1000 毫秒
            return 1000
        },
        minutes () {
            return this.seconds * 60 // 一分鐘 60 秒
        },
        hours () {
            return this.minutes * 60
        },
        days () {
            return this.hours * 24
        },
        // 計時結束的時間
        end () {
            // 月份是從 0 開始計算
            return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond)
        }
    },
    methods: {
        format (number) {
            // 判定數字是否小於 10，若小於 10，則數字顯示 ' 09、08、07、06....、00'
            return number < 10 ? '0' + number : number
        },
        showLeftTime () {
            const timer = setInterval(() => {
                const now = new Date() // 取得當前時間
                // 剩下的時間 = 結束時間 - 起始時間
                const distance = this.end.getTime() - now.getTime() // 使用 get 方法獲取特定時間
                // 若倒數結束 ，則清除事件
                if(distance < 0) {
                    clearInterval(timer)
                }
                // 分別取得 日、時、分、秒 等資訊
                const days = Math.floor(distance / this.days)
                const hours = Math.floor((distance % this.days) / this.hours)
                const minutes = Math.floor((distance % this.hours) / this.minutes)
                const seconds = Math.floor((distance % this.minutes) / this.seconds)
                // 使用 format() 方法，解析所得到的數值
                this.showDays = this.format(days)
                this.showHours = this.format(hours)
                this.showMinutes = this.format(minutes)
                this.showSeconds = this.format(seconds)
            })
        }
    },
    // 等頁面都掛載後才執行
    mounted () {
        this.showLeftTime()
    }
}
</script>

<style lang="scss" scoped>
    .Timer_wrapper {
        color: #ffffff
    }
    
</style>>

