<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import NavigationIndicator from "$lib/NavigationIndicator.svelte";
    let ready = false;

    onMount(() => {
        ready = true;
    });

</script>


<NavigationIndicator />
{#if ready}
<div class="container">
    <slot></slot>
    <div class="footer" in:fade>
        &copy; {new Date().getFullYear()} BrainbirdLab
    </div>
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
    .footer {
        padding: 1rem;
        text-align: center;
        font-size: 0.7rem;
        position: absolute;
        bottom: 0;
    }
</style>