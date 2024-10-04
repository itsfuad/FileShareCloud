<script lang="ts">
    import "$lib/global.scss";
    import "$lib/fontawesome/css/all.min.css";

    import NavigationIndicator from "$lib/NavigationIndicator.svelte";
    import { onMount } from "svelte";
    import { invalidateAll } from "$app/navigation";
    import { account } from "$lib/appwrite";

    onMount(() => {
        try {
            account.client.subscribe(['account', 'files'], (payload) => {
                console.log(payload);
                //invalidateAll();
            });
        } catch (e) {
            console.log(e);
        }
    });

</script>

<svelte:head>
    <title>File share Cloud</title>
</svelte:head>

<NavigationIndicator />

<slot></slot>
