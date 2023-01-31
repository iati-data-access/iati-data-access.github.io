<script>
  export default {
    middleware({ store, redirect, localePath, route }) {
      return redirect(localePath({
        name: 'data-recipient-country-or-region-code',
        params: route.params,
        query: route.query
      }))
    }
  }
</script>