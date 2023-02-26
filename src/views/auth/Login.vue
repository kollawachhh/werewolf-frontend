<template>
  <div class="background">
    <div class="me-5 pt-3">
      <div>
        <b-button class="how-to-play fs-1" v-b-modal.modal-center>How To Play</b-button>
        <b-modal ref="how-to-play" id="modal-center" size="xl" hide-header hide-footer class="how-to-play-modal" centered
          v-model="show"
          :body-bg-variant="bodyBgVariant"
          :body-text-variant="bodyTextVariant">
          <div class="px-5 ">
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
    <div class="text-center text-white" style="margin-top: 120px;">
      <p class="display-1 fw-bold">WEREWOLF</p>
      <p class="fs-1 fw-bold">Web game project</p>
    </div>
    <form class="text-center text-white mt-5" v-on:submit="submit">
      <p class="fs-4 fw-bold">USERNAME</p>
      <input v-model="user.username" class="px-2 mb-4 text-white bg-secondary border-1 border-light text-center" style="height:40px" type="text" placeholder="Username">
      <br>
      <button class="button rounded-3 mt-3" style="width: 80px; height: 40px;" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: {},
      user:{
        id: null,
        username: null,
        role: null,
        room: null,
        state: null
      },
      show: false,
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
    }
  },
  created() {
    this.socket = io('http://localhost:3000');
    console.log(this.socket)
  },
  mounted() {

  },
  methods: {
    hideModal() {
      this.$refs['how-to-play'].hide()
    },
    submit(e){
      e.preventDefault()
      // this.socket.emit('login', { username: this.username, room: null });
      console.log('user: ', this.user)
      this.socket.emit('login', this.user)
      this.$router.push({ name: 'Home', params: { socket: this.socket } })
    }
  }
}
</script>

<style scoped>
.background{
  background: linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('../../../public/images/background1.png');
  height: 100%;
  text-align: right;
}
input::-webkit-input-placeholder{
    color:rgb(172, 172, 172);
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
.submit{
  text-decoration: none;
}
.submit:hover{
  background:rgb(66, 66, 66);
}
</style>