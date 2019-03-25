 <template>
  <!-- <div> -->
  <!-- <h1>{{ message }}</h1> -->
  <div>
    <q-btn color="primary" label="Primary"/>
    <q-circular-progress
      :value="value"
      size="90px"
      :thickness="0.2"
      color="orange"
      center-color="grey-8"
      track-color="transparent"
      class="q-ma-md"
    />
  </div>

  <!-- <q-btn color="secondary" label="Secondary"/> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      message: "Hello from Vue!",
      value: 50
    };
  }
};
</script>