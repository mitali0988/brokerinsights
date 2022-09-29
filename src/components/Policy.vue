<template>
  <div v-if="currentPolicy" class="edit-form">
    <h4>Policy</h4>
    <form>
      <div class="form-group">
        <label for="name">Customer Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentPolicy.name"
        />
      </div>
      <div class="form-group">
        <label for="address">Customer Address</label>
        <input type="text" class="form-control" id="address"
          v-model="currentPolicy.address"
        />
      </div>

      
    </form>

    
    <button class="badge badge-danger mr-2"
      @click="deletePolicy"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updatePolicy"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Policy...</p>
  </div>
</template>

<script>
import PolicyDataService from "../services/PolicyDataService";

export default {
  name: "policy",
  data() {
    return {
      currentPolicy: null,
      message: ''
    };
  },
  methods: {
    getPolicy(id) {
      PolicyDataService.get(id)
        .then(response => {
          this.currentPolicy = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },


    updatePolicy() {
      PolicyDataService.update(this.currentPolicy.id, this.currentPolicy)
        .then(response => {
          console.log(response.data);
          this.message = 'The policy was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePolicy() {
      PolicyDataService.delete(this.currentPolicy.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "policies" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPolicy(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>