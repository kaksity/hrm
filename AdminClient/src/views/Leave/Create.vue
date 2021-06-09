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
          title="Apply For a Leave"
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
                    <v-select
                      v-model="ReasonForLeave"
                      :items="ReasonForLeaveList"
                      item-text="name"
                      item-value="id"
                      label="Reason For Leave"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                    <v-textarea
                      v-model="Description"
                      label="Description"
                    />
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                    <v-menu
                      ref="StartLeaveDateMenu"
                      v-model="StartLeaveDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="StartLeaveDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="StartLeaveDate"
                          label="Start Leave Date"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="StartLeaveDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="StartLeaveDateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.StartLeaveDateMenu.save(StartLeaveDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                    <v-menu
                      ref="EndLeaveDateMenu"
                      v-model="EndLeaveDateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="EndLeaveDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="EndLeaveDate"
                          label="End Leave Date"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="EndLeaveDate"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="EndLeaveDateMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.EndLeaveDateMenu.save(EndLeaveDate)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex >
                    <v-btn @click="CreateLeaveApplication" color="primary"> Create Leave Application</v-btn>
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
      StartLeaveDate: new Date().toISOString().substr(0, 10),
      EndLeaveDate: new Date().toISOString().substr(0, 10),
      EndLeaveDateMenu: false,
      StartLeaveDateMenu: false,
      ReasonForLeaveList: [],
      Description: '',
      ReasonForLeave: '',
      IsLoading: false,
    };
  },
  methods: {
    FillReasonForLeaveSelect() {
      this.$api.GetReasonForLeave().then((res) => {
        this.ReasonForLeaveList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    CreateLeaveApplication() {
      if (this.ReasonForLeave === '') {
        this.$message({
          type: 'error',
          text: 'Reason for leave is required',
        });
        return;
      }
      if (this.Description === '') {
        this.$message({
          type: 'error',
          text: 'Description is required',
        });
        return;
      }

      const Form = {
        reason_for_leave: this.ReasonForLeave,
        description: this.Description,
        start_leave_date: this.StartLeaveDate,
        end_leave_date: this.EndLeaveDate,
      };

      this.$api.PostLeaveApplication(Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.Description = '';
      }).catch((err) => {
        console.log(err);
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
  },
  created() {
    this.FillReasonForLeaveSelect();
  },
};
</script>
