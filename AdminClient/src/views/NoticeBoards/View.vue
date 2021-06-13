<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex>
        <v-basic-card
          mt-2
          title="List Of Notices"
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
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.date_posted }}</td>
                <td>
                  <v-icon @click="GoToLeaveApplicationDetails(props.item.id)">camera</v-icon>
                  <v-icon @click="DeleteNoticeBoardRecord(props.item.id)">delete</v-icon>
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
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Date Posted',
          align: 'left',
          sortable: false,
          value: 'date_posted',
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
    DeleteNoticeBoardRecord(id) {
      this.$api.DeleteNotice(id).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
      this.GetAllNotices();
    }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    GetAllNotices() {
      this.$api.GetNotices().then((res) => {
        this.list = res.data;
      }).catch((err) => {
        console.log(err);
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    GoToLeaveApplicationDetails(id) {
      this.$router.push({ path: `/notice-boards/details/${id}` });
    },
  },
  created() {
    this.GetAllNotices();
  },
};
</script>
