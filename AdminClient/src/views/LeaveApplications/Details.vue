<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex
        xs12
        lg12
      >
        <v-basic-card
          title="Leave Application Details"
          toolbar-height="56"
        >
          <template slot="card-content">
              <v-container fluid>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                    <b>Employee</b>
                    <div>{{ Employee }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>Reason For Leave</b>
                    <div>{{ ReasonForLeave }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>Description</b>
                    <div>{{ Description }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>DateOfRequest</b>
                    <div>{{ DateOfRequest }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>Start Leave Date</b>
                    <div>{{ StartLeaveDate }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>End Leave Date</b>
                    <div>{{ EndLeaveDate }}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>Status</b>
                    <div>{{ Status }}</div>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex >
                    <v-btn @click="UpdateApplication(true)" color="primary"> Approve Application</v-btn>
                    <v-btn @click="UpdateApplication(false)" color="secondary"> Reject Application</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
          </template>
        </v-basic-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'VBarIndex',
  data() {
    return {
      Employee: '',
      ReasonForLeave: '',
      Description: '',
      DateOfRequest: '',
      StartLeaveDate: '',
      EndLeaveDate: '',
      Status: '',
      IsLoading: false,
    };
  },
  methods: {
    GetAllDetailsLeaveApplications() {
      this.$api.GetDetailsLeaveApplications(this.$route.params.id).then((res) => {
        this.Employee = res.data.employee;
        this.ReasonForLeave = res.data.reason_for_leave;
        this.Description = res.data.description;
        this.DateOfRequest = res.data.date_of_request;
        this.StartLeaveDate = res.data.start_leave_date;
        this.EndLeaveDate = res.data.end_leave_date;
        this.Status = res.data.status;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    UpdateApplication(IsApproved) {
      let ApprovedStatus = '';

      if (IsApproved === true) {
        ApprovedStatus = 'approved';
      } else {
        ApprovedStatus = 'rejected';
      }

      const Form = {
        status: ApprovedStatus,
      };


      this.$api.PutLeaveApplications(this.$route.params.id, Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetAllDetailsLeaveApplications();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
  },
  created() {
    this.GetAllDetailsLeaveApplications();
  },
};
</script>
