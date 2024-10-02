
<script lang="ts">

    import { showToastMessage } from "@itsfuad/domtoastmessage";
    import QR from "qrcode";

    import { storage, id, account } from "$lib/appwrite";
    
    import { PUBLIC_BUCKET_ID } from '$env/static/public';
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import { bytesToReadable } from "$lib/utils";
    import { Permission, Role } from "appwrite";

    let fileInput: FileList | null;
    let fileInputElement: HTMLInputElement;

    let qrURL = "";

    let uploadprogress = 0;

    let DownloadID = "";

    let fileToDonwloadInput: string = "";

    let isDraggingOver = false;

    let uploadStatus: 'idle' | 'uploading' = 'idle';

    let tab: 'upload' | 'download' = 'upload';

    async function uploadFile() {
        if (!fileInput) {
            return;
        }

        uploadStatus = 'uploading';

        const result = await storage.createFile(PUBLIC_BUCKET_ID, id.unique(), fileInput[0], [
            Permission.read(Role.any()),
            Permission.delete(Role.user('markedFerry1'))
        ], (progress) => {
            console.log(progress);
            uploadprogress = progress.progress;
        });
        clearInput();
        qrURL = await QR.toDataURL(`${window.location.origin}/d/${result.$id}`);
        console.log(result.$id);
        DownloadID = result.$id;
        uploadStatus = 'idle';
        uploadprogress = 0;
    }

    function changeHandler(event: Event) {
        if (!event.target) {
            return;
        }

        const target = event.target as HTMLInputElement;
        if (!target.files) {
            return;
        }

        fileInput = target.files;
    }

    function clearInput() {
        fileInputElement.value = "";
        fileInputElement.dispatchEvent(new Event('change'));
        fileInput = null;
        uploadStatus = 'idle';
        uploadprogress = 0;
    }


    let dragTimeout: number | NodeJS.Timeout;

    function dragHandle(node: HTMLElement) {

        node.ondragover = (event) => {
            event.preventDefault();
            if (uploadStatus == 'uploading') {
                return;
            }
            isDraggingOver = true;
        }

        node.ondragleave = (event) => {
            event.preventDefault();
            if (dragTimeout) {
                clearTimeout(dragTimeout);
            }

            dragTimeout = setTimeout(() => {
                isDraggingOver = false;
            }, 400);
        }

        node.ondragleave = (event) => {
            event.preventDefault();
            isDraggingOver = false;
        }

        node.ondrop = (event) => {
            event.preventDefault();
            isDraggingOver = false;
            if (uploadStatus == 'uploading') {
                return;
            }
            if (!event.dataTransfer) {
                return;
            }

            if (!event.dataTransfer.files) {
                return;
            }

            fileInputElement.files = event.dataTransfer.files;
            fileInputElement.dispatchEvent(new Event('change'));
        }

        return {
            destroy() {
                node.ondragover = null;
                node.ondragleave = null;
                node.ondragleave = null;
                node.ondrop = null;
                isDraggingOver = false;
            }
        }
    }

    storage.listFiles(PUBLIC_BUCKET_ID).then(console.log);

</script>

<svelte:head>
    <title>File share Cloud | Upload</title>
</svelte:head>

