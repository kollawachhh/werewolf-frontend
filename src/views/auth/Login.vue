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
          <div class="px-5 mt-4">
            <p class="lh-lg">&emsp; WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF</p>
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
            username: null,
            room: null, 
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
        this.socket.emit('new user connected', this.user)
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