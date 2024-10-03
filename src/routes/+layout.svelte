<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";

    import NavigationIndicator from "$lib/NavigationIndicator.svelte";
    import { onMount } from "svelte";
    import { PUBLIC_BUCKET_ID } from "$env/static/public";
    import { storage } from "$lib/appwrite";
    import { Query } from "appwrite";
   
    let loaded = false;


    //get this user's uploaded files
    storage.listFiles(PUBLIC_BUCKET_ID, [
        Query.select(["name"])
    ]).then((res) => {
        console.log(res.files[0]?.$permissions);
    }).catch((e) => {
        console.log(e);
    });

    onMount(() => {
        loaded = true;
    });

</script>


<NavigationIndicator />
{#if loaded}
<div class="container">
    <slot></slot>
</div>
{/if}

<svelte:head>
    <title>File share Cloud</title>
</svelte:head>

<style lang="scss">
    .container {
        padding: 1rem;
        max-width: 800px;
        margin: 0 auto;
        color: var(--text-color);
        height: max-content;
        min-height: 100%;
    }
</style>