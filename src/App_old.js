import React from "react"
import "./styles"

const styles = {
    left: {
        width: "250px",
        height: "150px",
        border: "1px solid #DCDCDC",
        float: "left"
    },
    right: {
        width: "250px",
        height: "150px",
        border: "1px solid #DCDCDC",
        float: "left",
        marginLeft: "40px"
    },
    droppable: {
        margin: "0 auto",
        width: "50%",
        marginTop: "80px"
    },
    para: {
        marginRight: "11px",
        border: "1px solid #DCDCDC",
        padding: "12px 16px",
        borderRadius: "50%",
        width: "15px",
        float: "left"
    }
}

class DragDrop extends React.Component {
    state = {
        items: [
            { no: 1, text: "This is text 1" },
            { no: 2, text: "This is text 2" },
            { no: 3, text: "This is text 3" },
            { no: 4, text: "This is text 4" }
        ],
        grade: []
    }

    componentDidMount() {
        let grade = []
        for (let i = 1; i <= 12; i++) {
            grade.push({})
        }
        this.setState({ grade })
    }
    onDragStart = (e, v) => {
        e.dataTransfer.dropEffect = "move"
        e.dataTransfer.setData("text/plain", v)
    }

    allowDrop = ev => {
        ev.preventDefault()
        console.log(ev.target)
    }

    onDrop = e => {
        e.preventDefault()

        let index = e.target.id.replace("item_", "")
        let { grade, items } = this.state
        let data = e.dataTransfer.getData("text/plain")
        data = JSON.parse(data)
        if (index === "exclude") {
            grade.forEach((el, i) => {
                if (el.no === data.no) {
                    grade[i] = {}
                }
            })

            items.push(data)
        } else {
            if (typeof grade[index] !== "undefined") {
                grade.forEach((el, i) => {
                    if (el.no === data.no) {
                        grade[i] = {}
                    }
                })
                items = items.filter(el => el.no !== data.no)
                if (Object.keys(grade[index]).length !== 0) {
                    let retorna = grade[index]
                    grade[index] = data
                    items.push(retorna)
                } else {
                    grade[index] = data
                }
            }
        }
        this.setState({ grade, items })
    }

    renderProdutos() {
        let grade = this.state.grade
        return grade.map((element, i) => {
            if (Object.keys(element).length !== 0) {
                return (
                    <div
                        onDragOver={this.allowDrop}
                        onDrop={this.onDrop}
                        className="item"
                        key={`key_${i}`}
                        id={`item_${i}`}
                    >
                        <div className="produto">
                            <p
                                style={styles.para}
                                draggable="true"
                                onDragStart={e => this.onDragStart(e, JSON.stringify(element))}
                            >
                                {element.no}
                            </p>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div
                        onDragOver={this.allowDrop}
                        onDrop={this.onDrop}
                        className="item"
                        key={`key_${i}`}
                        id={`item_${i}`}
                    ></div>
                )
            }
        })
    }

    render() {
        const { items } = this.state

        return (
            <div>
                <div
                    style={{ marginTop: "35px" }}
                    onDragOver={this.allowDrop}
                    onDrop={this.onDrop}
                    id="item_exclude"
                >
                    Draggable texts : <br />
                    <div style={{ display: "inline-block" }}>
                        {items.map((item, i) => {
                            return (
                                <p
                                    key={`pro_${i}`}
                                    style={styles.para}
                                    draggable="true"
                                    onDragStart={e => this.onDragStart(e, JSON.stringify(item))}
                                >
                                    {item.no}
                                </p>
                            )
                        })}
                    </div>
                </div>

                <div className="grade">{this.renderProdutos()}</div>
            </div>
        )
    }
}

export default DragDrop
