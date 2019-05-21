import Vue from 'vue'

export function addHistory (state, value) {
  if (value) {
    const h = state.history
    h.unshift(value)

    const historyLength = Vue.prototype.$config.tools.search.historyLength
    if (historyLength) {
      h.length = Math.min(h.length, historyLength)
    }
  }
}

export function query (state, value) {
  addHistory(state, value)
  state.query = value
  state.errorFetching = false
  state.fetchingResults = null
  state.finalResults = null
  state.result = null
}

export function fetchingResults (state, value) {
  state.errorFetching = false
  state.fetchingResults = value
  state.finalResults = null
  state.result = null
}

export function errorFetching (state, value) {
  state.errorFetching = value
}

export function finalResults (state, value) {
  state.fetchingResults = null
  state.finalResults = value
  state.result = null
}

export function selectResult (state, value) {
  state.result = value
}

// Applies a result without fetching (if generating a result without a list)
export function result (state, value) {
  state.fetchingResults = null
  state.finalResults = null
  state.result = value
}