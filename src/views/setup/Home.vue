<template>
  <div class="d-flex" style="height: 100%">
    <div class="w-25 h-100 pt-5">
        <div class="h-25 pt-5">
            <p class="display-5 mt-5 fw-bold">Have a room !?</p>
        </div>
        <form class="mb-5 pb-3" v-on:submit="create">
            <div class="w-50 mx-auto mb-3">
                <p class="fw-bold" style="text-align: left;">CREATE ROOM</p>
                <input v-model="maxPlayer" class="w-100 px-2" style="height:40px" type="number" max="10" min="4" placeholder="Max player">
            </div>
            <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;" type="submit">Create</button>
            <!-- <a class="bg-secondary border-0 px-3 py-2 rounded-2 text-white" style="text-decoration: none;" href="/lobby">Create</a> -->
          </form>
        <form style="padding-bottom: 70%" v-on:submit="join">
            <div class="w-50 mx-auto mb-3">
                <p class="fw-bold" style="text-align: left;">JOIN ROOM</p>
                <input v-model="roomCode" class="w-100 px-2" style="height:40px" type="number" placeholder="Room code">
            </div>
            <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;">Join</button>
          </form>
        <div class="ps-4" style="text-align:left;"><a class="text-dark fw-bold how-to-play fs-5" href="/">Back</a></div>
        
    </div>
    <div id="background" class="w-75 h-100 background">
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
      </div>
    </div>
      <div class="text-center text-white pt-5" style="margin-top: 120px;">
        <p class="display-1">WEREWOLF</p>
        <p class="fs-1">Web game project</p>
      </div>
    </div>
  </div>
</template>

<script>
// import io from "socket.io-client";
export default {
  props: ['socket'],
  data() {
    return {
      user:{
        id: null,
        username: null,
        room: null,
        state: null
      },
      maxPlayer: 4,
      roomCode: null,
      show: false,
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
    }
  },
  async created() {
    console.log(this.$route.params.socket)
    this.socket = this.$route.params.socket;
    await this.socket.emit('getCurrentUser'); 
    await this.socket.on('currentUser', (user) => {
      console.log("Current user: ",user)
      this.user = user;
    });
    console.log(this.user)
  },
  methods: {
    hideModal() {
      this.$refs['how-to-play'].hide()
    },
    async create(e){
      e.preventDefault()
      console.log(this.socket);
      await this.socket.emit('createRoom', this.maxPlayer)
      this.socket.on('roomCreated', (room) => {
        console.log("Room: ", room, "created");
        this.user.room = room;
        console.log("Room code: ", this.user.room);
        console.log(this.$route.params.socket);
        this.$router.push({ name: 'Lobby', params: { roomId: this.user.room, socket: this.$route.params.socket } })
      });
    },
    async join(e){
      e.preventDefault()
      await this.socket.emit('joinRoom', this.roomCode)
      this.socket.on('roomJoined', (room) => {
        console.log("Room joined: ", room);
        if (room != false) {
          this.user.room = room;
          console.log("Join code: ", this.user.room);
          console.log(this.$route.params.socket);
          this.$router.push({ name: 'Lobby', params: { roomId: this.user.room, socket: this.$route.params.socket } })
        }
        else {
          alert("Wrong");
        }
      });
    }
  }
}
</script>

<style scoped>
.background{
  background: url('../../../public/images/background2.png');
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
</style>