<script lang="ts">

    import { PUBLIC_PROJECT_ID, PUBLIC_BUCKET_ID } from '$env/static/public';
    import { bytesToReadable, getIcon } from '$lib/utils.js';
    import { fly } from 'svelte/transition';

    export let data;

</script>

<svelte:head>
    <title>File Basket | Download</title>
</svelte:head>

{#if data.status == 200}
<div class="fileInfo" in:fly|global={{y: 5}}>
    <div class="icon">
        <i class="fa-solid {getIcon(data.props.type)}"></i>
    </div>
    <div class="filename">
        File: <span class="value">{data.props.filename}</span>
    </div>
    <div class="size">
        Size: <span class="value">{bytesToReadable(data.props.filesize)}</span>
    </div>
</div>
<div class="btnGrp">
    <a in:fly|global={{y: 5, delay: 100}} href="/" class="btn back">
        <i class="fa-solid fa-arrow-left"></i> Back
    </a>
    <a in:fly|global={{y: 5, delay: 150}} href="https://cloud.appwrite.io/v1/storage/buckets/{PUBLIC_BUCKET_ID}/files/{data.props.id}/download?project={PUBLIC_PROJECT_ID}&mode=admin" class="download btn">
        <i class="fa-solid fa-cloud-arrow-down"></i> Download
    </a>
</div>
{:else}
<div class="error" in:fly|global={{y: 5}}>
    <div class="icon">
        <i class="fa-solid fa-exclamation-triangle"></i>
    </div>
    <div class="message">
        {data.error}
    </div>
</div>
<div class="btnGrp">
    <a in:fly|global={{y: 5, delay: 100}} href="/" class="btn back">
        <i class="fa-solid fa-arrow-left"></i> Back
    </a>
</div>
{/if}

<style lang="scss">

    .icon {
        font-size: 5rem;
        color: var(--ui-color);
        width: 100%;
        text-align: center;
    }

    .fileInfo {
        width: min(300px, 95vw);
        border: 2px solid var(--ui-color);
        padding: 20px;
        border-radius: 12px;
    }

    .filename, .size {
        font-size: 0.9rem;
        color: var(--transparent-white);
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
    }

    .fa-exclamation-triangle {
        color: var(--error-color);
    }

</style>