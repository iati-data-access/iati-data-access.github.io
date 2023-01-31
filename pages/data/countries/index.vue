<script>
  export default {
    middleware({ store, redirect, localePath }) {
      return redirect(localePath({
        name: 'data-recipient-country-or-region'
      }))
    }
  }
</script>