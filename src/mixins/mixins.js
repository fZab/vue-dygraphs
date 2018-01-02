module.exports = {
  data () {
    return {
      test: null,
    }
  },
  mounted: function() {
    this.graphOptions.clickCallback = this.clickCallback
  },
}
