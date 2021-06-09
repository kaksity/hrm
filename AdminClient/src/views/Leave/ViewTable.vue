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
                <td>{{ props.item.reason_for_leave }}</td>
                <td>{{ props.item.date_of_request }}</td>
                <td>{{ props.item.status }}</td>
                <td>
                  <v-icon @click="GoToDetails(props.item.id)">camera</v-icon>
                  <v-icon @click="DeleteLeaveApplication(props.item.id)">delete</v-icon>
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
          text: 'Reason For Leave',
          align: 'left',
          sortable: false,
          value: 'reason_for_leave',
        },
        {
          text: 'Date of Request',
          align: 'left',
          sortable: false,
          value: 'date_of_request',
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status',
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
    GetAllLeaveApplications() {
      this.$api.GetLeaveApplications().then((res) => {
        this.list = res.data;
      }).catch((err) => {
        console.log(err);
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    DeleteLeaveApplication(id) {
      this.$api.DeleteLeaveApplications(id).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetAllLeaveApplications();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    GoToDetails(id) {
      this.$router.push({ path: `/leaves/view-details/${id}` });
    },
  },
  created() {
    this.GetAllLeaveApplications();
  },
};
</script>
