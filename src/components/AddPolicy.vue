<template>
  <div class="submit-form">
    <div v-if="!submitted">
      
      <div class="form-group">
        <label for="client_name">Client Name</label>
        <input
          type="text"
          class="form-control"
          id="client_name"
          required
          v-model="policy.client_name"
          name="client_name"
        />
      </div>
      <div class="form-group">
        <label for="name">Customer Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="policy.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="address">Customer Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="policy.address"
          name="address"
        />
      </div>

      <div class="form-group">
        <label for="premium">Premium</label>
        <input
          class="form-control"
          id="premium"
          required
          v-model="policy.premium"
          name="premium"
        />
      </div>

      <div class="form-group">
        <label for="policy_type">Policy Type</label>
        <input
          class="form-control"
          id="policy_type"
          required
          v-model="policy.policy_type"
          name="policy_type"
        />
      </div>

      <div class="form-group">
        <label for="insurer_name">Insurer Name</label>
        <input
          class="form-control"
          id="insurer_name"
          required
          v-model="policy.insurer_name"
          name="insurer_name"
        />
      </div>

      <button @click="savePolicy" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPolicy">Add</button>
    </div>
  </div>
</template>

<script>
import PolicyDataService from "../services/PolicyDataService";

export default {
  name: "add-policy",
  data() {
    return {
      policy: {
        id: null,
        client_name: "",
        name: "",
        address: "",
        premium: "",
        policy_name: "",
        insurer_name:""
      },
      submitted: false
    };
  },
  methods: {
    savePolicy() {
      var data = {
        client_name: this.policy.client_name,
        name: this.policy.name,
        address: this.policy.address,
        premium: this.policy.premium,
        policy_type: this.policy.policy_type,
        insurer_name: this.policy.insurer_name
      };

      PolicyDataService.create(data)
        .then(response => {
          this.policy.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPolicy() {
      this.submitted = false;
      this.policy = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>