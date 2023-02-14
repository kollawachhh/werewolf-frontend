<template>
  <div class="d-flex" style="height: 100%">
    <div class="w-25 h-100 pt-5">
        <div class="h-25 pt-5">
            <p class="display-5 mt-5 fw-bold">Have a room !?</p>
        </div>
        <div class="mb-5 pb-3">
            <div class="w-50 mx-auto mb-3">
                <p class="fw-bold" style="text-align: left;">CREATE ROOM</p>
                <input class="w-100 px-2" style="height:40px" type="number" max="50" min="4" placeholder="Max player">
            </div>
            <!-- <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;">Create</button> -->
            <a class="bg-secondary border-0 px-3 py-2 rounded-2 text-white" style="text-decoration: none;" href="/lobby">Create</a>
        </div>
        <div style="padding-bottom: 70%">
            <div class="w-50 mx-auto mb-3">
                <p class="fw-bold" style="text-align: left;">JOIN ROOM</p>
                <input class="w-100 px-2" style="height:40px" type="number" max="50" min="4" placeholder="Max player">
            </div>
            <button class="button bg-secondary border-0 py-1 rounded-2 text-white" style="width:70px;">Join</button>
        </div>
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
          <div class="px-5 mt-4">
            <p class="lh-lg">&emsp; WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF WEREWOLF</p>
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
            username: null,
            room: null, 
          },
          show: false,
          bodyBgVariant: 'dark',
          bodyTextVariant: 'white',
        }
    },
    created() {
      console.log(this.$route.params.socket)
      this.socket = this.$route.params.socket;
      /* this.socket = io('http://localhost:3000');*/
      this.socket.emit('getCurrentUser'); 
      this.socket.on('currentUser', (user) => {
        console.log(user)
        this.user = user;
      });
      console.log(this.user) 
    },
    methods: {
      hideModal() {
        this.$refs['how-to-play'].hide()
      },
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