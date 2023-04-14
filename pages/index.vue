<template>
    <div class="min-h-screen max-h-screen bg-slate-700 text-white grid p-20 grid-flow-row grid-rows-2">
        <div class="mx-auto">
            <p class="font-black text-4xl md:text-5xl">URL SHORTNER</p>
            <br />
            <p>{{ urlFromServer }}</p>
        </div>
        <form class="mx-auto">
            <label style="max-width: 384px;" class=" overflow-x-auto inline-block">{{ test(urlName) }}</label>
            <br />
            <input type="text" placeholder="Enter shortened name" v-model="urlName" class="p-2 w-96 my-5 text-black" required/>
            <br />
            <label style="max-width: 384px;" class=" overflow-x-auto inline-block">Link: {{ link }}</label>
            <br />
            <input type="url" placeholder="Enter website url" v-model="link" class="p-2 w-96 my-5 text-black" required/>
            <br />
            <input type="submit" value="Create" class=" bg-red-950 p-3 px-5 cursor-pointer hover:bg-red-800"/>
        </form>
    </div>
</template>
<script setup>
const urlName = ref("")
const link = ref("")
const urlFromServer = ref("")

const test = (urlName) => {
    if(!urlName) {
        return "Enter a url name."
    }
    else if(!/^[A-Za-z0-9\-\_\s]+$/.test(urlName)) {
        return "ERROR Enter valid url name."
    }
    else {
        return (window.location.href + urlName.replaceAll(" ", "-"))
    }
}
</script>