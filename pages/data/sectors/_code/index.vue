<script>
  export default {
    middleware({ store, redirect, localePath, route }) {
      return redirect(localePath({
        name: 'data-sector-category-code',
        params: route.params,
        query: route.query
      }))
    }
  }
</script>