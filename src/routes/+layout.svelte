<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";

    import NavigationIndicator from "$lib/NavigationIndicator.svelte";
    import { onMount } from "svelte";
   
    let loaded = false;

    onMount(() => {
        loaded = true;
    });

</script>


<NavigationIndicator />
{#if loaded}
<slot></slot>
{/if}

<svelte:head>
    <title>File share Cloud</title>
</svelte:head>