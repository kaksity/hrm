<template>
  <v-container
    grid-list-lg
    pa-0
  >
    <v-layout wrap>
      <v-flex>
        <v-basic-card
          mt-2
          title="List Of Positions"
          toolbar-height="56"
        >
          <template slot="card-content">
            <v-layout>
              <v-flex>
                <v-text-field
                  type="text"
                  label="Position"
                  v-model="Position"
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-btn @click="CreateNewPosition()" color="primary">Create New Position</v-btn>
              </v-flex>
            </v-layout>
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
                <td>{{ props.item.position }}</td>
                <td>
                  <v-icon @click="DeleteSinglePositions(props.item.id)">delete</v-icon>
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
      Position: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
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
    GetAllPositions() {
      this.$api.GetPositions().then((res) => {
        this.list = res.data;
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
    CreateNewPosition() {
      if (this.Position === '') {
        this.$message({
          type: 'error',
          text: 'Position is required',
        });
        return;
      }

      const Form = {
        position: this.Position,
      };

      this.$api.PostPosition(Form).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetAllPositions();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.data.message,
        });
      });
    },
    DeleteSinglePositions(id) {
      this.$api.DeletePosition(id).then((res) => {
        this.$message({
          type: 'success',
          text: res.message,
        });
        this.GetAllPositions();
      }).catch((err) => {
        this.$message({
          type: 'error',
          text: err.message,
        });
      });
    },
  },
  created() {
    this.GetAllPositions();
  },
};
</script>
