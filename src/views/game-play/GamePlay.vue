<template>
  <div id="game-play" class="game-play">
    <div class="w-100 d-flex">
        <div class="d-flex w-50 ps-5 pt-5">
            <div class="w-25">
                <img style="width:170px;" src="../../../public/images/roles/seer.png" alt="seer">
            </div>
            <div class="text-start text-white ms-4 w-50">
                <p class="display-5">User 1 <span class="text-success">(living)</span></p>
                <p class="fs-2 ">Role: <span class="text-success">Seer</span></p>
                <p class="fs-2">Day: <span>1</span></p>
                <p class="fs-2">Time Remaining: <span>10.00</span></p>
            </div>
        </div>
        <div class="w-50 text-end pe-5 pt-4 text-white">
            <span class="display-4">Day</span>
        </div>
    </div>
    <div class="w-100 ps-5 pt-5 row">
        <div class="col ">
            <div class="chat-wrapper w-75 rounded-4 px-3 py-3">
                <div class="d-flex">
                    <button class="mt-2 px-3 py-1 rounded-3 text-white bg-secondary">All v</button>
                </div>
                <div class="text-start my-3 px-1 text-white overflow-auto" style="height:180px;">
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                    <p>User1: <span>...</span></p>
                    <p>User2: <span>...</span></p>
                </div>
                <div class="rounded-2" style="height:35px;">
                    <input class="w-100 h-100 rounded-2 bg-secondary text-white px-2" type="text">
                </div>
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
            <div class="text-white mx-5 mb-4">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
            </div>
            <div class="text-white mx-5">
                <p>User2 <span class="text-success">(live)</span></p>
                <img class="" style="width:100px;" src="../../../public/images/roles/unknow.png" alt="">
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
        room: null,
        state: null
      },
      players: [],
      room: null,
      bodyBgVariant: 'dark',
      bodyTextVariant: 'white',
    }
  },
  created() {
    console.log(this.$route);
    console.log(this.$props.socket);
    console.log(this.room);
  },
  mounted() {

  },
  methods: {

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