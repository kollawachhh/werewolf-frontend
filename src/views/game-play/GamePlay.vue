<template>
  <div id="game-play" class="container-fluid p-0">
    <div class="row w-100 d-flex m-0">
        <div class="col-6 d-flex ps-5 pt-5">
            <!-- <div v-bind:class="isSpeaking ? 'speaking rounded-2 col-3' : 'col-3'"> -->
              <div class="col-3">
                <img v-if="user.role === 'seer' && user.state === 'Alive'" v-bind:class="isSpeaking ? 'speaking rounded-2' : 'unknown-player-checked rounded-2'" style="height:258px;" src="../../../public/images/roles/Seer_card.png" alt="seer">
                <img v-if="user.role === 'seer' && user.state === 'Eliminated'" style="height:258px;" src="../../../public/images/roles/seer_killed.png" alt="seerKilled">
                <img v-if="user.role === 'werewolf' && user.state === 'Alive'" v-bind:class="isSpeaking ? 'speaking rounded-2' : 'unknown-player-voted-killed rounded-2'" style="height:258px;" src="../../../public/images/roles/Wolf_card.png" alt="wolf">
                <img v-if="user.role === 'werewolf' && user.state === 'Eliminated'" style="height:258px;" src="../../../public/images/roles/wolf_killed.png" alt="wolfKilled">
                <img v-if="user.role === 'guard' && user.state === 'Alive'" v-bind:class="isSpeaking ? 'speaking rounded-2' : 'unknown-player-checked rounded-2'" style="height:258px;" src="../../../public/images/roles/Guard_card.png" alt="guard">
                <img v-if="user.role === 'guard' && user.state === 'Eliminated'" style="height:258px;" src="../../../public/images/roles/guard_killled.png" alt="guardKilled">
                <img v-if="user.role === 'villager' && user.state === 'Alive'" v-bind:class="isSpeaking ? 'speaking rounded-2' : 'unknown-player-checked rounded-2'" style="height:258px;" src="../../../public/images/roles/Villager_card.png" alt="villager">
                <img v-if="user.role === 'villager' && user.state === 'Eliminated'" style="height:258px;" src="../../../public/images/roles/villager_killed.png" alt="villagerKilled">
            </div>
            <div class="col-9 text-start text-white ms-4">
                <p class="display-5">{{ user.username }} <span v-bind:class="user.state === 'Alive' ? 'text-success' : 'text-danger'">({{ user.state }})</span></p>
                <p class="fs-2 mb-0 lh-lg">Role: <span v-bind:class="user.role === 'werewolf' ? 'text-danger': 'text-success'">{{ user.role }}</span></p>
                <p class="fs-2 mb-0 lh-lg">Day: <span>{{ day }}</span></p>
                <p class="fs-2 mb-0 lh-lg">Time Remaining: {{ prettyTime }}</p>
            </div>
        </div>
        <div class="col-6 text-end pe-5 pt-4 text-white">
            <span class="display-4">{{period}}</span>
        </div>
    </div>
    <div class="d-flex ps-5 pt-5" style="height: 35%;">
        <div class="col-4 h-100">
            <div class="row chat-wrapper h-100 rounded-4 px-3 py-3">
              <div class="col-12">
                <div class="row d-flex" style="height:17%;">
                  <button disabled :hidden="user.role === 'werewolf'" class=" h-100 mt-2 rounded-3 text-white bg-secondary" style="width: 10%;" @click="groupChat = 'all'">All</button>
                  <button :hidden="user.role !== 'werewolf'" class="h-100 mt-2 rounded-3 text-white bg-secondary" style="width: 15%;" v-bind:class="groupChat === 'all' ? 'bg-success': 'bg-secondary'" @click="groupChat = 'all'">All</button>
                  <button :hidden="user.role !== 'werewolf'" class="h-100 mt-2 ms-2 py-1 rounded-3 text-white bg-secondary" style="width: 15%;" v-bind:class="groupChat === 'werewolf' ? 'bg-danger': 'bg-secondary'" @click="groupChat = 'werewolf'">Werewolf</button>
                </div>
                <div class="row h-50 text-start my-3 text-white overflow-auto">
                  <div :hidden="groupChat === 'werewolf'" class="chat-messages"></div>
                  <div :hidden="groupChat === 'all'" class="werewolf-messages"></div>
                </div>
                <form v-if="groupChat === 'all'" class="row d-flex rounded-2" style="height:17%;" v-on:submit="sendMessage">
                    <input :disabled="this.period === 'Night' || user.state === 'Eliminated'" class="w-75 h-100 rounded-2 bg-secondary text-white px-2" type="text" v-model="msg">
                    <button :disabled="this.period === 'Night' || user.state === 'Eliminated'" class="h-100 bg-secondary rounded-2 text-white ms-auto" style="width: 20%;" type="submit">Send</button>
                </form>
                <form v-if="groupChat === 'werewolf'" class="row d-flex rounded-2" style="height:17%;" v-on:submit="sendMessageWerewolf">
                    <input :disabled="(this.period === 'Night' && this.currentPhase !== 'wolf') || user.state === 'Eliminated'" class="w-75 h-100 rounded-2 bg-secondary text-white px-2" type="text" v-model="msgWerewolf">
                    <button :disabled="(this.period === 'Night' && this.currentPhase !== 'wolf') || user.state === 'Eliminated'" class="h-100 bg-secondary rounded-2 text-white ms-auto" style="width: 20%;" type="submit">Send</button>
                </form>
              </div>
            </div>
                
        </div>
        <div class="col-4 d-block justify-content-center align-items-center text-white text-center pt-5">
            <p class="display-1">{{ description }}</p>
            <p class="fs-3"> {{ secDescription }}</p>
        </div>
        <div class="col-4">
          <div id="audio-button" class="text-center">
            <audio id="user-audio" class="user-audio"></audio>
            <div class="controls">
              <b-icon v-if="microphone && period == 'Day' && user.state !== 'Eliminated' && userStream != null" icon="mic-fill" variant="light" font-scale="3" style="cursor: pointer" v-on:click="toggleMic"></b-icon>
              <b-icon v-else-if="period == 'Day' && user.state !== 'Eliminated' && userStream != null" icon="mic-mute-fill" variant="light" font-scale="3" style="cursor: pointer" v-on:click="toggleMic"></b-icon>
              <b-icon v-else icon="mic-mute" variant="danger" font-scale="3" style="cursor: pointer" v-on:click="toggleMic"></b-icon>
            </div>
          </div>
        </div>
    </div>
    <div class="row w-100 d-flex px-5 mx-auto">
        <div class="d-flex p-0 h-25" style="width: 95%; overflow-x: scroll; position: fixed; bottom: 0;">
            <div v-for="player in players" :key="player.username" class="h-100">
              <div v-if="player.username !== user.username" class="text-white mx-5 h-100">
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
                <b-button @click="showMsgBoxTwo(player)" v-bind:class="player.speaking ? 'speaking bg-transparent h-75' : 'bg-transparent border-0 h-75'" :style="player.speaking ? 'padding: 4px 10px 4px 10px;' : 'padding: 6px 12px 6px 12px;'"
                :disabled="player.killed || currentPhase === 'meeting' || user.state === 'Eliminated' || !user.isActive ||
                  !(user.role === 'villager' && currentPhase === 'voting') &&
                  !(user.role === 'werewolf' && currentPhase === 'voting') &&
                  !(user.role === 'seer' && currentPhase === 'voting') &&
                  !(user.role === 'guard' && currentPhase === 'voting') &&
                  !(user.role === 'werewolf' && currentPhase === 'wolf' && player.role !== 'werewolf') &&
                  !(user.role === 'seer' && currentPhase === 'seer' && !player.checked) &&
                  !(user.role === 'guard' && currentPhase === 'guard')">
                  <img v-if="(user.role === 'villager' && player.state === 'Alive') || 
                    (user.role === 'seer' && player.state === 'Alive' && !player.checked) ||
                    (user.role === 'guard' && player.state === 'Alive' && !player.saved) ||
                    (user.role === 'werewolf' && player.state === 'Alive' && !player.killed && player.role !== 'werewolf')" src="../../../public/images/roles/Unknown_card.png" v-bind:class="player.saved ? 'unknown-player-saved rounded-2 h-100' : 'unknown-player player-btn rounded-2 h-100'" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role !== 'werewolf'" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-checked player-btn rounded-2 h-100" alt="">
                  <img v-if="user.role === 'seer' && player.checked && player.state === 'Alive' && player.role === 'werewolf'" src="../../../public/images/roles/wolf.png" class="player-btn h-100" alt="">
                  <img v-if="user.role === 'werewolf' && player.state === 'Alive' && player.role === 'werewolf'" src="../../../public/images/roles/wolf.png" class="h-100" alt="">
                  <img v-if="user.role === 'guard' && player.saved" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-saved rounded-2 h-100" alt="">
                  <img v-if="user.role === 'werewolf' && player.state === 'Alive' && player.killed" src="../../../public/images/roles/Unknown_card.png" class="unknown-player-voted-killed rounded-2 h-100" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'villager'" src="../../../public/images/roles/villager_killed.png" class="h-100" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'werewolf'" src="../../../public/images/roles/wolf_killed.png" class="h-100" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'seer'" src="../../../public/images/roles/seer_killed.png" class="h-100" alt="">
                  <img v-if="player.state === 'Eliminated' && player.role === 'guard'" src="../../../public/images/roles/guard_killled.png" class="h-100" alt="">
                </b-button>
              </div>
              <!-- <div class="text-white mx-5 h-100">
                <p>Username1<span>(Alive)</span></p>
                <b-button class="h-75">
                  <img src="../../../public/images/roles/Unknown_card.png" class="unknown-player player-btn rounded-2 h-100" alt="">
                </b-button>
              </div> -->
            </div>
        </div>
    </div>
    <div id="other-user-audio" style="width: 0%; height: 0%;"></div>
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

      //Modal
      boxTwo: '',
      
      //Chat
      groupChat: 'all',
      msg: '',
      msgWerewolf: '',

      //Timer
      minutes: 0,
      seconds: 0,
      time: 0,

      //Audio
      dayTime: new Audio('http://soundbible.com/mp3/Sunny Day-SoundBible.com-2064222612.mp3'),
      nightTime: new Audio('http://soundbible.com/mp3/Crickets At Night-SoundBible.com-174444778.mp3'),
      timeCount: new Audio('http://soundbible.com/mp3/Tick-DeepFrozenApps-397275646.mp3'),
      killedSound: new Audio('http://soundbible.com/mp3/neck_snap-Vladimir-719669812.mp3'),

      //Microphone
      peers: {},
      userStream: null,
      microphone: false,
      currentUserContainer: null,
      currentUserAudio: null,
      otherUserAudio: null,
      allowMicAccess: '',
      voiceDetect: null,
      isSpeaking: false,
      count: 0,
      audioContext: null,
      analyzer: null,
      sourceNode: null,
      audioPeakDB: null,
      audioMeter: null,
    }
  },
  async created() {
/*     if(this.$route.params.socket == null) {
      this.$router.push({ name: 'Login' })
    } */
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
    });
    await this.socket.emit("beginGame", this.roomId);
    await this.socket.on('count', (stat) => {
      this.description = stat.description;
      this.secDescription = stat.secDescription;
      if(this.description !== 'Start'){
        this.timeCount.volume = 0.5;
        this.timeCount.play();
      }
      
    })
    // await this.socket.emit("startTimer", this.roomId);
    await this.socket.on('timer', (time) => {
      this.time = time;
      if(time <= 10) {

        this.timeCount.volume = 0.5;
        this.timeCount.play();
      }
    })
    await this.socket.on('currentPhase', (stat) => {
      this.day = stat.day;
      this.currentPhase = stat.phase;
      this.description = stat.description;
      this.secDescription = stat.secDescription;
      this.period = stat.period;
      this.dayTime.loop = true;
      this.dayTime.volume = 0.2;
      this.nightTime.loop = true;
      this.nightTime.volume = 0.2;
      let bg = '';
      if(this.day === '1' && this.period === 'Day'){
        this.dayTime.currentTime = 0;
        this.dayTime.pause();
        this.dayTime.play();
        bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/game-play2.jpg')"
      }
      else if(this.day === '1' && this.period === 'Night'){
        this.dayTime.currentTime = 0;
        this.dayTime.pause();
        this.nightTime.currentTime = 0;
        this.nightTime.pause();
        this.nightTime.play();
        bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/game-play1.png')"
      }
      else if(this.day !== '1' && this.period === 'Night') {
        this.dayTime.currentTime = 0;
        this.dayTime.pause();
        this.nightTime.currentTime = 0;
        this.nightTime.pause();
        this.nightTime.play();
        bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/game-play1.png')"
      }
      else if (this.day !== '1' && this.period === 'Day') {
        this.nightTime.currentTime = 0;
        this.nightTime.pause();
        this.dayTime.currentTime = 0;
        this.dayTime.pause();
        this.dayTime.play();
        bg = "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../images/game-play2.jpg')"
      }

      const section = document.getElementById('game-play') 
        section.style.background = bg
        section.style.backgroundColor = "black"
        section.style.backgroundSize = "cover"
        section.style.height = "100%"
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
    
    await this.socket.on('werewolfMessage', (message) => {
      const chatMessages = document.querySelector(".werewolf-messages");
      const div = document.createElement("div");
      div.classList.add("message");
      if (message.username == this.user.username) {
        div.innerHTML = `<p class="meta text-danger">${message.username}: <span>${message.text}</span></p>`;
      }
      else {
        div.innerHTML = `<p class="meta">${message.username}: <span>${message.text}</span></p>`;
      }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      this.msgWerewolf = '';
    })

    await this.socket.on('roomUsers', (roomUsers) => {
      this.players = roomUsers;
    });
    await this.socket.on('playerKilled', () => {
      this.killedSound.play();
    });
    await this.socket.on('gameOver', (room) => {
      console.log('gameOver')
      this.dayTime.pause();
      this.nightTime.pause();
      this.timeCount.pause();
      this.killedSound.pause();
      this.$router.push({ name: 'Game-result', params: { roomId: room.code, socket: this.$route.params.socket, room: room } });
    })

    await this.setupRoomMicrophone();

    await this.socket.on('all other users', this.callOtherUsers);

    await this.socket.on("connection offer", this.handleReceiveOffer);

    await this.socket.on('connection answer', this.handleAnswer);

    await this.socket.on('ice-candidate', this.handleReceiveIce);

    await this.socket.on("show highlight", (users) => {
      this.players = users;
    })
  },
  watch: {
    async allowMicAccess(newState, oldState) {
      if (newState == 'granted') {
        await this.detectVoiceFromMicrophone();
        await this.socket.emit('setup room microphone', this.roomId);
      }
    },
    microphone(newState, oldState) {
      if (newState == true) {
        this.highlightSpeaker();
      }
    },
    isSpeaking(newState, oldState) {
      if (newState != oldState) {
        this.socket.emit("speaking highlight", { speaking: this.isSpeaking, roomId: this.roomId });
      }
    },
    user(newState, oldState) {
      if (newState.state === 'Eliminated' && this.userStream != null) {
        let mic = this.userStream.getTracks().find(track => track.kind === 'audio');
        mic.enabled = false;
        this.microphone = false;
      }
    },
    period(newState, oldState) {
      if (newState == 'Night' && this.userStream != null) {
        let mic = this.userStream.getTracks().find(track => track.kind === 'audio');
        mic.enabled = false;
        this.microphone = false;
      }
    },
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
    sendMessageWerewolf(e) {
      e.preventDefault();
      if(this.msgWerewolf === '') return;
      this.socket.emit('chatMessageWerewolf', {
        msg: this.msgWerewolf, 
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
                player.saved = true
                this.socket.emit('chatMessage', {
                  msg: 'Voted for ' + player.username, 
                  roomId: this.roomId
                });
              this.votePlayer(player.id)
            }
            else if(this.currentPhase === 'seer'){
              this.checkPlayer(player.id)
            }
            else if(this.currentPhase === 'guard'){
              this.savePlayer(player.id)
            }
            else if(this.currentPhase === 'wolf'){
                this.players.forEach(p => {
                  if(p.id === player.id){
                    p.killed = true
                  }
                })
                this.socket.emit('chatMessageWerewolf', {
                  msg: 'Voted for ' + player.username, 
                  roomId: this.roomId
                });
              this.killPlayer(player.id)
            }
          }
        })
        .catch(err => {
          // An error occurred
        })
    },
    async setupRoomMicrophone() {
      try {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        
        this.userStream = stream;
        this.currentUserAudio = document.getElementById('user-audio');
        this.currentUserAudio.srcObject = stream;

        this.currentUserContainer = document.getElementById('audio-button');
        this.otherUserAudio = document.getElementById('other-user-audio');
        
        let mic = this.userStream.getTracks().find(track => track.kind === 'audio');
        mic.enabled = false;

        console.log(this.userStream);
        await navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
          console.log(permissionStatus.state);
          this.allowMicAccess = permissionStatus.state;
        });
      } catch (error) {
        await navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
          console.log(permissionStatus.state);
          this.allowMicAccess = permissionStatus.state;
        });
        console.log("You have denied the microphone access for this site.");
      }
    },
    callOtherUsers(otherUsers) {
      otherUsers.forEach(async (userIdToCall) => {
        const peer = await this.createPeer(userIdToCall);
        this.peers[userIdToCall] = peer;
        this.userStream.getTracks().forEach(track => {
          peer.addTrack(track, this.userStream);
        });
      });
    },
    createPeer(userIdToCall) {
      const peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.stunprotocol.org"
          },
        ]
      });
      this.count = this.count + 1;
      console.log(this.count, ': on process of calling ', userIdToCall, " from " , this.user.id, " and this is the peer: ", peer);
      peer.onnegotiationneeded = () => userIdToCall ? this.handleNegotiationNeededEvent(peer, userIdToCall) : null;
      peer.onicecandidate = this.handleICECandidateEvent;
      peer.ontrack = (e) => {
        const container = document.createElement('div');
        container.classList.add('remote-audio-container');
        const audio = document.createElement('audio');
        audio.srcObject = e.streams[0];
        audio.autoplay = true;
        audio.playsInline = true;
        audio.classList.add("remote-audio");
        container.appendChild(audio);
        container.id = userIdToCall;
        this.otherUserAudio.appendChild(container);
      }
      return peer;
    },
    async handleNegotiationNeededEvent(peer, userIdToCall) {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const payload = {
        sdp: peer.localDescription,
        userIdToCall,
      };

      this.socket.emit('peer connection request', payload);
    },
    async handleReceiveOffer({ sdp, callerId }) {
      const peer = await this.createPeer(callerId);
      this.peers[callerId] = peer;
      const desc = new RTCSessionDescription(sdp);
      await peer.setRemoteDescription(desc);

      this.userStream.getTracks().forEach(track => {
        peer.addTrack(track, this.userStream);
      });

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      const payload = {
        userToAnswerTo: callerId,
        sdp: peer.localDescription,
      };

      this.socket.emit('connection answer', payload);
    },
    async handleAnswer({ sdp, answererId }) {
      const desc = new RTCSessionDescription(sdp);
      await this.peers[answererId].setRemoteDescription(desc).catch(e => console.log(e));
    },
    handleICECandidateEvent(e) {
      if (e.candidate) {
        Object.keys(this.peers).forEach(id => {
          const payload = {
            target: id,
            candidate: e.candidate,
          }
          this.socket.emit("ice-candidate", payload);
        });
      }
    },
    async handleReceiveIce({ candidate, from }) {
      const inComingCandidate = new RTCIceCandidate(candidate);
      await this.peers[from].addIceCandidate(inComingCandidate);
    },
    detectVoiceFromMicrophone() {
      this.audioContext = new AudioContext();
      this.analyzer = this.audioContext.createAnalyser();
      this.analyzer.fftSize = 512;
      this.analyzer.smoothingTimeConstant = 0.1;
      this.sourceNode = this.audioContext.createMediaStreamSource(this.userStream);
      this.sourceNode.connect(this.analyzer);
    },
    highlightSpeaker() {
      setInterval(async () => {
        const fftBins = new Float32Array(this.analyzer.frequencyBinCount);
        await this.analyzer.getFloatFrequencyData(fftBins);
        this.audioPeakDB = Math.max(...fftBins);

        const frequencyRangeData = new Uint8Array(this.analyzer.frequencyBinCount);
        await this.analyzer.getByteFrequencyData(frequencyRangeData);
        const sum = frequencyRangeData.reduce((p, c) => p + c, 0);
        this.audioMeter = Math.sqrt(sum / frequencyRangeData.length);

        if (this.audioPeakDB > -50) {
          this.isSpeaking = true;
        } else if (this.audioPeakDB <= -50 && this.audioMeter > 0) {
          this.isSpeaking = false;
        }
      }, 500);
    },
    async toggleMic() {
      let permissions = null;
      await navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
        permissions = permissionStatus.state;
      })
      if (permissions == 'granted' && this.userStream != null && (this.currentPhase === 'meeting' || this.currentPhase === 'voting')) {
        let audioTrack = this.userStream.getTracks().find(track => track.kind === 'audio');
        if (audioTrack.enabled) {
          audioTrack.enabled = false;
          this.microphone = false;
        } else {
          audioTrack.enabled = true;
          this.microphone = true;
        }
      } else if ((permissions == 'granted' && this.userStream == null) || permissions == 'prompt' && (this.currentPhase === 'meeting' || this.currentPhase === 'voting')) {
        this.setupRoomMicrophone();
      } else if (permissions == 'denied') {
        alert("You have denied the microphone access for this site.");
      } else {
        alert("Shhhhhhhh \uD83E\uDD2B");
      }
    },
  }
}
</script>

<style scoped>
#game-play{
    background: linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../public/images/game-play2.jpg');
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
.player-btn:hover{
  border: 2px solid #FFE55C;
}
.unknown-player-checked{
  border: 2px solid #00C844;
}
.unknown-player-saved{
  border: 2px solid #0eaeee;
}
.unknown-player-voted-killed{
  border: 2px solid #FF0000;
}
.confirm-action-modal{
  background: rgba(23, 23, 23, 0.8);
}
.m-title-wrapper{
  border-bottom: 2px solid white;
}
.speaking{
  border: 2px solid #FFFFFF;
}
</style>