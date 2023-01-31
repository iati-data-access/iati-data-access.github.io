<script>
  export default {
    middleware({ store, redirect, localePath }) {
      return redirect(localePath({
        name: 'data-sector-category'
      }))
    }
  }
</script>