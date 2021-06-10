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
                    <v-text-field
                      v-model="FirstName"
                      label="First Name"
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
                    <v-text-field
                      v-model="MiddleName"
                      label="Middle Name"
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
                    <v-text-field
                      v-model="LastName"
                      label="Last Name"
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
                    <v-text-field
                      v-model="EmailAddress"
                      label="Email Address"
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
                    <v-text-field
                      v-model="PhoneNumber"
                      label="Phone Number"
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
                    <v-select
                      v-model="UserType"
                      :items="UserTypeList"
                      item-text="name"
                      item-value="id"
                      label="User Type"
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
                    <v-select
                      v-model="Position"
                      :items="PositionList"
                      item-text="position"
                      item-value="id"
                      label="Position"
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
                    <v-select
                      v-model="Gender"
                      :items="GenderList"
                      item-text="text"
                      item-value="value"
                      label="Gender"
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
                      v-model="Address"
                      label="Address"
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
                    <v-text-field
                      v-model="Password"
                      label="Password "
                      @keyup.enter.native="CreateEmployee"
                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                      required
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
                    <v-text-field
                      v-model="ConfirmPassword"
                      label="Confirm Password"
                      @keyup.enter.native="CreateEmployee"
                      :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                      :type="showPwd ? 'text' : 'password'"
                      @click:append="showPwd = !showPwd"
                      required
                    />
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex >
                    <v-btn @click="CreateEmployee" color="primary"> Create Employee</v-btn>
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
      FirstName: '',
      MiddleName: '',
      LastName: '',
      EmailAddress: '',
      PhoneNumber: '',
      UserType: '',
      Position: '',
      Gender: '',
      Address: '',
      Password: '',
      showPwd: false,
      ConfirmPassword: '',
      UserTypeList: [],
      PositionList: [],
      GenderList: [{ text: 'Male', value: 'M' }, { text: 'Female', value: 'F' }],
      IsLoading: false,
    };
  },
  methods: {
    FillPositionSelect() {
      this.$api.GetPositions().then((res) => {
        this.PositionList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    FillUserTypesSelect() {
      this.$api.GetUserTypes().then((res) => {
        this.UserTypeList = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    CreateEmployee() {
      if (this.FirstName === '') {
        this.$message({
          type: 'error',
          text: 'First Name is required',
        });
        return;
      }
      if (this.LastName === '') {
        this.$message({
          type: 'error',
          text: 'Last Name is required',
        });
        return;
      }

      if (this.EmailAddress === '') {
        this.$message({
          type: 'error',
          text: 'Email Address is required',
        });
        return;
      }
      if (this.PhoneNumber === '') {
        this.$message({
          type: 'error',
          text: 'Phone Number is required',
        });
        return;
      }
      if (this.UserType === '') {
        this.$message({
          type: 'error',
          text: 'User Types is required',
        });
        return;
      }

      if (this.Position === '') {
        this.$message({
          type: 'error',
          text: 'Position is required',
        });
        return;
      }
      if (this.Gender === '') {
        this.$message({
          type: 'error',
          text: 'Gender is required',
        });
        return;
      }

      if (this.Address === '') {
        this.$message({
          type: 'error',
          text: 'Address is required',
        });
        return;
      }

      if (this.Password === '') {
        this.$message({
          type: 'error',
          text: 'Password is required',
        });
        return;
      }
      if (this.ConfirmPassword === '') {
        this.$message({
          type: 'error',
          text: 'Confirm Password is required',
        });
        return;
      }

      if (this.Password.length < 8) {
        this.$message({
          type: 'error',
          text: 'Password must be 8 or more characters',
        });
        return;
      }

      if (this.Password !== this.ConfirmPassword) {
        this.$message({
          type: 'error',
          text: 'Password must match Confirm Password',
        });
        return;
      }

      const Form = {
        email_address: this.EmailAddress,
        user_type: this.UserType,
        first_name: this.FirstName,
        middle_name: this.MiddleName,
        last_name: this.LastName,
        address: this.Address,
        position: this.Position,
        gender: this.Gender,
        phone_number: this.PhoneNumber,
        password: this.Password,
        confirm_password: this.ConfirmPassword,
      };

      this.$api.PostEmployees(Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.Clear();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    Clear() {
      this.FirstName = '';
      this.MiddleName = '';
      this.LastName = '';
      this.EmailAddress = '';
      this.PhoneNumber = '';
      this.UserType = '';
      this.Position = '';
      this.Gender = '';
      this.Address = '';
      this.Password = '';
      this.ConfirmPassword = '';
    },
  },
  created() {
    // this.FillReasonForLeaveSelect();
    this.FillPositionSelect();
    this.FillUserTypesSelect();
  },
};
</script>
