import { defineManualApi } from '../../../components/DocsApi/ManualApiOptions'

export default defineManualApi({
  events: {
    input: {
      types: '(value: any) => void',
    },
  },
})