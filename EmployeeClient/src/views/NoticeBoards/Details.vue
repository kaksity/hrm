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
          title="Notice Details"
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
                  <b>Notice Title</b>
                  <div>{{NoticeTitle}}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                  <b>Notice Body</b>
                  <div>{{NoticeBody}}</div>
                  </v-flex>
                </v-layout>
                <v-layout wrap row>
                  <v-flex
                    xs12
                    sm12
                    md8
                    lg6
                  >
                    <b>Date Posted</b>
                  <div>{{DatePosted}}</div>
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
    GetNoticeDetails() {
      this.$api.GetSingleNotice(this.$route.params.id).then((res) => {
        this.NoticeTitle = res.data.title;
        this.NoticeBody = res.data.body;
        this.DatePosted = res.data.date_posted;
      }).catch((err) =>{
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
  },
  created() {
    this.GetNoticeDetails();
},
};
</script>
