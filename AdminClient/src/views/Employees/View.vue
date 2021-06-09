<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex>
        <v-basic-card
          mt-2
          title="List Of Leaves Application"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-data-table
              :headers="headers"
              :items="list"
              item-key="name"
              hide-actions
              class="elevation-1"
            >
              <template
                slot="items"
                slot-scope="props"
              >
                <td>{{ props.item.full_name }}</td>
                <td>{{ props.item.phone_number }}</td>
                <td>{{ props.item.position }}</td>
                <td>
                  <v-icon @click="GoToDetails(props.item.id)">camera</v-icon>
                  <v-icon @click="DeleteEmployees(props.item.id)">delete</v-icon>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-basic-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Qualification',
  data() {
    return {
      IsLoading: false,
      headers: [
        {
          text: 'Full Name',
          align: 'left',
          sortable: false,
          value: 'full_name',
        },
        {
          text: 'Phone Number',
          align: 'left',
          sortable: false,
          value: 'phone_number',
        },
        {
          text: 'Position',
          align: 'left',
          sortable: false,
          value: 'position',
        },
        {
          text: 'Action',
          sortable: false,
        },
      ],
      list: [
      ],
    };
  },
  methods: {
    GetAllEmployees() {
      this.$api.GetAllEmployees().then((res) => {
        this.list = res.data;
      }).catch((err) => {
        console.log(err);
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    DeleteEmployees(id) {
      this.$api.DeleteEmployee(id).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetAllEmployees();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    GoToDetails(id) {
      this.$router.push({ path: `/employees/view-details/${id}` });
    },
  },
  created() {
    this.GetAllEmployees();
  },
};
</script>
