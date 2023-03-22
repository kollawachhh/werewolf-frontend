<template>
  <div class="container-fluid px-0 h-100" style="background-color: #262323;">
    <div class="row w-100 m-0 h-100">
      <div class="d-flex col-12 p-0 w-100" style="background-color: #262323;">
        <div class="col-3" v-bind:class="room.stat.description === 'Werewolf Win' ? 'werewolf-win' : 'villager-win'"></div>
        <div class="container-fluid col-9 p-0">
            <div class="row w-100 m-0">
                <div class="w-100 p-0 px-5">
                    <p v-if="room.stat.description === 'Werewolf Win'" class="display-1 fw-bold lh-lg border-bottom border-white text-danger">Werewolf win</p>
                    <p v-else class="display-1 fw-bold lh-lg border-bottom border-white" style="color: chartreuse;">Villager win</p>
                </div>
            </div>
            <div class="row p-0 mx-0 mt-5 w-100">
                <div class="col-6 border-end border-white p-0 px-5">
                    <div>
                        <p class="display-4 fw-bold lh-lg " style="color: yellow;">Villager</p>
                    </div>
                    <div class="text-start text-white my-5">
                        <p class="fs-1 fw-bold">Werewolf checked (Seer)</p>
                        <p class="fs-4"><span style="color: chartreuse;">{{seer}}</span> : {{checked_num}} time</p>
                    </div>
                    <div class="text-start text-white mb-5">
                        <p class="fs-1 fw-bold">Protected (Guard)</p>
                        <p class="fs-4"><span style="color: chartreuse;">{{guard}}</span> : {{protected_num}} time</p>
                    </div>
                    <div class="text-start text-white mb-5 werewolfVoted">
                        <p class="fs-1 fw-bold">The most werewolf voted</p>
                        <div v-for="player in voted_werewolf" :key="player">
                            <p class="fs-4"><span style="color: chartreuse;">{{player}}</span> : {{voted_werewolf_num}} time</p>
                        </div>
                    </div>
                </div>
                <div class="col-6 p-0 px-5">
                    <div>
                        <p class="display-4 fw-bold lh-lg" style="color: yellow;">Werewolf</p>
                    </div>
                    <div class="text-start text-white mt-5">
                        <p class="fs-1 fw-bold" v-bind:class="eliminatedSeer ? 'text-chartreuse' : 'text-danger'" style="color: chartreuse;">Eliminated the Seer
                            <svg :hidden="!eliminatedSeer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check text-chartreuse" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>
                            <svg :hidden="eliminatedSeer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </p>
                        <p class="fs-1 fw-bold" v-bind:class="eliminateGuard ? 'text-chartreuse' : 'text-danger'">Eliminated the Guard
                            <svg :hidden="!eliminateGuard" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check text-chartreuse" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>
                            <svg :hidden="eliminateGuard" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x text-danger" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </p>
                    </div>
                    <div class="text-start text-white mb-5">
                        <p class="fs-1 fw-bold">Remain werewolf : {{remainWerewolf_num}}</p>
                        <div v-for="player in remainWerewolf" :key="player">
                            <p class="fs-4 text-danger">{{player}}</p>
                        </div>
                    </div>
                    <div class="text-start text-white mb-5">
                        <p class="fs-1 fw-bold">Eliminated werewolf : {{eliminatedWerewolf_num}}</p>
                        <div v-for="player in eliminatedWerewolf" :key="player">
                            <p class="fs-4 text-danger">{{player}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4 w-100 mx-0">
                <div class="col-12 text-white p-0">
                    <p>{{ prettyTime }}</p>
                    <p class="m-0">Move to lobby</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        socket: {
            require: true
        },
        roomId: {
            require: true
        },
        room: {
            require: true
        }
    },
    data() {
        return {
            players: [],
            
            //Timer
            minutes: 0,
            seconds: 0,
            time: 0,

            //game result
            seer: {},
            checked_num: 0,
            guard: {},
            protected_num: 0,
            voted_werewolf: [],
            voted_werewolf_num: 0,
            eliminatedSeer: false,
            eliminateGuard: false,
            eliminatedWerewolf: [],
            eliminatedWerewolf_num: 0,
            remainWerewolf: [],
            remainWerewolf_num: 0,

            //Audio
            timeCount: new Audio('http://soundbible.com/mp3/Tick-DeepFrozenApps-397275646.mp3'),
        }
    },
    async created() {
        if(this.$route.params.socket == null) {
            this.$router.push({ name: 'Login' })
        }
        this.players = this.room.users;
        await this.socket.emit('gameResult', this.roomId);
        await this.socket.on('result', (result) => {
            this.seer = result.seer;
            this.checked_num = result.checked_num;
            this.guard = result.guard;
            this.protected_num = result.protected_num;
            this.voted_werewolf = result.voted_werewolf;
            this.voted_werewolf_num = result.voted_werewolf_num;
            this.eliminatedSeer = result.eliminatedSeer;
            this.eliminateGuard = result.eliminateGuard;
            this.eliminatedWerewolf = result.eliminatedWerewolf;
            this.eliminatedWerewolf_num = result.eliminatedWerewolf_num;
            this.remainWerewolf = result.remainWerewolf;
            this.remainWerewolf_num = result.remainWerewolf_num;
        })
        await this.socket.on('count', (time) => {
            this.time = time;
            if(this.time <= 3) {
                this.timeCount.volume = 0.5;
                this.timeCount.play();
            }
        })
        await this.socket.on('moveToLobby', (room) => {
            this.$router.push({ name: 'Lobby', params: { roomId: room.code, socket: this.$route.params.socket } });
        })
    },
    computed: {
        prettyTime () {
            let time = this.time / 60
            let minutes = parseInt(time)
            let secondes = Math.round((time - minutes) * 60)
            if( minutes < 10 ) minutes = "0"+ minutes;
            if( secondes < 10 ) secondes = "0"+ secondes;
            return minutes+" : "+secondes
        },
    },
}
</script>

<style scoped>
.werewolf-win{
  background: url('../../../public/images/result-werewolf.png');
  background-color: black;
  border-start-end-radius: 30%;
  border-end-end-radius: 30%;
  height: 100%;
  background-size: cover;
}
.villager-win{
  background: url('../../../public/images/result-villager.png');
  background-color: black;
  border-start-end-radius: 30%;
  border-end-end-radius: 30%;
  height: 100%;
  background-size: cover;
}
.text-chartreuse{
    color: chartreuse;
}
</style>