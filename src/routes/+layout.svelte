<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";

    import NavigationIndicator from "$lib/NavigationIndicator.svelte";

</script>


<NavigationIndicator />

<slot></slot>

<svelte:head>
    <title>File share Cloud</title>
</svelte:head>