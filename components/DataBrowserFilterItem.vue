<template>
  <b-form-group
    :label="fieldLabel">
    <v-select
      multiple
      :options="fieldOptions"
      v-model="_value"
      :reduce="item => item.code">
    </v-select>
  </b-form-group>
</template>
<script>
export default {
  props: ['field', 'fieldLabel',
    'fieldOptions', 'lang',
    'updateField', 'value'],
  data() {
    return {
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(newValue) {
        this.updateField(this.field, newValue)
      }
    }
  }
}
</script>