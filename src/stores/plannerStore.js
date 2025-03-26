import { defineStore } from "pinia";
import { useBaseStore } from "./baseStore";
import { ref } from "vue";


export const usePlannerStore= defineStore('planner',{
    state:()=>({
        timeBoxList:ref([]),
        timeBox:ref([]),
        errors: null,
        loading: ref(false),
    }),
    actions:{
        async fetchTimeBoxes(){
            const baseStore=useBaseStore()
            try{
                this.timeBoxList= await baseStore.get('/timebox')


            }catch(error)
            {
                console.error('Faild to fetch timeboxes:',error)
            }
        },

        async createTimeBox(newTimeBox) {
            console.log("Request:", newTimeBox);
            this.loading = true;
            const baseStore = useBaseStore();
            try {
                const response = await baseStore.post('/timebox/today', newTimeBox);
                console.log("Response:", response);
        
                // Ensure the response contains the created timebox
                if (response) {
                    this.fetchTimeBoxes(); // Refresh the timebox list
                    return response; // Return the created timebox
                } else {
                    console.error("Invalid response format:", response);
                    return null;
                }
            } catch (error) {
                this.errors = error.response.data.errors;
                console.error('Failed to create timebox:', error.response.data.error);
                return null; // Return null to indicate failure
            } finally {
                this.loading = false;
            }
        },

        async addTaskToTimebox(task,id) {
            console.log("Request:", task);
            this.loading = true;
            const baseStore = useBaseStore();
            try {
                const response = await baseStore.post(`/timebox/${id}/tasks`, task);
                console.log("Response:", response);
                // getTimeBox(id)
                return response
            } catch (error) {
                this.errors = error.response?.data?.error
                console.error('Failed to add task to timebox:',  error);
                return null; // Return null to indicate failure
            } finally {
                this.loading = false;
            }
        },

        async removeTaskTimebox(taskid,id) {
            console.log("Request:", taskid);
            this.loading = true;
            const baseStore = useBaseStore();
            try {
                const response = await baseStore.delete(`/timebox/${id}/tasks/${taskid}`);
                console.log("Response:", response);
                // getTimeBox(id)
                return response
            } catch (error) {
                this.errors = error.response?.data?.error 
                console.error('Failed to remove task from timebox:', error);
                return null; // Return null to indicate failure
            } finally {
                this.loading = false;
            }
        },


        async getTimeBox(id){
            const baseStore=useBaseStore()
            try{
                this.timeBox= await baseStore.get(`/timebox/${id}`)


            }catch(error)
            {
                console.error('Faild to fetch timeboxes:',error)
            }
        },
    } 
});