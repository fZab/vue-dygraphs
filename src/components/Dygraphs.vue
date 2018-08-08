<script>
import Dygraphs from 'dygraphs'

export default {
  render (createElement) {
    return createElement(
      'div', {
        attrs: {
          id: 'vue-dygraphs' + this._uid,
        },
        style: this.graphStyle,
      },
    )
  },
  data () {
    return {
      _graph: null,
      waitingForUpdate: false,
    }
  },
  props: {
    graphData: {
      required: true,
    },
    graphOptions: {
    },
    graphStyle: {
      type: Object,
      default () {
        return {
          width: '100%',
          height: '500px',
        }
      },
    },
    interactionModel: {
      type: Object,
      default: null,
    },
    clickCallback: {
      type: Function,
      default: null,
    },
    drawCallback: {
      type: Function,
      default: null,
    },
    highlightCallback: {
      type: Function,
      default: null,
    },
    pointClickCallback: {
      type: Function,
      default: null,
    },
    underlayCallback: {
      type: Function,
      default: null,
    },
    unhighlightCallback: {
      type: Function,
      default: null,
    },
    zoomCallback: {
      type: Function,
      default: null,
    },
    drawHighlightPointCallback: {
      type: Function,
      default: null,
    },
    drawPointCallback: {
      type: Function,
      default: null,
    },
  },
  created () {
    // override callback options
    this.graphOptions.clickCallback = this.clickCallback
    this.graphOptions.drawCallback = this.drawCallback
    this.graphOptions.highlightCallback = this.highlightCallback
    this.graphOptions.pointClickCallback = this.pointClickCallback
    this.graphOptions.underlayCallback = this.underlayCallback
    this.graphOptions.unhighlightCallback = this.unhighlightCallback
    this.graphOptions.zoomCallback = this.zoomCallback
    this.graphOptions.drawHighlightPointCallback = this.drawHighlightPointCallback
    this.graphOptions.drawPointCallback = this.drawPointCallback
    this.graphOptions.interactionModel = this.interactionModel
  },
  mounted () {
    this.renderGraph(this.graphData, this.graphOptions)
  },
  methods: {
    renderGraph (data, options) {
      this.$data._graph = new Dygraphs('vue-dygraphs' + this._uid, data, options)
    },
    updateGraph () {
      console.debug(this.graphData[0].length)
      // Merge data and options
      let obj = Object.assign({}, this.graphOptions, {file: this.graphData})
      this.$data._graph.updateOptions(obj)
    },
  },
  watch: {
    'graphData': {
      handler (val, oldVal) {
        console.debug('graphData update, was waiting : ', this.waitingForUpdate)

        // If we already are waiting for an update, update everything at once
        if (this.waitingForUpdate) {
          this.updateGraph()
          this.waitingForUpdate = false
          return
        }

        // TODO : val format is not necessarily an array
        // Checks if the number of columns has changed : if so, not waiting for the label array update would trigger an error (Mismatch between number of labels (...) and number of columns in array (...))
        if (val.length > 0 && oldVal.length > 0) {
          if (val[0].length !== oldVal[0].length) {
            this.waitingForUpdate = true
          }
        }
        if (!this.waitingForUpdate) {
          this.$data._graph.updateOptions({file: val})
        }
      },
    },
    'graphOptions': {
      handler (val, oldVal) {
        console.debug('graphOptions update, was waiting : ', this.waitingForUpdate)
        if (this.waitingForUpdate) {
          this.updateGraph()
          this.waitingForUpdate = false
        } else {
          this.$data._graph.updateOptions(val)
        }
      },
    },
  },
}
</script>
