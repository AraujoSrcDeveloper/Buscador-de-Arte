
function GerarImagem(url){
    const imagem = `
        <div class="img-c">
            <img src=${url}>
        </div>
    `
    return imagem
}

async function BuscarObras(id){
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    const resposta = await fetch(url)
    const data = await resposta.json()
    return data
}


async function BuscarArtistas(nome){
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${nome}`
    const resposta = await fetch(url)
    const data = await resposta.json()
    return data
}


window.onload = () => {
    const butao = document.getElementById("Button")
    const container = document.getElementById("image-container")

    butao.addEventListener("click", async (e) => {
        e.preventDefault()
        const input = document.getElementById("txt")
        const data = await BuscarArtistas(input.value)
        const idObras = data.objectIDs

        container.innerHTML = ' '
        for(let i = 0; i <=20; i++){
            const Obras = await BuscarObras(idObras[i])
            console.log(Obras)
            container.innerHTML += GerarImagem(Obras.primaryImage)
        }

        console.log(data)
    })

}