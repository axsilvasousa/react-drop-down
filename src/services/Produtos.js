import api from "./api"

const Produtos = {
    categorias: async () => {
        let response = await api.get("/categorias")
        return response.data
    },
    fetch: async categoria_id => {
        let url = "/produtos"
        if (typeof categoria_id !== "undefined") {
            url = `${url}?categoria_id=${categoria_id}`
        }
        let response = await api.get(url)
        return response.data
    }
}

export default Produtos
