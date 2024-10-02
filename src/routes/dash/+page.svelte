<script lang="ts">
    import { onMount } from "svelte";


    let loaded = false;

    onMount(() => {
        loaded = true;
    });

</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if loaded}
<div class="container">
    <div class="topbar">
        <div class="title">Dashboard</div>
        <a href="/user">
            <i class="fa-solid fa-user"></i>
        </a>
    </div>
</div>
{/if}