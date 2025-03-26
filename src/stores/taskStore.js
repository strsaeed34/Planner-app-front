
import { defineStore, storeToRefs } from 'pinia';
import { useBaseStore } from './baseStore';
import { ref } from 'vue';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks:ref([]), 
        errors: ref({}),
        loading: ref(false),
        selectedGoal:ref(null)
    }),
    actions:{
        async fetchTasks(){
            const baseStore=useBaseStore()
            try{
                this.tasks= await baseStore.get('/tasks')


            }catch(error)
            {
                console.error('Faild to fetch tasks:',error)
            }
        },

        async createTask(task){
            console.log("store", task)
            this.loading=true;
            const baseStore=useBaseStore()
            try {
                const newTask= await baseStore.post('/tasks', task); 
               
                this.fetchTasks()
              } catch (error) {
                console.error('Failed to create Task:', error);
              }

              finally{
                this.loading=false;
            }
        },
        
        async updateTask(task){
          console.log("store", task)
          this.loading=true;
          const baseStore=useBaseStore()
          try {
              const newTask= await baseStore.put(`/tasks/${task.id}`, task); 
             
              this.fetchTasks()
            } catch (error) {
              console.error('Failed to create Task:', error);
            }

            finally{
              this.loading=false;
          }
      },

        async deleteTask(id) {
            this.loading=true;
            const baseStore = useBaseStore(); 
            try {
              await baseStore.delete(`/tasks/${id}`); 
              //this.notes = this.notes.filter((note) => note.id !== id); // Remove the note from the local state
              
            } catch (error) {
              console.error('Failed to delete Task:', error);
            }
            finally{
                this.loading=false;
            }
          },
    }

});