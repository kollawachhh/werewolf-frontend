<template>
  <div id="lobby" class="w-100 h-100 px-5 background">
    <div class="text-white text-left pt-5 mb-4" style="text-align: left;">
        <span class="display-2 fw-bold">WEREWOLF</span>
        <br>
        <span class="fs-3 fw-bold">Web game project</span>
    </div>
    <div class="h-75 lobby-wrapper rounded-4 text-white px-5 pt-4">
        <div class="d-flex" style="border-bottom: 2px solid white;">
            <p class="me-auto text-start fs-1 fw-bold">Lobby #{{ roomId }}</p>
            <p class="ms-auto text-end fs-1 fw-bold">{{ players.length }} / {{ this.room.maxPlayer }} Players</p>
        </div>
        <div class="h-75 player-list-wrapper rounded-4 mt-4 px-3 py-4 ">
            <div class="h-100 mx-auto overflow-auto">
                <div v-for="player in players" :key="player.username" class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">{{ player.username }}</span>
                    <span class="ms-auto me-4 h3">{{ player.state }}</span>
                </div>
            </div>
        </div>
        <div class="d-flex mt-3">
            <button v-if="user.state === 'Host'" v-on:click="start" class="ms-auto me-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;" :disabled="players.filter((player) => player.state === 'Ready').length != (room.maxPlayer-1)">Start</button>
            <button v-else-if="user.state === 'Waiting'" v-on:click="playerStatus" class="ms-auto me-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;">Ready</button>
            <button v-else-if="user.state === 'Ready'" v-on:click="playerStatus" class="ms-auto me-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;">Wait</button>
            <button class="me-auto ms-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;" v-on:click="back" >Back</button>
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
        room: null,
        state: null
      },
      players: [],
      room: {
        code: null,
        maxPlayer: null,
        state: null
      },
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
    }
  },
  async created() {
    this.socket = this.$props.socket;
    console.log("socket: ", this.socket)
    await this.socket.emit('getCurrentUser');
    await this.socket.on('currentUser', (user) => {
      console.log("Current user: ",user)
      this.user = user;
      console.log(this.socket);
    });

    await this.socket.emit('getRoom', this.$props.roomId);
    await this.socket.on('thisRoom', (room) => {
      console.log("This room: ",room);
      this.room = room;
      console.log(this.room);
    });

    await this.socket.emit('getRoomUsers', this.$props.roomId);
    await this.socket.on('roomUsers', (roomUsers) => {
      console.log("This room members: ", roomUsers);
      this.players = roomUsers;
    });
    await this.socket.on('updateRoomState', (room) => {
      this.$router.push({ name: 'Game-play', params: { roomId: this.room.code, socket: this.socket, room: room } });
    });
  },
  mounted() {
    
  },
  methods: {
    async start(){
      await this.socket.emit('changeRoomState', this.room.code);
      /* await this.socket.on('updateRoomState', (room) => {
        this.$router.push({ name: 'Game-play', params: { roomId: this.room.code, socket: this.socket, room: room } });
      }); */
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
        console.log("This room members: ",roomUsers);
        this.players = roomUsers;
        console.log(this.players);
      });
      this.$router.push({ name: 'Home', params: { socket: this.$props.socket } });
    }
  }
}
</script>

<style scoped>
.background{
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
</style>