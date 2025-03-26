import { defineStore } from "pinia";
import { useBaseStore } from './baseStore';
import { ref } from 'vue';

export const useGoalStore= defineStore('goal',{
    state:()=>({
        goals:ref([]),
        loading: ref(false),
        errors :ref([]),

    }),
    actions:{
        async fetchGoals() {
            this.loading=true;
            const baseStore = useBaseStore(); 
            try {
              this.goals = await baseStore.get('/goals'); // Fetch Goals from the backend
            } catch (error) {
              console.error('Failed to fetch goals:', error);
            }
            finally{
              this.loading=false;
            }
          },

          async createGoal(goal){
            this.loading=true;
            const baseStore=useBaseStore()
            try {
                const newGoal= await baseStore.post('/goals', goal); 
               
                this.fetchGoals()
              } catch (error) {
                console.error('Failed to create Goal:', error);
              }

              finally{
                this.loading=false;
            }
        },
        async updateGoal(id, updatedGoal) {
          const baseStore = useBaseStore(); 
          try {
            const goal = await baseStore.put(`/goals/${id}`, updatedGoal); // Update the note
            const index = this.goals.findIndex((n) => n.id === id);
            if (index !== -1) {
              this.goals[index] = goal; // Update the note in the local state
            }
          } catch (error) {
            console.error('Failed to update goal:', error);
          }
        },
        async deleteGoal(id) {
            this.loading=true;
            const baseStore = useBaseStore(); 
            try {
              await baseStore.delete(`/goals/${id}`); 
              
              
            } catch (error) {
              console.error('Failed to delete goal:', error);
            }
            finally{
                this.loading=false;
            }
          },

    }

})