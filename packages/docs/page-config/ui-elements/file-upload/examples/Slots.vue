<template>
  <VaFileUpload v-model="basic">
    <div class="custom-upload-file-area">
      <p class="mb-2">
        This is slot, click or drag'n'drop file to upload
      </p>
      <img
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        width="100"
        height="100"
        alt=""
      >
    </div>
  </VaFileUpload>
</template>

<script>
export default {
  data() {
    return {
      basic: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-upload-file-area {
  width: max-content;
  padding: 1rem;
  border: 1px solid #cccccc;
  text-align: center;
}
</style>
