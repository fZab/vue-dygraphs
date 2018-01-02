<script>
import Dygraphs from 'dygraphs'

export default {
  render (createElement) {
    return createElement(
      'div', {
        attrs: {
          id: 'vue-dygraphs' + this._uid,
        },
      },
    )
  },
  data () {
    return {
      _graph: null,
    }
  },
  props: {
    graphData: {
      required: true,
    },
    graphOptions: {
    },
    graphEvents: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    renderGraph(data, options) {
      this._graph = new Dygraphs('vue-dygraphs' + this._uid, data, options)
    },
  },
  watch: {
    'graphData': {
      handler (val, oldVal) {
        this._graph.updateOptions({file: val})
      },
    },
  },
}
</script>

<style>

</style>
