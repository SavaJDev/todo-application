import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [
        
    ],
    id: 0  
  },
  getters: {
      allCards(state){
            return state.cards;
      }
	},    
  mutations: {
      addCard(state){
          state.cards.push({
              id: ++state.id,
              title: '',
              status: 'Active',
              markCard: true
          })
      },
      addCardGroup(state){
          state.cards.push({
              id: ++state.id,
              title: '',
              markCard: false,
              cards: []
          })
      },
      addCardInGroup(state,index){
          state.cards[index].cards.push({
              title: '',
              status: 'Active',
              markCard: true
          })
      },
      saveCard(state, val){
          state.cards[val.index].title = val.title  
      },
      saveCardInGroup(state, val){
          state.cards[val.indexGroup].cards[val.indexCard].title = val.title
      },
      changeStatus(state, index){
          state.cards[index].status == 'Active' ? 
          state.cards[index].status = 'Finished' : 
          state.cards[index].status = 'Active'
      },
      changeStatusInGroup(state,val){
          state.cards[val.indexGroup].cards[val.indexCard].status == 'Active' ? 
          state.cards[val.indexGroup].cards[val.indexCard].status = 'Finished' : 
          state.cards[val.indexGroup].cards[val.indexCard].status = 'Active'
      },
      removeCard(state,index){
          state.cards.splice(index, 1)
      },
      removeCardFromGroup(state, val){
          state.cards[val.indexGroup].cards.splice(val.indexCard, 1)
      }
  },
  actions: {
      addCard(store){
			return new Promise(function(resolve, reject){
					store.commit('addCard');
					resolve();
			});
      },
      addCardGroup(store){
			return new Promise(function(resolve, reject){
					store.commit('addCardGroup');
					resolve();
			});
      },
      addCardInGroup(store,index){
			return new Promise(function(resolve, reject){
					store.commit('addCardInGroup',index);
					resolve();
			});
      },      
      saveCard(store, val){
			return new Promise(function(resolve, reject){
					store.commit('saveCard', val);
					resolve();
			});
      },
      saveCardInGroup(store, val){
			return new Promise(function(resolve, reject){
					store.commit('saveCardInGroup', val);
					resolve();
			});
      },
      changeStatus(store, index){
			return new Promise(function(resolve, reject){
					store.commit('changeStatus', index);
					resolve();
			});
      },
      changeStatusInGroup(store, val){
			return new Promise(function(resolve, reject){
					store.commit('changeStatusInGroup', val);
					resolve();
			});
      },
      removeCard(store,index){
			return new Promise(function(resolve, reject){
					store.commit('removeCard', index);
					resolve();
			});
      },
      removeCardFromGroup(store,val){
			return new Promise(function(resolve, reject){
					store.commit('removeCardFromGroup', val);
					resolve();
			});
      }
  }
})
