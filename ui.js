
class UI {
    elements = []
    eid = 0
    getElement(id=this.eid) {
        if (id >= this.elements.length) {
            let element = document.createElement("div")
            this.elements.push(element)
            document.body.appendChild(element)
            this.eid++
            return element
        } else {
            this.eid++
            return this.elements[id]
        }
    }
    endFrame() {
        while (this.elements.length > this.eid) {
            document.body.removeChild(this.elements[this.elements.length-1])
            this.elements.splice(this.elements.length-1, 1)
        }
        this.eid = 0
    }
    rect(x, y, width, height, colour, outlineSize=0, outlineColour=[0,0,0,0]) {
        let element = this.getElement()
        if (element.nodeName != "DIV") {
            let nElement = document.createElement("div")
            document.body.replaceChild(nElement, element)
            element = nElement
            this.elements[this.eid-1] = element
        }

        element.style = ""
        element.style.position = "absolute"
        element.style.margin = 0
        element.style.left = x+"px"
        element.style.top = y+"px"
        element.style.width = width+"px"
        element.style.height = height+"px"
        element.style.backgroundColor = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]})`
        if (outlineSize > 0) {
            element.style.border = `${outlineSize}px solid rgba(${outlineColour[0]}, ${outlineColour[1]}, ${outlineColour[2]}, ${outlineColour[3]})`
        }
    }
}

var ui = new UI()