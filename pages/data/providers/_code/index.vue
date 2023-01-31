<script>
  export default {
    middleware({ store, redirect, localePath, route }) {
      return redirect(localePath({
        name: 'data-reporting-organisation-code',
        params: route.params,
        query: route.query
      }))
    }
  }
</script>