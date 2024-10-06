<script lang="ts">
    import { goto } from "$app/navigation";
    import Preload from "$lib/Preload.svelte";
    import { bytesToReadable, fileType } from "$lib/utils";
    import { account, dbs, userID } from "$lib/appwrite";
    import { PUBLIC_COLLECTION_ID, PUBLIC_DATABASE_ID } from "$env/static/public";
    import { onMount } from "svelte";
    import { Query } from "appwrite";
    import type { DbFile } from "$lib/schema";

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
            userID.set(null);
            goto("/");
        }).catch((e) => {
            console.log(e);
            loggingOut = false;
        });
    }

    async function getFiles(): Promise<DbFile[]> {
        if ($userID == null) {
            return [] as DbFile[];
        }
        const documents = await dbs.listDocuments(PUBLIC_DATABASE_ID, PUBLIC_COLLECTION_ID, [
            Query.equal("creator", $userID),
        ]);

        console.log(documents.documents);

        return documents.documents as DbFile[];
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
        {#if $userID != null}
        <table>
            <colgroup>
                <col span="1" style="width: 70%;">  
                <col span="1" style="width: 100px;">  
                <col span="1" style="width: 100px;">
                <col span="1" style="width: 100px;">
            </colgroup>
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#await getFiles()}
                Loading files...
                {:then files}
                    {#each files as file}
                    <tr>
                        <td>{file.filename}</td>
                        <td>{fileType(file.type)}</td>
                        <td>{bytesToReadable(file.filesize)}</td>
                        <td class="action">
                            <i class="fa-solid fa-ellipsis"></i>
                        </td>
                    </tr>
                    {/each}
                <tr>
                    <td colspan="2">{files.length ? files.length : "No "} files found</td>
                    <td>
                        {bytesToReadable(files.reduce((acc, file) => acc + file.filesize, 0))}
                    </td>
                </tr>
                {:catch error}
                <tr>
                    <td colspan="3">Error: {error.message}</td>
                </tr>
                {/await}
            </tbody>
        </table>
        {/if}
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

    .action {
        text-align: center;
        cursor: pointer;
        i {
            width: 100%;
            text-align: center;
        }
        &:hover {
            filter: brightness(0.9);
        }
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
            font-size: 0.8rem;
            th, td {
                //border: 1px solid var(--ui-color);
                padding: 10px;
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            // border bottom to tr
            tr {
                border-bottom: 1px solid var(--ui-color);
            }
            th {
                //background: var(--ui-color);
            }
        }
    }

</style>