<template>
  <div id="lobby" class="w-100 h-100 px-5 background">
    <div class="text-white text-left pt-5 mb-4" style="text-align: left;">
        <span class="display-2 fw-bold">WEREWOLF</span>
        <br>
        <span class="fs-3 fw-bold">Web game project</span>
    </div>
    <div class="h-75 lobby-wrapper rounded-4 text-white px-5 pt-4">
        <div class="d-flex" style="border-bottom: 2px solid white;">
            <p class="me-auto text-start fs-1 fw-bold">Lobby #000000</p>
            <p class="ms-auto text-end fs-1 fw-bold">11 Players</p>
        </div>
        <div class="h-75 player-list-wrapper rounded-4 mt-4 px-3 py-4 ">
            <div class="h-100 mx-auto overflow-auto">
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">Host</span>
                    <span class="ms-auto me-4 h3">Host</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 1</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 2</span>
                    <span class="ms-auto me-4 h3">Not Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 3</span>
                    <span class="ms-auto me-4 h3">Not Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 4</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 5</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 6</span>
                    <span class="ms-auto me-4 h3">Not Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 7</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 8</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 9</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
                <div class="d-flex py-1" style="height: 10%;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot mt-2 ms-2 me-4" viewBox="0 0 16 16">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    <span class="h3">User 10</span>
                    <span class="ms-auto me-4 h3">Ready</span>
                </div>
            </div>
        </div>
        <div class="d-flex mt-3">
            <button class="ms-auto me-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;" disabled>Start</button>
            <!-- <button class="me-auto ms-5 fw-bold rounded-2 border-0 py-2" style="width: 10%; background: #AEAEAE;" >Back</button> -->
            <a class="me-auto ms-5 fw-bold rounded-2 border-0 py-2 text-dark" style="width: 10%; background: #AEAEAE; text-decoration: none;" href="/home">Back</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {

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