<script lang="ts">
    import { goto } from "$app/navigation";
    import Preload from "$lib/Preload.svelte";
    import { bytesToReadable } from "$lib/utils";
    import { account, storage } from "$lib/appwrite";
    import { PUBLIC_BUCKET_ID } from "$env/static/public";
    import { onMount } from "svelte";

    let loaded = false;

    let user = "User";

    let loggingOut = false;

    onMount(() => {
        account.get().then((res) => {
            user = res.name;
        }).catch((e) => {
            console.log(e);
            goto("/");
        }).finally(() => {
            loaded = true;
        });
    });

    function logout() {
        loggingOut = true;
        account.deleteSession("current").then(() => {
            goto("/");
        }).catch((e) => {
            console.log(e);
            loggingOut = false;
        });
    }

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
        <button class="logout" title="Log out" disabled={loggingOut} on:click={logout}>
            {#if loggingOut}
                Logging out...
            {:else}
            Logout <i class="fa-solid fa-sign-out"></i>
            {/if}
        </button>
    </div>
    <div class="content">
        {#await storage.listFiles(PUBLIC_BUCKET_ID)}
            Loading files...
        {:then files} 
            <table>
                <colgroup>
                    <col span="1" style="width: 70%;">  
                    <col span="1" style="width: 100px;">  
                    <col span="1" style="width: 100px;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {#each files.files as file}
                        <tr>
                            <td>{file.name}</td>
                            <td>
                                {#if file.mimeType}
                                    {
                                        file.mimeType.includes("/") ? file.mimeType.split("/")[1] : file.mimeType
                                    }
                                {:else}
                                    Unknown
                                {/if}
                            </td>
                            <td>{bytesToReadable(file.sizeOriginal)}</td>
                        </tr>
                    {/each}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">Total files: {files.total}</td>
                        <td>{bytesToReadable(files.files.reduce((acc, file) => acc + file.sizeOriginal, 0))}</td>
                    </tr>
                </tfoot>
            </table>
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
        padding: 10px;
        width: min(800px, 100%);
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
        margin-top: 20px;
        height: 100vh;
        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            border-radius: 5px;
            th, td {
                border: 1px solid var(--ui-color);
                padding: 10px;
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            th {
                background: var(--ui-color);
            }
        }
    }

</style>