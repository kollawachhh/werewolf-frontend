<template>
  <div id="game-play" class="game-play">
    <div class="w-100 d-flex">
        <div class="d-flex w-50 ps-5 pt-5">
            <div class="w-25">
                <img v-if="user.role === 'seer'" style="width:170px;" src="../../../public/images/roles/seer.png" alt="seer">
            </div>
            <div class="text-start text-white ms-4 w-50">
                <p class="display-5">{{ user.username }} <span class="text-success">({{ user.state }})</span></p>
                <p class="fs-2 ">Role: <span class="text-success">{{ user.role }}</span></p>
                <p class="fs-2">Day: <span>{{ room.stat.day }}</span></p>
                <!-- <p class="fs-2">Time Remaining: <span>10.00</span></p> -->
                <p class="fs-2">Time Remaining: <timer :time="prettyTime">{{ prettyTime }}</timer></p>
            </div>
        </div>
        <div class="w-50 text-end pe-5 pt-4 text-white">
            <span class="display-4">{{room.stat.period}}</span>
        </div>
    </div>
    <div class="w-100 ps-5 pt-5 row">
        <div class="col ">
            <div class="chat-wrapper w-75 rounded-4 px-3 py-3">
                <div class="d-flex">
                    <button class="mt-2 px-3 py-1 rounded-3 text-white bg-secondary">All v</button>
                </div>
                <div class="text-start my-3 px-1 text-white overflow-auto" style="height:180px;">
                  <div class="chat-messages"></div>
                </div>
                <form class="rounded-2" style="height:35px;" v-on:submit="sendMessage">
                    <input class="w-75 h-100 rounded-2 bg-secondary text-white px-2" type="text" v-model="msg">
                    <button class="bg-secondary ms-3 px-4 rounded-2 h-100 text-white" type="submit">Send</button>
                </form>
            </div>
        </div>
        <div class="col container d-block justify-content-center align-items-center text-white text-center pt-5">
            <span class="display-1">START</span>
            <span></span>
        </div>
        <div class="col">

        </div>
    </div>
    <div class="d-flex px-5 pt-5">
        <div class="d-flex overflow-auto">
            <div v-for="player in players" :key="player.username">
              <div v-if="player.username !== user.username" class="text-white mx-5 mb-4">
                <p>{{ player.username }} <span class="text-success">({{ player.state }})</span></p>
                <img v-if="player.state === 'Alive'" class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
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
      user:{
        id: null,
        username: null,
        role: null,
        room: null,
        state: null
      },
      msg: '',
      players: [],
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',

      //Timer
      isRunning: false,
      minutes: 0,
      seconds: 0,
      time: 0,
      timer: null,
    }
  },
  async created() {
    this.startTimer('meeting');
    await this.socket.emit("startGame", this.roomId);
    await this.socket.on('gamePrepared', (room) => {
      this.room = room;
      this.players = room.users;
    })
    await this.socket.emit('getCurrentUser'); 
    await this.socket.on('currentUser', (user) => {
      this.user = user;
    });

    await this.socket.on('message', (message) => {
      const chatMessages = document.querySelector(".chat-messages");
      const div = document.createElement("div");
      div.classList.add("message");
      div.innerHTML = `<p class="meta">${message.username}: <span>${message.text}</span></p>`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      this.msg = '';
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
    /* startTimer () {
      this.isRunning = true
      this.timer = setInterval(() => {
        this.time++
      }, 1000)
    },
    stopTimer () {
      this.isRunning = false
      clearInterval(this.timer)
    }, */
    startTimer (phase) {
      if(phase === 'meeting') this.time = 1;
      else if (phase === 'voting') this.time = 2;
      else if (phase === 'wolf') this.time = 3;
      else if (phase === 'seer') this.time = 4;
      else if (phase === 'guard') this.time = 5;
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval( () => {
          if (this.time > 0) {
              this.time--
          } else {
              clearInterval(this.timer)
              this.reset()
              if (phase === 'meeting' && this.room.stat.day === '1') this.startTimer('wolf');
              else if (phase === 'meeting' && this.room.stat.day !== '1') this.startTimer('voting');
              else if (phase === 'voting') this.startTimer('wolf');
              else if (phase === 'wolf') this.startTimer('seer');
              else if (phase === 'seer') this.startTimer('guard')
              else if (phase === 'guard'){  
                this.room.stat.day = String(parseInt(this.room.stat.day) + 1);
                this.startTimer('meeting')
              } 
          }
        }, 1000 )
      }
    },
    stop () {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
    },
    reset () {
      this.stop()
      this.time = 0
      this.secondes = 0
      this.minutes = 0
    },
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
</style>