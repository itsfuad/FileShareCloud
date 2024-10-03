<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_BUCKET_ID } from "$env/static/public";
    import { account, check, storage } from "$lib/appwrite";
    import Preload from "$lib/Preload.svelte";
    import { bytesToReadable } from "$lib/utils";

    let loaded = false;

    let user = "User";

    check().then((res) => {
        if (res) {
            account.get().then((model) => {
                console.log(model);
                user = model.name;
                loaded = true;
            }).catch((e) => {
                console.log(e);
                goto("/");
            });
        } else {
            goto("/");
        }
    }).catch((e) => {
        console.log(e);
    });

</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

{#if !loaded}
<Preload />
{/if}

{#if loaded}
<div class="container">
    <div class="topbar">
        <div class="greet">
            <i class="fa-solid fa-user"></i>
            {user}!
        </div>
        <button class="logout" title="Log out">
            Logout <i class="fa-solid fa-sign-out"></i>
        </button>
    </div>
    <div class="content">
        {#await storage.listFiles(PUBLIC_BUCKET_ID)}
            Loading files...
        {:then files} 
            <div class="title">
                Your files ({files.files.length})
            </div>
            {#each files.files as file}
                <div class="file-item">
                    <div class="meta">
                        <div class="name">
                            {file.name}
                        </div>
                        <div class="type">
                            {file.mimeType}
                        </div>
                    </div>
                    <div class="size">
                        {bytesToReadable(file.sizeOriginal)}
                    </div>
                </div>
            {/each}
        {:catch error}
            <div>{error.message}</div>
        {/await}
    </div>
</div>
{/if}

<style lang="scss">
    .container {
        width: 100%;
        color: var(--text-color);
        height: 100%;
        min-height: 100%;
    }

    .logout {
        background: none;
        border: none;
        color: var(--text-color);
        cursor: pointer;
        &:hover {
            text-decoration: underline;
            filter: brightness(0.9);
        }
    }

    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-height: 100vh;
        width: 100%;
        background: var(--bg-color);
        .title {
            margin-top: 10px;
            font-size: 1.2rem;
        }
        .file-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .meta {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 5px;
                width: 100%;
                overflow: hidden;
            }

            .type {
                font-size: 0.7rem;
                color: var(--transparent-white);
            }

            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
            }

            .size {
                white-space: nowrap;
            }

        }
    }

</style>