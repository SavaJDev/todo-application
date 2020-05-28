<template>
    <div id="app">
       <div class="app-body">
          <div class="app-body__header">
              <h1>AppToDo</h1>
              <div class="app-body__header-menu">
                 <div class="left-col">
                     <div class="btn btn-addCard" @click="addCard">
                        <p>Add Card</p>
                     </div>
                     <div class="btn btn-addGroup" @click="addNewCardGroup">
                        <p>Add Group</p>
                     </div>
                 </div>
                 <div class="right-col">
                     <input type="text" v-model="inputSearch" placeholder="Search">
                     <div class="btn-group">
                         <div class="btn btn-all" :class="{active: isActiveBtnAll}" @click="btnAll">
                            <p>All</p>
                         </div>
                         <div class="btn btn-active" :class="{active: isActiveBtnActive}" @click="btnActive">
                            <p>Active</p>
                         </div>
                         <div class="btn btn-finished" :class="{active: isActiveBtnFinished}" @click="btnFinished">
                            <p>Finished</p>
                         </div> 
                     </div>
                 </div>   
              </div>
              <div class="decor-line"><hr></div>
          </div>
          
          <div class="app-body__content">
              <div v-for="(card,i) in allCards" :key="card.id">
                 
                  <app-card v-if="card.markCard"
                            :index="i"
                            :title="card.title"
                            :status="card.status"
                            :search="inputSearch"
                            :flag="flag"
                            :marker="card.markCard"/> 
                        
                  <app-cardGroup v-if="!card.markCard"
                                 :indexGroup="i"
                                 :title="card.title"
                                 :cards="card.cards"
                                 :search="inputSearch"
                                 :flag="flag"
                                 :markCard="card.markCard"
                                 ref="cardGroup"/>                       
              </div> 
          </div>
       </div> 
    </div>
</template>

<script>
    import AppCard from './components/Card.vue'
    import AppCardGroup from './components/CardGroup.vue'
    
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'App',
        components: {
           AppCard,
           AppCardGroup
        },
        data () {
            return {
                showModal:false,
                inputSearch: '',
                isActiveBtnAll: true,
                isActiveBtnActive: false,
                isActiveBtnFinished: false,
                flag: 1,
                tstflag: true
            }
        },
        methods: {
            ...mapActions({
				addCard: 'addCard',
                addCardGroup: 'addCardGroup'
			}),
            addNewCardGroup() {
                this.addCardGroup()
                
                this.$nextTick(() => {
                   this.$refs.cardGroup[this.$refs.cardGroup.length - 1].$refs.cardGroupTitleInput.focus()
                })
            },
            btnAll() {
               this.isActiveBtnAll = true
               this.isActiveBtnActive = false
               this.isActiveBtnFinished = false
               this.flag = 1
            },
            btnActive() {
               this.isActiveBtnAll = false
               this.isActiveBtnActive = true
               this.isActiveBtnFinished = false
               this.flag = 2  
            },
            btnFinished() {
               this.isActiveBtnAll = false
               this.isActiveBtnActive = false
               this.isActiveBtnFinished = true
               this.flag = 3
            }
        },
        computed: {
            ...mapGetters({
                allCards: 'allCards'
            })
        }  
    }

</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    #app {
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }
    
    .app-body {
        width: 90vw;
        max-width: 900px;
        min-width: 500px;
        background-color: #dbdbdb;
        padding-bottom: 20px;
    }
    
    .app-body__header {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: fixed;
        width: 90vw;
        max-width: 900px;
        min-width: 500px;
        z-index: 20;
        background-color: #dbdbdb;
    }
    
    .app-body__header h1 {
       color: #7b6161; 
       text-shadow: 1px 1px 1px black;
       margin-top: 5px;    
    }
    
    .btn {
        width: 80px;
        height: 25px;
        background: #a7a7a7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
    }
    
    .btn p {
        color: white;
    }
    
    .btn:hover {
        background: #919191;
    }
    
    .app-body__header-menu {
        display: flex;
        width: 80vw;
        max-width: 800px;
        min-width: 410px;
        margin-bottom: 5px;
    }
    
    .left-col {
        display: flex;
        width: 50%;
        align-items: flex-end;
        margin-top: 15px;
    }
    
    .btn-addCard {
        margin-right: 5px;
    }
    
    .right-col {
        display: flex;
        flex-direction: column;
        width: 50%;
        align-items: flex-end;
        margin-top: 15px;
    }
    
    .decor-line {
        width: 100%;
    }
    
    input {
        width: 240px;
        margin-bottom: 5px;
    }
    
    .btn-group {
        display: flex;
    }
    
    .btn-all {
        border-radius: 5px 0 0 5px;
        border-right: .5px solid white;
    }
    
    .btn-active {
        border-radius: 0;
    }
    
    .btn-finished {
        border-radius: 0 5px 5px 0;
        border-left: .5px solid white;
    }
    
    .active {
        background: #cecea0;
    }
    
    .active:hover {
        background: #cecea0;
    }
    
    .app-body__content {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .app-body__content {
        margin-top: 110px;
    }
</style>
