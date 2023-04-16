<template>
    <div class="min-h-screen max-h-screen bg-slate-700 text-white grid p-20 grid-flow-row grid-rows-2">
        <div class="mx-auto">
            <p class="font-black text-4xl md:text-5xl">URL SHORTNER</p>
            <br />
            <p class="text-center"><a :href="urlFromServer!=='Error! URL already in use' ? urlFromServer : '#'" >{{ urlFromServer }}</a></p>
        </div>
        <form class="mx-auto" @submit.prevent="formRequest">
            <label style="max-width: 384px;" class=" overflow-x-auto inline-block">{{ test(urlName) }}</label>
            <br class="hidden" id="break-remove"/>
            <label class="hidden text-red-400" id="label-remove" style="max-width: 384px;">Already in use</label>
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

const formRequest = async() => {
    try {
        const data = await $fetch('/api/create', {
            method: 'POST',
            body: {
                slug: urlName.value,
                url: link.value
            }
        })
        // console.log(data.body.slug)
        if(data) {
            urlFromServer.value = `${window.location.href}${data.body.slug}`
            urlName.value = ""
            link.value = ""
        }
    } catch (error) {
        urlFromServer.value = "Error! Something went wrong."
        // urlFromServer.value = "Error! URL already in use"
    }
}

await useFetch(`/api/check`, {
    method: 'POST',
    body: {
        'slug': urlName
    },
    watch: [urlName],
    onResponse(request, response, options) {
        if(request.response._data.used) {

        }
        if(request.response._data.used) {
            document.getElementById('break-remove').classList.remove('hidden')
            document.getElementById('label-remove').classList.remove('hidden')
        } 
        else {
            if(!document.getElementById('break-remove').classList.contains('hidden')) {
                document.getElementById('break-remove').classList.add('hidden')
            }
            if(!document.getElementById('label-remove').classList.contains('hidden')) {
                document.getElementById('label-remove').classList.add('hidden')
            }
        }
    }
})

</script>