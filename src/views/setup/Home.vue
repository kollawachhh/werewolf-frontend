<template>
  <div class="container-fluid px-0 d-flex" style="height: 100%">
    <div class="row w-100 m-0 h-100">
        <div class="w-25 h-100 pt-5">
          <div class="h-25 pt-5">
              <p class="display-5 mt-5 fw-bold">Have a room !?</p>
          </div>
          <form class=" h-25" v-on:submit="create">
              <div class="w-50 mx-auto mb-3">
                  <p class="fw-bold" style="text-align: left;">CREATE ROOM 
                    <b-button v-b-modal.modal-room-setting class="border-0 p-0 ms-2 pb-2" style="color: black; background: transparent;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                      </svg>
                    </b-button>
                    <b-modal ref="room-setting" id="modal-room-setting" size="md" hide-header hide-footer centered
                      v-model="settingShow"
                      :body-bg-variant="bodyBgVariant"
                      :body-text-variant="bodyTextVariant">
                      <div class="px-5">
                        <div class="d-flex m-title-wrapper">
                          <p class="my-4 fs-1 fw-bold">Room setting</p>
                          <button class="mt-3 text-white border-0 ms-auto pb-4" style="background:none;" @click="hideSettingModal">X</button>
                        </div>
                      </div>
                      <div class="px-5 mt-4 fs-5">
                        <div class="d-flex mb-4">
                          <span class="lh-lg mt-1">Meeting Time (Second)</span>
                          <input v-model="setting.meetingTime" class="px-2 py-2 h6 mt-2  ms-auto" max="300" min="10" type="number" placeholder="10 - 300 second">
                        </div>
                        <div class="d-flex mt-1">
                          <p class="lh-lg">Vote Time (Second)</p>
                          <input v-model="setting.voteTime" class="px-2 py-2 h6 mt-2 mb-4 ms-auto" max="300" min="10" type="number" placeholder="10 - 300 second">
                        </div>
                        <div class="d-flex mt-1">
                          <p class="lh-lg">Seer Time (Second)</p>
                          <input v-model="setting.seerTime" class="px-2 py-2 h6 mt-2 mb-4 ms-auto" max="300" min="10" type="number" placeholder="10 - 300 second">
                        </div>
                        <div class="d-flex mt-1">
                          <p class="lh-lg">Guard Time (Second)</p>
                          <input v-model="setting.guardTime" class="px-2 py-2 h6 mt-2 mb-4 ms-auto" max="300" min="10" type="number" placeholder="10 - 300 second">
                        </div>
                        <div class="d-flex mt-1">
                          <p class="lh-lg">Werewolf Time (Second)</p>
                          <input  v-model="setting.werewolfTime" class="px-2 py-2 h6 mt-2 mb-4 ms-auto" max="300" min="10" type="number" placeholder="10 - 300 second">
                        </div>
                        <div class="text-center">
                          <button class="button bg-secondary border-0 py-2 rounded-2 text-white mb-4 h6" style="width:70px;" @click="saveSettingModal">Save</button>
                        </div>
                        
                      </div>
                    </b-modal>
                  </p>
                  <input v-model="setting.maxPlayer" class="w-100 px-2" style="height:40px" type="number" max="10" min="4" placeholder="Max player">
              </div>
              <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;" type="submit">Create</button>
            </form>
          <form class="h-25"  v-on:submit="join"><!-- style="padding-bottom: 70%" -->
              <div class="w-50 mx-auto mb-3">
                  <p class="fw-bold" style="text-align: left;">JOIN ROOM</p>
                  <input v-model="roomCode" class="w-100 px-2" style="height:40px" type="number" placeholder="Room code">
              </div>
              <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;">Join</button>
            </form>
          <div class="ps-4 pb-4" style="position: fixed; bottom: 0; text-align:left; "><a class="text-dark fw-bold how-to-play fs-5" href="/">Back</a></div>
          
      </div>
      <div id="home" class="w-75 h-100">
        <div class="me-5 pt-3">
          <div>
            <b-button class="how-to-play fs-1" v-b-modal.modal-center>How To Play</b-button>
            <b-modal ref="how-to-play" id="modal-center" size="xl" hide-header hide-footer class="how-to-play-modal" centered
              v-model="show"
              :body-bg-variant="bodyBgVariant"
              :body-text-variant="bodyTextVariant">
              <div class="px-5">
                <div class="d-flex m-title-wrapper">
                  <p class="my-4 fs-1 fw-bold">HOW TO PLAY</p>
                  <button class="mt-3 text-white border-0 ms-auto pb-4" style="background:none;" @click="hideModal">X</button>
                </div>
              </div>
              <div class="px-5 mt-4 fs-5">
                <p class="lh-lg fw-bold fs-4"> Werewolf game guide</p>
                <p class="lh-lg">&emsp;This game simulates a village with villagers and werewolves that the villagers can't tell apart who is werewolf and must eliminate all of them. And the werewolves need to misguided villagers before being killed. Includes special roles on both sides that make the game more entertaining.</p>
                <p class="lh-lg fw-bold fs-4">How to play</p>
                <p>&emsp;1. No one is able to know another person's role but their own.</p>
                <p>&emsp;2. There will be no voting for anyone to be burned in the first morning.</p>
                <p>&emsp;3. All roles are in the same room, just only the werewolves will have the extra room to plan who to be killed</p>
                <p>&emsp;&emsp;in each night</p>
                <p>&emsp;4. Every night, the werewolves have to make a decision about who will be killed.</p>
                <p>&emsp;5. Every morning, all players decided to vote someone they believed to be a werewolf, they can also abstain </p>
                <p>&emsp;&emsp;vote to anyone. The most votes will be set afire and killed. Werewolves must act in any way they like to </p>
                <p>&emsp;&emsp;fool villagers they aren't werewolf. The villagers need to track down the all the werewolves.</p>
                <p>&emsp;6. There will be a variety of roles to play in order to make the game more entertaining.</p>
                <p>&emsp;7. The villagers win when all the werewolves are dead, whereas the werewolves win when they are equal </p>
                <p>&emsp;&emsp;to number of villagers.</p>
                <p class="lh-lg fw-bold fs-4">Described in each side</p>
                <p class="lh-lg" style="text-decoration: underline;">The villager's side</p>
                <p>1. The villager</p>
                <p>&emsp;Every morning, can votes one player to be burn.</p>
                <p>2. The seer</p>
                <p>&emsp;Every night, chooses one player to see whether they are a werewolf or not. It will show the player's role </p>
                <p>&emsp;if they are werewolf. Otherwise, it won't show the player's role. (Only seer can see)</p>
                <p>3. The guard</p>
                <p>&emsp;Every night, chooses one player to protect. The same person can't be constantly protected.</p>
                <p class="lh-lg" style="text-decoration: underline;">The werewolf's side</p>
                <p>1. The werewolf / The werewolves</p>
                <p>&emsp;Every night, pick one player to kill; if pick more than one person, they have to vote to kill someone, </p>
                <p>&emsp;they can't vote to kill the werewolf.</p>
              </div>
            </b-modal>
            <div class="text-center text-white pt-5" style="margin-top: 120px;">
              <p class="display-1">WEREWOLF</p>
              <p class="fs-1">Web game project</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socket'],
  data() {
    return {
      user:{
        id: null,
        username: null,
        role: null,
        room: null,
        state: null
      },
      roomCode: null,
      show: false,
      settingShow: false,
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
      img: 1,

      bgTime: null,

      //room setting
      setting: {
        maxPlayer: 4,
        meetingTime: 10,
        voteTime: 10,
        seerTime: 10,
        guardTime: 10,
        werewolfTime: 10,
      },
    }
  },
  async created() {
    this.bgTime = setInterval(this.changeBgHome, 5000)
    if(this.$route.params.socket == null) {
      this.$router.push({ name: 'Login' })
    }
    this.socket = this.$route.params.socket;
    await this.socket.emit('getCurrentUser'); 
    await this.socket.on('currentUser', (user) => {
      this.user = user;
    });
  },
  computed:  {
    
  },
  methods: {
    hideModal() {
      this.$refs['how-to-play'].hide()
    },
    hideSettingModal() {
      this.setting.meetingTime = 10;
      this.setting.voteTime = 10;
      this.setting.seerTime = 10;
      this.setting.guardTime = 10;
      this.setting.werewolfTime = 10;
      this.$refs['room-setting'].hide()
    },
    saveSettingModal() {
      this.$refs['room-setting'].hide()
    },
    async create(e){
      e.preventDefault()
      await this.socket.emit('createRoom', this.setting)
      this.socket.on('roomCreated', (room) => {
        this.user.room = room;
        clearInterval(this.bgTime)
        this.$router.push({ name: 'Lobby', params: { roomId: this.user.room, socket: this.$route.params.socket } })
      });
    },
    async join(e){
      e.preventDefault()
      await this.socket.emit('joinRoom', this.roomCode)
      this.socket.on('roomJoined', (room) => {
        if (room != false) {
          this.user.room = room;
          clearInterval(this.bgTime)
          this.$router.push({ name: 'Lobby', params: { roomId: this.user.room, socket: this.$route.params.socket } })
        }
        else {
          alert("Wrong");
        }
      });
    },
    changeBgHome() {
        let bg = "url('./images/background2.png')"
        if(this.img == 1){
          bg = "url('./images/background2.png')"
          this.img = 2
        }
        else{
          bg = "url('./images/background3.png')"
          this.img = 1
        }
        const section = document.getElementById('home') 
        section.style.backgroundImage = bg
        section.style.backgroundColor = 'black'
        section.style.height = '100%'
        section.style.textAlign = 'right'
        section.style.borderTopLeftRadius = '498px'
        section.style.borderBottomRightRadius = '498px'
        section.style.backgroundSize = 'cover'
      }
  }
}
</script>

<style scoped>
#home{
  background: url('../../../public/images/background3.png');
  background-color: black;
  height: 100%;
  text-align: right;
  border-top-left-radius: 498px;
  border-bottom-right-radius: 498px;
  background-size: cover;
}
.how-to-play{
  background: none;
  border: 0;
  text-decoration: none;
  cursor: pointer;
}
.how-to-play:hover{
  text-decoration: underline;
  background: none;
  border: 0;
}
.how-to-play-modal{
  background: rgba(23, 23, 23, 0.8);
}
.m-title-wrapper{
  border-bottom: 2px solid white;
}
.bi-gear:hover{
  color: rgb(182, 182, 182);
}
</style>