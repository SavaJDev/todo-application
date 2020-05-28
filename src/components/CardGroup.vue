<template>
    <div class="cardGroup">
      <app-modal v-show="showModal"
                 @btnCancel="showModal=false"
                 @btnDelete="confirmOfDelete"/>
                 
       <div v-if="!showNewCardGroup" class="addCardGroup">
            <input v-model="valCardGroupName"
                   @keypress.enter="btnSave"
                   type="text" 
                   class="addCardGroupName" 
                   placeholder="Add card group name" 
                   ref="cardGroupTitleInput">
            <div class="save" @click="btnSave">
                <p>Save</p>
            </div> 
       </div>
       
         <div class="newCardGroup" v-else="showNewCardGroup" :class="{cardAdded: cardAdded}">
           <div class="cardGroup-header">
                <p class="cardGroupName">{{ title }}</p>
           </div>
            
             <draggable group="cardsInGroup" class="cardsInGroup">
                 <app-card v-for="(card,i) in cards"
                        :key="i"
                        :index="indexGroup"
                        :indexCard="i"
                        :title="card.title"
                        :status="card.status"
                        :search="search"
                        :flag="flag"
                        :marker="markCard"/>
             </draggable>
                     
            <div class="cardGroup-footer" :class="{changeClassFooter: cardAdded}">
                <div class="btn" @click="addCardInGroup(indexGroup)">
                    <p>Add Card</p>
                </div> 
                <div class="delete" @click="remove">
                   <p>X</p> 
                </div>
            </div>            
        </div>                                                          
    </div>
</template>

<script>
    import AppModal from './../components/Modal.vue'
    import AppCard from './../components/Card.vue'
    import draggable from 'vuedraggable'
    
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'CardGroup',
        components: {
           AppModal,
           AppCard,
           draggable    
        },
        props: {
            indexGroup:{
               type: Number,
               default: null 
            },
            title:{
               type: String,
               default: ''
            },
            search:{
               type: String,
               default: ''  
            },
            cards:{
               type: Array,
               default: []    
            },
           flag:{
               type: Number,
               default: null
            },
            markCard:{
               type: Boolean,
               default: true 
            }
        },
        data () {
            return {
                showModal: false,
                showNewCardGroup: false,
                valCardGroupName: '',
                cardAdded: false
            }
        },
        methods: {
            btnSave() {
                if(this.valCardGroupName.trim()){
                   this.showNewCardGroup = !this.showNewCardGroup 
                   this.saveCardGroup({
                       index: this.indexGroup,
                       title: this.valCardGroupName
                   })    
                }
            },
            remove() {
                this.showModal = true
            },
            confirmOfDelete() {
                this.removeCardGroup(this.indexGroup)
                this.showModal = false
            },
            ...mapActions({
                saveCardGroup: 'saveCard',
				removeCardGroup: 'removeCard',
                addCardInGroup: 'addCardInGroup'
			})
        },
        watch: {
           cards(val) {
               if(val!=0) this.cardAdded = true
               else this.cardAdded = false
           }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    
    .cardGroup {
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
    
    .addCardGroup {
        display: flex;
        width: 100%;
    }
    
    .newCardGroup {
        display: flex;
        align-items: center;
        width: 100%;
    }
    
    .cardAdded {
        flex-direction: column;
    }
    
    .cardGroup-header {
        display: flex;
        align-items: center;
        width: 100%;
    }
    
    .addCardGroupName {
        font-size: 18px;
        max-width: 720px;
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
        margin-left: 20px;
    }
    
    .save p {
        color: white;
    }
    
    .save:hover {
        background: #919191;
    }
    
    .cardGroupName {
        max-width: 660px;
        width: 55vw;
        min-width: 150px;
        margin-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #7b6161; 
    }
    
    .cardGroupName:hover {
        white-space: normal;
        width: 100%;
    }
    
    .cardsInGroup {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        cursor: pointer;
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
    
    
    .cardGroup-footer {
        display: flex;
    }
    
    .changeClassFooter {
        margin-top: 10px;
        justify-content: center;
    }
    
</style>