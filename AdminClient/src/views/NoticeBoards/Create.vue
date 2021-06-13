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
                    v-model="NoticeTitle"
                    label="Notice Title"
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
                      v-model="NoticeBody"
                      label="Notice Body"
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
                      ref="DatePostedMenu"
                      v-model="DatePostedMenu"
                      :close-on-content-click="false"
                      :return-value.sync="DatePosted"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{on, attrs}">
                        <v-text-field
                          v-model="DatePosted"
                          label="Start Leave Date"
                          readonly
                          outlined
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="DatePosted"
                        no-title
                        scrollable
                      >
                        <v-spacer />
                        <v-btn
                          text
                          @click="DatePostedMenu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          @click="$refs.DatePostedMenu.save(DatePosted)"
                        >
                          Ok
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex >
                    <v-btn @click="CreateNotice" color="primary"> Create Notice</v-btn>
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
      NoticeTitle: '',
      NoticeBody: '',
      DatePosted: new Date().toISOString().substr(0, 10),
      DatePostedMenu: false,
      IsLoading: false,
    };
  },
  methods: {
    CreateNotice() {
      if (this.NoticeTitle === '') {
        this.$message({
          type: 'error',
          text: 'Notice Title is required',
        });
        return;
      }
      if (this.NoticeBody === '') {
        this.$message({
          type: 'error',
          text: 'Notice Body is required',
        });
        return;
      }

      const Form = {
        title: this.NoticeTitle,
        body: this.NoticeBody,
        date: this.DatePosted,
      };

      this.$api.PostNoticeBoard(Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.NoticeTitle = '';
        this.NoticeBody = '';
        }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
  },
  created() {
  },
};
</script>
