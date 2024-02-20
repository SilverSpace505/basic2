
class UI {
    elements = []
    eid = 0
    autoOutline = 4.5
    textOutlines = {}
    font = "sans-serif,serif"
    styleE
    setFont(font, path) {
        this.font = font
        if (font.includes("custom")) {
            if (this.styleE) document.head.removeChild(this.styleE)
            this.styleE = document.createElement("style")
            this.styleE.appendChild(document.createTextNode(""))
            this.styleE.innerHTML = `
                @font-face {
                    font-family: custom;
                    src: url("${path}");
                }
            `
            document.head.appendChild(this.styleE)
        }
    }
    getTextOutline(size, colour) {
        size = Math.round(size*100)/100
        // https://stackoverflow.com/questions/4919076/outline-effect-to-text
        let id = [size, ...colour].join(",")
        if (id in this.textOutlines) {
            return this.textOutlines[id]
        } else {
            let textShadow = ""
            for (let i = 0; i < 10; i++) {
                textShadow += `0 0 ${size}px black,`
            }
            // let outlineSize2 = Math.floor(size)
            // let dif = size-outlineSize2
            // for (let angle = 0; angle < Math.PI*2; angle += Math.PI*2/8) {
            //     textShadow += `${Math.sin(angle)*(size)}px ${Math.cos(angle)*(size)}px ${size/2}px black,`
            //     for (let  i = 0; i < outlineSize2; i++) {
                    
            //     }
            // }
            textShadow = textShadow.substring(0, textShadow.length-1)
            this.textOutlines[id] = textShadow
            return textShadow
        }
    }
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
    text(x, y, size, text, options={}) {
        var {colour=[255, 255, 255, 1], outlineColour=[0, 0, 0, 1], outlineSize="auto"} = options
        if (outlineSize == "auto") {
            outlineSize = size/this.autoOutline
        }

        if (outlineSize > 0) {
            let oElement = this.getElement()
            if (oElement.nodeName != "P") {
                let nElement = document.createElement("p")
                document.body.replaceChild(nElement, oElement)
                oElement = nElement
                this.elements[this.eid-1] = oElement
            }

            oElement.style = ""
            oElement.style.position = "absolute"
            oElement.style.margin = 0
            oElement.style.left = x+"px"
            oElement.style.top = y+"px"
            oElement.style.color = "black"
            oElement.style.font = `${size}px ${this.font}`
            oElement.style.webkitTextStroke = `${outlineSize}px black`
            oElement.innerHTML = text
        }


        let element = this.getElement()
        if (element.nodeName != "P") {
            let nElement = document.createElement("p")
            document.body.replaceChild(nElement, element)
            element = nElement
            this.elements[this.eid-1] = element
        }

        element.style = ""
        element.style.position = "absolute"
        element.style.margin = 0
        
        element.style.left = x+"px"
        element.style.top = y+"px"
        element.style.color = "white"
        element.style.font = `${size}px ${this.font}`
        element.style.webkitFontSmoothing = "antialiased"
        element.style.textShadow = "0 5px 0 grey"
        // element.style.webkitTextStroke = `${outlineSize}px black`
        // element.style.webkitTextFillColor = "transparent"
        element.innerHTML = text
    }
}

var ui = new UI()