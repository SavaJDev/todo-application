<template>
    <div class="card" :class="{notActive: notActive, cardInGroup: changeClass}">
      <app-modal v-show="showModal"
                 @btnCancel="showModal=false"
                 @btnDelete="confirmOfDelete"/>
                 
       <div v-if="!showNewCard" class="addCard">
            <input v-model="valCardName"
                   @keypress.enter="btnSave"
                   type="text" 
                   class="addCardName" 
                   placeholder="Add card name"
                   ref="cardTitleInput">
            <div class="save" @click="btnSave">
                <p>Save</p>
            </div> 
       </div>
       
         <div class="newCard" v-else="showNewCard">
            <p class="cardName">{{ title }}</p>
            <div class="status" @click="checked">
               <p>{{ status }}</p> 
            </div> 
            <div class="delete" @click="remove">
               <p>X</p> 
            </div>
        </div>                             
          
    </div>
</template>

<script>
    import AppModal from './../components/Modal.vue'
    
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'BodyCard',
        components: {
          AppModal   
        },
        props: {
            index:{
               type: Number,
               default: null 
            },
            indexCard:{
               type: Number,
               default: null 
            },
            status:{
               type: String,
               default: ''
            },
            title:{
               type: String,
               default: ''
            },
            search:{
               type: String,
               default: ''  
            },
           flag:{
               type: Number,
               default: null
            },
            marker:{
               type: Boolean,
               default: true
            }
        },
        data () {
            return {
                showModal: false,
                showNewCard: false,
                valCardName: '',
                notActive: false,
                cardInGroup: false
            }
        },
        methods: {
            btnSave() {
                if(this.valCardName.trim()){
                   this.showNewCard = !this.showNewCard 
                     if(this.marker == true){
                         this.saveCard({
                             index: this.index,
                             title: this.valCardName
                          })
                     } else {
                         this.saveCardInGroup({
                              indexGroup: this.index,
                              indexCard: this.indexCard,
                              title: this.valCardName
                         }) 
                     }
                       
                }
            },
            remove() {
                this.showModal = true
            },
            confirmOfDelete() {
                if(this.marker == true) this.removeCard(this.index)
                else this.removeCardFromGroup({
                               indexGroup: this.index,
                               indexCard: this.indexCard
                           })
                this.showModal = false
            },
            checked() {
                if(this.marker == true) this.changeStatus(this.index)
                else this.changeStatusInGroup({
                                 indexGroup: this.index,
                                 indexCard: this.indexCard
                          })
            },
            ...mapActions({
                saveCard: 'saveCard',
                saveCardInGroup: 'saveCardInGroup',
				removeCard: 'removeCard',
                removeCardFromGroup: 'removeCardFromGroup',
                changeStatus: 'changeStatus',
                changeStatusInGroup: 'changeStatusInGroup'
			})
        },
        computed: {
            changeClass() {
                if(!this.marker) return this.cardInGroup = !this.cardInGroup
            }  
        },
        watch: {
            flag(val) {
                if(val == 1) this.notActive = false
                if(val == 2 && this.status != 'Active') this.notActive = true
                else if(val == 3 && this.status != 'Finished') this.notActive = true
                else this.notActive = false
            },
            status(val) {
                if(this.flag == 2 && val != 'Active') this.notActive = true
                else if(this.flag == 3 && val != 'Finished') this.notActive = true
                else this.notActive = false
            },
            search(val) {
               
                let str = this.title.toLowerCase()
                let searchStr = val.toLowerCase()
                
                if(!(str.includes(searchStr))) this.notActive = true
                else this.notActive = false
            }
        },
        mounted() {
            this.$refs.cardTitleInput.focus()
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    
    .card {
        max-width: 790px;
        width: 79vw;
        min-width: 410px;
        min-height: 30px;
        background: #ffffff;
        border-radius: 2px;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 5px;
    }
    
    .addCard {
        display: flex;
        width: 100%;
    }
    
    .newCard {
        display: flex;
        align-items: center;
        width: 100%;
    }
    
    .addCardName {
        font-size: 18px;
        width: 100%;
        border: none;
    }
    
    .save {
        width: 50px;
        height: 25px;
        background: #a7a7a7;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .save p {
        color: white;
    }
    
    .save:hover {
        background: #919191;
    }
    
    .cardName {
        width: 85%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .cardName:hover {
        white-space: normal;
    }
    
    .status {
        width: 70px;
        height: 25px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-left: 5px;
    }
    
    .status:hover {
        background: #cecea0;
    }
    
    .delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        background: #a7a7a7;
        border-radius: 13px;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .delete p {
        color: white;
    }
    
    .delete:hover {
        background: #919191;
    }
    
    .cardInGroup {
       max-width: 700px;
       width: 95%;    
       border: .5px solid black;    
    }
    
    .notActive {
        display: none;
    }
</style>