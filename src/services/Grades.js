import api from "./api"

const Grades = {
    update: async (grade_id, produto) => {
        let response = await api.put(`/grade/${grade_id}`, { produto })
        return response.data
    },
    fetch: async () => {
        let response = await api.get("/grade")
        return response.data
    }
}
export default Grades
