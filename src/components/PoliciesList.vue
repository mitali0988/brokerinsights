<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search Policy"
          v-model="searchText"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchPolicy"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Policy List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(policy, index) in policies"
          :key="index"
          @click="setActivePolicy(policy, index)"
        >
          {{ policy.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentPolicy">
        <h4>Policy</h4>
        <div>
          <label><strong>Client Name:</strong></label> {{ currentPolicy.client_name }}
        </div>
        <div>
          <label><strong>Customer Name:</strong></label> {{ currentPolicy.name }}
        </div>
        <div>
          <label><strong>Customer Address:</strong></label> {{ currentPolicy.address }}
        </div>
        <div>
          <label><strong>Premium:</strong></label> {{ currentPolicy.premium}}
        </div>
        <div>
          <label><strong>Policy Type:</strong></label> {{ currentPolicy.policy_type}}
        </div>
        <div>
          <label><strong>Insurer Name:</strong></label> {{ currentPolicy.insurer_name}}
        </div>

        <router-link :to="'/policies/' + currentPolicy.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Policy...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PolicyDataService from "../services/PolicyDataService";

export default {
  name: "policies-list",
  data() {
    return {
      policies: [],
      currentPolicy: null,
      currentIndex: -1,
      searchText: ""
    };
  },
  methods: {
    retrievePolicies() {
      PolicyDataService.getAll()
        .then(response => {
          this.policies = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePolicies();
      this.currentPolicy = null;
      this.currentIndex = -1;
    },

    setActivePolicy(policy, index) {
      this.currentPolicy = policy;
      this.currentIndex = policy ? index : -1;
    },
 
    searchPolicy() {
      PolicyDataService.findByText(this.searchText)
        .then(response => {
          this.policies = response.data;
          this.setActivePolicy(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePolicies();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>