<template>
  <div id="game-play" class="game-play">
    <div class="w-100 d-flex">
        <div class="d-flex w-50 ps-5 pt-5">
            <div class="w-25">
                <img v-if="user.role === 'seer' && user.state === 'Alive'" style="width:170px;" src="../../../public/images/roles/seer.png" alt="seer">
                <img v-if="user.role === 'seer' && user.state === 'Eliminated'" src="../../../public/images/roles/seer_killed.png" alt="seerKilled">
                <img v-if="user.role === 'werewolf' && user.state === 'Alive'" style="width:170px;" src="../../../public/images/roles/wolf.png" alt="wolf">
                <img v-if="user.role === 'werewolf' && user.state === 'Eliminated'" style="width:170px;" src="../../../public/images/roles/wolf_killed.png" alt="wolfKilled">
                <img v-if="user.role === 'guard' && user.state === 'Alive'" style="width:170px;" src="../../../public/images/roles/guard.png" alt="guard">
                <img v-if="user.role === 'guard' && user.state === 'Eliminated'" style="width:170px;" src="../../../public/images/roles/guard_killled.png" alt="guardKilled">
                <img v-if="user.role === 'villager' && user.state === 'Alive'" style="width:170px;" src="../../../public/images/roles/villager.png" alt="villager">
                <img v-if="user.role === 'villager' && user.state === 'Eliminated'" style="width:170px;" src="../../../public/images/roles/villager_killed.png" alt="villagerKilled">
            </div>
            <div class="text-start text-white ms-4 w-50">
                <p class="display-5">{{ user.username }} <span v-bind:class="user.state === 'Alive' ? 'text-success' : 'text-danger'">({{ user.state }})</span></p>
                <p class="fs-2 ">Role: <span v-bind:class="user.role === 'werewolf' ? 'text-danger': 'text-success'">{{ user.role }}</span></p>
                <p class="fs-2">Day: <span>{{ day }}</span></p>
                <p class="fs-2">Time Remaining: {{ prettyTime }}</p>
            </div>
        </div>
        <div class="w-50 text-end pe-5 pt-4 text-white">
            <span class="display-4">{{period}}</span>
        </div>
    </div>
    <div class="w-100 ps-5 pt-5 row">
        <div class="col-5">
            <div class="chat-wrapper w-75 rounded-4 px-3 py-3">
                <div class="d-flex">
                    <button class="mt-2 px-3 py-1 rounded-3 text-white bg-secondary">All v</button>
                </div>
                <div class="text-start my-3 px-1 text-white overflow-auto" style="height:180px; width:420px;">
                  <div class="chat-messages"></div>
                </div>
                <form class="rounded-2" style="height:35px;" v-on:submit="sendMessage">
                    <input class="w-75 h-100 rounded-2 bg-secondary text-white px-2" type="text" v-model="msg">
                    <button class="bg-secondary ms-3 px-4 rounded-2 h-100 text-white" type="submit">Send</button>
                </form>
            </div>
        </div>
        <div class="col container d-block justify-content-center align-items-center text-white text-center pt-5">
            <p class="display-1">{{ description }}</p>
            <p class="fs-3"> {{ secDescription }}</p>
        </div>
        <div class="col">

        </div>
    </div>
    <div class="d-flex px-5 pt-5">
        <div class="d-flex overflow-auto">
            <div v-for="player in players" :key="player.username">
              <div v-if="player.username !== user.username" class="text-white mx-5 mb-4">
                <p>{{ player.username }} <span v-bind:class="player.state === 'Eliminated' ? 'text-danger': 'text-success'">({{ player.state }})</span></p>
                <!-- <b-button v-b-modal.modal-center class="bg-transparent border-0" 
                  :disabled="player.killed || currentPhase === 'meeting' || 
                  !(user.role === 'werewolf' && currentPhase === 'wolf') &&
                  !(user.role === 'seer' && currentPhase === 'seer') &&
                  !(user.role === 'guard' && currentPhase === 'guard')">
                  <img v-if="player.state === 'Alive' && !player.checked" src="../../../public/images/roles/Unknown_card.png" class="unknown-player rounded-2" style="width:100px;" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role !== 'werewolf'" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-checked rounded-2" style="width:100px;" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role === 'werewolf'" src="../../../public/images/roles/wolf.png" style="width:100px;" alt="">
                </b-button>
                <b-modal ref="confirm-action" id="modal-center" size="md" class="confirm-action-modal" 
                  hide-header 
                  hide-footer
                  centered
                  v-model="show"
                  :body-bg-variant="bodyBgVariant"
                  :body-text-variant="bodyTextVariant">
                  <div class="px-5">
                    <div class="d-flex m-title-wrapper">
                      <p v-if="currentPhase === 'voting'" class="my-4 mx-auto fs-4 fw-bold">Are you sure to vote <span style="color: #FFE55C;">{{player.username}}</span> ?</p>
                      <p v-if="currentPhase === 'wolf'" class="my-4 mx-auto fs-4 fw-bold">Are you sure to eliminate <span style="color: #FFE55C;">{{player.username}}</span> ?</p>
                      <p v-if="currentPhase === 'seer'" class="my-4 mx-auto fs-4 fw-bold">Are you sure to check <span style="color: #FFE55C;">{{player.username}}</span> ?</p>
                      <p v-if="currentPhase === 'guard'" class="my-4 mx-auto fs-4 fw-bold">Are you sure to protect <span style="color: #FFE55C;">{{player.username}}</span> ?</p>
                    </div>
                  </div>
                  <div class="d-flex px-5 my-4">
                    <button v-if="currentPhase === 'voting'" class="mx-auto border-0 rounded-3 px-4 py-2" @click="votePlayer(player.id)">Yes</button>
                    <button v-if="currentPhase === 'wolf'" class="mx-auto border-0 rounded-3 px-4 py-2" @click="killPlayer(player.id)">Yes</button>
                    <button v-if="currentPhase === 'seer'" class="mx-auto border-0 rounded-3 px-4 py-2" @click="checkPlayer(player.id)">Yes</button>
                    <button v-if="currentPhase === 'guard'" class="mx-auto border-0 rounded-3 px-4 py-2" @click="savePlayer(player.id)">Yes</button>
                    <button class="mx-auto border-0 rounded-3 px-4 py-2" @click="hideModal">No</button>
                  </div>
                </b-modal> -->
                <b-button @click="showMsgBoxTwo(player)" class="bg-transparent border-0"
                :disabled="player.killed || currentPhase === 'meeting' || user.state === 'Eliminated' || !user.isActive ||
                  !(user.role === 'villager' && currentPhase === 'voting') &&
                  !(user.role === 'werewolf' && currentPhase === 'voting') &&
                  !(user.role === 'seer' && currentPhase === 'voting') &&
                  !(user.role === 'guard' && currentPhase === 'voting') &&
                  !(user.role === 'werewolf' && currentPhase === 'wolf') &&
                  !(user.role === 'seer' && currentPhase === 'seer' && !player.checked) &&
                  !(user.role === 'guard' && currentPhase === 'guard')">
                  <img v-if="(user.role !== 'seer' && user.role !== 'guard' && player.state === 'Alive') || 
                    (user.role === 'seer' && player.state === 'Alive' && !player.checked) ||
                    (user.role === 'guard' && player.state === 'Alive' && !player.saved)" src="../../../public/images/roles/Unknown_card.png" class="unknown-player rounded-2" style="width:100px;" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role !== 'werewolf'" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-checked rounded-2" style="width:100px;" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role === 'werewolf'" src="../../../public/images/roles/wolf.png" style="width:100px;" alt="">
                  <img v-if="user.role === 'guard' && player.saved" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-saved rounded-2" style="width:100px;" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'villager'" src="../../../public/images/roles/villager_killed.png" style="width:100px;" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'wolf'" src="../../../public/images/roles/wolf_killed.png" style="width:100px;" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'seer'" src="../../../public/images/roles/seer_killed.png" style="width:100px;" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'guard'" src="../../../public/images/roles/guard_killled.png" style="width:100px;" alt="">
                </b-button>
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
      user:{},
      msg: '',
      players: [],
      day: 1,
      period: 'Day',
      currentPhase: '',
      description: '',
      secDescription: '',
      
      //Modal
      show: false,
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',

      boxTwo: '',

      //Timer
      minutes: 0,
      seconds: 0,
      time: 0,
      timer: null,
    }
  },
  async created() {
    // this.startTimer('meeting');
    await this.socket.emit("startGame", this.roomId);
    await this.socket.on('gamePrepared', (room) => {
      this.room = room;
      this.players = room.users;
    });

    await this.socket.emit('getCurrentUser'); 
    await this.socket.on('currentUser', (user) => {
      this.user = user;
    });
    await this.socket.on('updateUser', () => {
      this.players.forEach((player) => {
        if (player.id === this.user.id) {
          this.user = player;
        }
      })
      console.log("Updated user: " + this.user)
    });
    
    await this.socket.emit("startTimer", this.roomId);
    await this.socket.on('timer', (time) => {
      this.time = time;
    })
    await this.socket.on('currentPhase', (stat) => {
      this.day = stat.day;
      this.currentPhase = stat.phase;
      this.description = stat.description;
      this.secDescription = stat.secDescription;
      this.period = stat.period;
    })

    await this.socket.on('message', (message) => {
      const chatMessages = document.querySelector(".chat-messages");
      const div = document.createElement("div");
      div.classList.add("message");
      if (message.username == this.user.username) {
        div.innerHTML = `<p class="meta" style="color: #00ff00;">${message.username}: <span>${message.text}</span></p>`;
      }
      else {
        div.innerHTML = `<p class="meta">${message.username}: <span>${message.text}</span></p>`;
      }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      this.msg = '';
    })

    await this.socket.on('roomUsers', (roomUsers) => {
      this.players = roomUsers;
    });

    await this.socket.on('gameOver', (room) => {
      this.$router.push({ name: 'Lobby', params: { roomId: room.code, socket: this.$route.params.socket } });
    })
  },
  computed: {
    prettyTime () {
			 let time = this.time / 60
			 let minutes = parseInt(time)
			 let secondes = Math.round((time - minutes) * 60)
       if( minutes < 10 ) minutes = "0"+ minutes
       if( secondes < 10 ) secondes = "0"+ secondes
			 return minutes+" : "+secondes
		}
  },
  mounted() {

  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if(this.msg === '') return;
      this.socket.emit('chatMessage', {
        msg: this.msg, 
        roomId: this.roomId
      });
    },
    async killPlayer(target) {
      await this.socket.emit('playerAction', {
        targetId: target,
        roomId: this.roomId,
        action: 'killed'
      });
      this.show = false;
    },
    async checkPlayer(target) {
      await this.socket.emit('playerAction', {
        targetId: target,
        roomId: this.roomId,
        action: 'checked'
      });
      this.show = false;
    },
    async savePlayer(target) {
      await this.socket.emit('playerAction', {
        targetId: target,
        roomId: this.roomId,
        action: 'saved'
      });
      this.show = false;
    },
    async votePlayer(target) {
      await this.socket.emit('playerAction', {
        targetId: target,
        roomId: this.roomId,
        action: 'voted'
      });
      this.show = false;
    },
    hideModal() {
      this.show = false
    },
    showMsgBoxTwo(player) {
        this.boxTwo = ''
        let title = ''
        if(this.currentPhase === 'voting'){
          title = 'Do you want to vote for '
        }
        else if(this.currentPhase === 'seer'){
          title = 'Do you want to check '
        }
        else if(this.currentPhase === 'guard'){
          title = 'Do you want to save '
        }
        else if(this.currentPhase === 'wolf'){
          title = 'Do you want to eliminate '
        }
        this.$bvModal.msgBoxConfirm(`${title + ' ' + player.username + ' ?'}`, {
          
          size: 'md',
          centered: true,
          'hide-header': true,
          "hide-footer": true,
          'body-bg-variant': 'dark',
          'body-text-variant': 'white',
          /* buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false, */
          
        })
          .then(value => {
            if(value) {
              if(this.currentPhase === 'voting'){
                this.votePlayer(player.id)
              }
              else if(this.currentPhase === 'seer'){
                this.checkPlayer(player.id)
              }
              else if(this.currentPhase === 'guard'){
                this.savePlayer(player.id)
              }
              else if(this.currentPhase === 'wolf'){
                this.killPlayer(player.id)
              }
            }
          })
          .catch(err => {
            // An error occurred
          })
      }
  }
}
</script>

<style scoped>
.game-play{
    background: linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../public/images/game-play1.png');
    background-color: black;
    height: 100%;
    background-size: cover;
    /* Opacity: 70% */
}
.chat-wrapper{
    background-color: black;
    /* Opacity: 70% */
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
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
.unknown-player{
  border: 2px solid white;
}
.unknown-player:hover{
  border: 2px solid #FFE55C;
}
.unknown-player-checked{
  border: 2px solid #00C844;
}
.unknown-player-saved{
  border: 2px solid #577c9d;
}
.confirm-action-modal{
  background: rgba(23, 23, 23, 0.8);
}
.m-title-wrapper{
  border-bottom: 2px solid white;
}
</style>