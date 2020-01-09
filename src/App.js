import React from "react"
import "./styles"
import ProdutoService from "./services/Produtos"
import GradeService from "./services/Grades"

class DragDrop extends React.Component {
    state = {
        produtos: [],
        categorias: [],
        grades: [],
        escolhidos: []
    }

    async componentDidMount() {
        await this.getGrades()
        let categorias = await ProdutoService.categorias()
        let produtos = await ProdutoService.fetch()
        console.log(this.state.escolhidos)
        this.setState({ produtos, categorias })
    }

    async getGrades() {
        let escolhidos = []
        let grades = await GradeService.fetch()
        grades.forEach(element => {
            console.log("grade", element.produto.id)
            escolhidos.push(element.produto.id)
        })
        this.setState({ grades, escolhidos })
    }
    async getProdutos(id) {
        await this.getGrades()
        let { escolhidos } = this.state
        let produtos = await ProdutoService.fetch(id || undefined)
        produtos = produtos.filter(produto => {
            console.log(produto, escolhidos)
            return escolhidos.includes(produto.id) === false
        })
        this.setState({ produtos })
    }

    onDragStart = (e, v) => {
        e.dataTransfer.dropEffect = "move"
        e.dataTransfer.setData("text/plain", v)
    }

    allowDrop = ev => {
        ev.preventDefault()
        console.log(ev.target)
    }

    onDrop = async e => {
        e.preventDefault()
        let { grades, produtos } = this.state
        let grade_id = e.target.id.replace("item_", "")
        if (grade_id) {
            let data = e.dataTransfer.getData("text/plain")
            data = JSON.parse(data)

            let check = grades.find(element => element.produto.id === data.id)
            if (check !== undefined) {
                await GradeService.update(check.id, "")
            }
            produtos = produtos.filter(element => element.id !== data.id)

            await GradeService.update(grade_id, data)
            grades = await GradeService.fetch()
            this.setState({ grades, produtos })
        }
    }

    renderGrades() {
        let { grades } = this.state
        return grades.map(grade => {
            return (
                <div
                    className="item"
                    key={`item_${grade.id}`}
                    id={`item_${grade.id}`}
                    onDragOver={this.allowDrop}
                    onDrop={this.onDrop}
                >
                    {grade.produto ? (
                        <div
                            className="produtos-item"
                            key={`pro_${grade.produto.id}`}
                            draggable="true"
                            onDragStart={e => this.onDragStart(e, JSON.stringify(grade.produto))}
                        >
                            {grade.produto.descricao}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )
        })
    }
    renderCategorias() {
        let { categorias } = this.state
        return categorias.map(cat => {
            return (
                <option key={`opt_${cat.id}`} value={cat.id}>
                    {cat.descricao}
                </option>
            )
        })
    }

    renderProdutos() {
        let { produtos } = this.state
        return produtos.map(produto => {
            return (
                <div
                    className="produtos-item"
                    key={`pro_${produto.id}`}
                    draggable="true"
                    onDragStart={e => this.onDragStart(e, JSON.stringify(produto))}
                >
                    {produto.descricao}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="title-page">Drop & Down</h1>
                <div>
                    <div className="produtos">
                        <p>Selecione a categoria</p>
                        <div className="clear5"></div>

                        <div className="select">
                            <select onChange={v => this.getProdutos(v.target.value)}>
                                <option value="">Todos</option>
                                {this.renderCategorias()}
                            </select>
                        </div>
                        <div className="clear15"></div>
                        <div className="produtos_wrap">
                            <div className="produtos_scrol">{this.renderProdutos()}</div>
                        </div>
                    </div>
                    <div className="grade">{this.renderGrades()}</div>
                </div>
            </div>
        )
    }
}

export default DragDrop
