<template>
  <div id="lobby" class="container-fluid h-100 px-5">
    <div class="row h-25 text-white text-left" style="text-align: left;">
        <p class="display-2 fw-bold mb-0 mt-5">WEREWOLF</p>
        <p class="fs-3 fw-bold">Web game project</p>
    </div>
    <div class="row lobby-wrapper rounded-4 text-white px-5 pt-4" style="height: 70%;">
        <div class="d-flex" style="border-bottom: 2px solid white;">
            <p class="me-auto text-start fs-1 fw-bold">Lobby #{{ roomId }}</p>
            <p class="ms-auto text-end fs-1 fw-bold">{{ players.length }} / {{ this.room.setting.maxPlayer }} Players</p>
        </div>
        <div class="h-75 player-list-wrapper rounded-4 mt-4 px-3 py-4 ">
            <div class="h-100 mx-auto overflow-auto">
                <div v-for="player in players" :key="player.username" class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-dot ms-2 me-4" viewBox="0 0 16 16">
                        <path v-if="player.username == user.username" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" style="color: #00ff00"/>
                        <path v-else d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span v-if="player.username == user.username" style="color: #00ff00" class="h3">{{ player.username }} (Me)</span>
                    <span v-else class="h3">{{ player.username }}</span>
                    <span v-if="player.username == user.username" style="color: #00ff00" class="ms-auto me-4 h3">{{ player.state }}</span>
                    <span v-else class="ms-auto me-4 h3">{{ player.state }}</span>
                    <!-- <button v-on:click="kickPlayer(player)" class="bg-transparent border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button> -->
                    <button v-if="player.state == 'Host' && user.state == 'Host'" disabled class="bg-transparent border-0 ms-1 me-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-h-circle-fill" style="color:burlywood;" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-5-3.998H9.67v3.322H6.33V4.002H5V12h1.33V8.455h3.34V12H11V4.002Z"/>
                      </svg>
                    </button>
                    <b-button v-if="player.state != 'Host' && user.state == 'Host'" @click="kickPlayer(player)" class="bg-transparent border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </b-button>
                </div>
            </div>
        </div>
        <div class="d-flex pb-2">
            <button v-if="user.state === 'Host'" v-on:click="start" class="ms-auto me-5 fw-bold rounded-2 border-0" style="width: 10%; background: #AEAEAE;" :disabled="players.filter((player) => player.state === 'Ready').length < room.setting.maxPlayer-1">Start</button>
            <button v-else-if="user.state === 'Waiting'" v-on:click="playerStatus" class="ms-auto me-5 fw-bold rounded-2 border-0" style="width: 10%; background: #AEAEAE;">Ready</button>
            <button v-else-if="user.state === 'Ready'" v-on:click="playerStatus" class="ms-auto me-5 fw-bold rounded-2 border-0" style="width: 10%; background: #AEAEAE;">Wait</button>
            <button class="me-auto ms-5 fw-bold rounded-2 border-0" style="width: 10%; background: #AEAEAE;" v-on:click="back" >Back</button>
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
    }
  },
  data() {
    return {
      user:{
        id: null,
        username: null,
        role: null,
        room: null,
        state: null
      },
      players: [],
      room: {
        code: null,
        state: null,
        setting: {
          maxPlayer: null,
          meetingTime: 10,
          voteTime: 10,
          seerTime: 10,
          guardTime: 10,
          werewolfTime: 10,
        },
      },
      isUser: "#000000",
      heightStyle: '10%',
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
      img: 1,

      bgTime: null,
    }
  },
  async created() {
    if(this.$route.params.socket == null) {
      this.$router.push({ name: 'Login' })
    }
    this.bgTime = setInterval(this.changeBgLobby, 5000)
    this.socket = this.$props.socket;
    await this.socket.emit('getCurrentUser');
    await this.socket.on('currentUser', (user) => {
      this.user = user;
    });

    await this.socket.emit('getRoom', this.$props.roomId);
    await this.socket.on('thisRoom', (room) => {
      this.room = room;
    });

    await this.socket.emit('getRoomUsers', this.$props.roomId);
    await this.socket.on('roomUsers', (roomUsers) => {
      this.players = roomUsers;
    });
    await this.socket.on('updateRoomState', (room) => {
      clearInterval(this.bgTime);
      this.$router.push({ name: 'Game-play', params: { roomId: this.room.code, socket: this.socket, room: room } });
    });
    await this.socket.on('kicked', () => {
      let current_player = this.players.find((player) => player.id == this.user.id);
      console.log(current_player);
      if(current_player == undefined) {this.$router.push({ name: 'Home', params: { socket: this.socket } })};
    })
  },
  mounted() {
    
  },
  methods: {
    async start(){
      await this.socket.emit('changeRoomState', this.room.code);
    },
    async playerStatus() {
      if (this.user.state === 'Waiting') {
        this.user.state = 'Ready';
      }
      else {
        this.user.state = 'Waiting';
      }
      await this.socket.emit('playerStatus', {
        roomId: this.room.code, 
        status: this.user.state
      });
    },
    async back(e){
      e.preventDefault();
      await this.socket.emit('leaveRoom', this.room.code);
      await this.socket.on('updateRoomUsers', (roomUsers) => {
        this.players = roomUsers;
      });
      clearInterval(this.bgTime);
      this.$router.push({ name: 'Home', params: { socket: this.$props.socket } });
    },
    kickPlayer(player) {
      this.$bvModal.msgBoxConfirm(`${'Do you want to kick for ' + player.username + ' ?'}`, {
        size: 'md',
        centered: true,
        'hide-header': true,
        "hide-footer": true,
        'body-bg-variant': 'dark',
        'body-text-variant': 'white',
      })
        .then(value => {
          if(value) {
            this.socket.emit('kickPlayer', {
              roomId: this.room.code,
              playerId: player.id
            });
          }
        })
        .catch(err => {
          // An error occurred
        })
    },
    changeBgLobby() {
        let bg = ""
        if(this.img == 1){
          bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/lobby2.png')"
          this.img = 2
        }
        else if (this.img == 2){
          bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/lobby3.jpg')"
          this.img = 3
        }
        else {
          this.img = 1
          bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/lobby1.png')"
        }

        const section = document.getElementById('lobby') 
        section.style.background = bg
        section.style.backgroundColor = "black"
        section.style.backgroundSize = "cover"
        section.style.height = "100%"

    }
  }
}
</script>

<style scoped>
#lobby{
  background: linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../public/images/lobby1.png');
  background-color: black;
  height: 100%;
  background-size: cover;
}
.lobby-wrapper{
  background: rgba(66, 66, 66, 0.7);
}
.player-list-wrapper{
  background: rgba(105, 105, 105, 0.7);
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #555; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background:  #f1f1f1; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #888; 
}
.bi-x-circle{
  color: #ffffff;
}
.bi-x-circle:hover{
  color: #ff4848;
}
</style>