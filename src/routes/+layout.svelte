<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";

    import NavigationIndicator from "$lib/NavigationIndicator.svelte";
    import { onMount } from "svelte";
    import { invalidateAll } from "$app/navigation";
    import { account, userID } from "$lib/appwrite";

    let loaded = false;

    onMount(async () => {
        try {
            const user = await account.get();
            console.log(user);
            userID.set(user.$id);
            account.client.subscribe(['account', 'files'], (payload) => {
                console.log(payload);
                //invalidateAll();
            });
        } catch (e) {
            console.log(e);
        } finally {
            loaded = true;
        }
    });

</script>

<svelte:head>
    <title>File Basket</title>
</svelte:head>

{#if loaded}
<NavigationIndicator />
<slot></slot>
{/if}