<div class="tabContainer" in:fly|global={{y: 5}}>
    <div class="tab">
        <button class:selectedTab={tab == 'upload'} on:click={() => {tab = 'upload'}}>
            Upload
        </button>
        <button class:selectedTab={tab == 'download'} on:click={() => {tab = 'download'}}>
            Download
        </button>
    </div>
    {#if tab == 'upload'}
    <div class="upload">
        {#if !DownloadID}
        <div class="title title-head" in:fly|global={{x: 5, delay: 100}}>
            <h2>
            {#if uploadStatus == 'idle'}
                {#if fileInput && fileInput?.length > 0}
                    {fileInput.length} file(s) selected
                {:else}
                    Upload files to cloud <i class="fa-solid fa-cloud"></i>
                {/if}
            {:else}
                Uploading <i class="fa-solid fa-cloud-arrow-up fa-bounce"></i>
            {/if}
            </h2>
        </div>
        <div class="formfield" in:fly|global={{y: 5, delay: 150}}>
            <form on:submit|preventDefault> 
                <div use:dragHandle class="drop" class:hasFile={fileInput?.length} class:uploading={uploadStatus == "uploading"} class:active={isDraggingOver} style="--progress: {uploadprogress}%">
                    <label>
                        <input style="display: none;" type="file" id="file" name="file"
                            disabled={uploadStatus == 'uploading'}
                            on:change={changeHandler}
                            bind:this={fileInputElement}
                        />
                        <div class="name">
                            {#if !fileInput}
                                Click to select file(s) or drop here.
                            {:else}
                                <div class="filename">
                                    {fileInput[0].name}
                                </div>
                                <div class="size">
                                    Size: {bytesToReadable(fileInput[0].size)}
                                </div>
                            {/if}
                        </div>
                    </label>
                </div>
                {#if fileInput && fileInput?.length > 0}
                <div class="btnGrp">
                    <button in:fly|global={{y: 5}} class="cancel btn" on:click={clearInput}>
                        Cancel
                    </button>
                    <button in:fly|global={{y: 5, delay: 50}} class="btn" disabled={uploadStatus == 'uploading'} on:click={uploadFile}>
                        Upload <i class="fa-solid fa-cloud-arrow-up"></i>
                    </button>
                </div>
                {/if}
            </form>
        </div>
        {:else}
            <div class="downloadOptions">
                <div class="qr">
                    <div class="title" in:fly|global={{x: 5}}>Scan this QR code</div>
                    <img in:fly|global={{y: 5, delay: 100}} src="{qrURL}" alt="QR-code">
                    <div class="or">
                        or
                    </div>
                    <div class="copyWrapper" in:fly|global={{y: 5, delay: 120}}>
                        Copy id: <button class="copy btn"
                            on:click={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/d/${DownloadID}`);
                                showToastMessage("Copied to clipboard");
                            }}
                        >{window.location.origin}/d/{DownloadID}</button>
                    </div>
                </div>
                <button in:fly|global={{y: 5, delay: 150}} class="close btn" on:click={() => {
                    DownloadID = "";
                }}>
                    Close
                </button>
            </div>
        {/if}
    </div>
    {:else}
    <div class="download">
        <div class="title" in:fly|global={{x: 5}}>
            <h2>Generate download link <i class="fa-solid fa-gear"></i></h2>
        </div>
        <div in:fly|global={{y: 5, delay: 100}} class="formfield animated">
            <input placeholder="enter id here" autocomplete="off" type="text" id="fileToDownload" name="fileToDownload" bind:value={fileToDonwloadInput}/>
            <label for="fileToDownload">File id</label>
        </div>
        <button in:fly|global={{y: 5, delay: 150}} class="btn" on:click={() => {
            if (fileToDonwloadInput == "") {
                return;
            }
            goto(`/d/${fileToDonwloadInput}`);
        }} disabled={fileToDonwloadInput == ""}>
            Generate
        </button>
    </div>
    {/if}
</div>

<style lang="scss">

    .tabContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: var(--ui-color);
        border-radius: 12px;
        overflow: hidden;
        max-width: 95vw;
        width: min(400px, 95vw);
        min-height: 340px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .filename {
        text-align: left;
        color: var(--text-color);
    }

    .size {
        color: var(--accent);
        text-align: left;
    }

    .tab {
        width: 100%;
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid var(--border-color);
        button {
            padding: 10px;
            color: white;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            &.selectedTab {
                background: var(--accent);
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 20px 0 0 0;
        gap: 10px;
        label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            min-height: 50px;
            height: 100%;
        }
    }

    form:not(:has(.btnGrp)) {
        margin-bottom: 50px;
    }

    .name{
        font-size: 0.8rem;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        padding: 0 15px;
    }

    .drop {
        border: 2px dashed var(--transparent-white);
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 95%;
        color: var(--transparent-white);
        width: 100%;
        height: 150px;
        position: relative;
        transform-origin: center;
        transition: 200ms ease-in-out;
        overflow: hidden;
        &.active {
            height: 200px;
            border-color: var(--accent);
        }
        &.uploading, &.hasFile {
            border-style: solid;
            height: 50px;
            border-color: var(--border-color);
        }
        &::after{
            content: '';
            position: absolute;
            width: var(--progress);
            height: 100%;
            top: 0;
            left: 0;
            background: #ffffff0f;
        }
    }

    .upload, .download {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        gap: 10px;
        min-height: inherit;
    }

    .download {
        gap: 15px;
    }

    .copyWrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
        font-size: 0.9rem;
    }

    .title {
        font-size: 1.1rem;
        font-weight: bold;
        padding-bottom: 5px;
    }

    .formfield {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    label {
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
    }

    input {
        padding: 10px;
        background: transparent;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        outline: none;
        caret-color: var(--text-color);
        color: var(--text-color);
        width: 100%;
        max-width: 95%;
        height: 46px;
    }

    .downloadOptions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 25px 0;
    }

    .qr {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .or {
        font-size: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 10px;
        color: var(--transparent-white);
        &::before, &::after {
            content: "";
            display: block;
            width: 50px;
            height: 2px;
            background: var(--transparent-white);
            margin: 0.5rem 0;
        }
    }

    .copy {
        font-size: 1rem;
        background: var(--transparent-black);
        padding: 3px 10px;
        border-radius: 5px;
    }
</style>