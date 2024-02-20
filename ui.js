
class UI {
    elements = []
    stableElements = {}
    eid = 0
    autoOutline = 4.5
    textOutlines = {}
    font = "sans-serif,serif"
    styleE
    textShadow = {top: 0, bottom: 0, left: 0, right: 0, multiply: 0.5}
    images = {}
    getImg(src) {
        if (src in this.images) {
            return this.images[src]
        } else {
            let img = new Image()
            img.src = src
            this.images[src] = img
            return this.images[src]
        }
    }
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
    getStableId() {
        let id = 0
        while (id in this.stableElements) {
            id++
        }
        return id
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
        document.body.style.overflow = "hidden"
        while (this.elements.length > this.eid) {
            document.body.removeChild(this.elements[this.elements.length-1])
            this.elements.splice(this.elements.length-1, 1)
        }
        this.eid = 0

        for (let id in this.stableElements) {
            this.stableElements[id].visible = this.stableElements[id].drawn
            if (!this.stableElements[id].visible) {
                this.stableElements[id].hide()
            }
        }
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
        var {colour=[255, 255, 255, 1], outlineColour=[0, 0, 0, 1], outlineSize="auto", align="left", doShadow=true, wrap=-1, selectable=true} = options
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
            oElement.style.top = y-size/2+"px"
            oElement.style.userSelect = "none"
            oElement.style.webkitUserSelect = "none"
            oElement.style.mozUserSelect = "none"
            oElement.style.msUserSelect = "none"
            oElement.style.pointerEvents = "none"
            oElement.style.textAlign = align
            if (align == "center") {
                oElement.style.transform = "translate(-50%, 0)"
            }
            if (align == "right") {
                oElement.style.transform = "translate(-100%, 0)"
            }
            oElement.style.color = `rgba(${outlineColour[0]}, ${outlineColour[1]}, ${outlineColour[2]}, ${outlineColour[3]})`
            oElement.style.font = `${size}px ${this.font}`
            oElement.style.webkitTextStroke = `${outlineSize}px rgba(${outlineColour[0]}, ${outlineColour[1]}, ${outlineColour[2]}, ${outlineColour[3]})`
            if (wrap != -1) {
                oElement.style.maxWidth = wrap+"px"
            } else {
                oElement.style.whiteSpace = "nowrap"
            }
            oElement.innerHTML = text
        }

        if (doShadow) {
            let dirs = ["top", "bottom", "left", "right"]
            for (let dir of dirs) {
                if (this.textShadow[dir] != 0) {
                    let amt = this.textShadow[dir]
                    if (this.textShadow[dir] == "auto") amt = outlineSize/3
                    if (dir == "bottom") {
                        ui.text(x, y+amt, size, text, {...options, colour: [colour[0]*this.textShadow.multiply, colour[1]*this.textShadow.multiply, colour[2]*this.textShadow.multiply, colour[3]], doShadow: false, selectable: false})
                    }
                }
            }
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
        if (!selectable) {
            element.style.userSelect = "none"
            element.style.webkitUserSelect = "none"
            element.style.mozUserSelect = "none"
            element.style.msUserSelect = "none"
            element.style.pointerEvents = "none"
        }
        element.style.left = x+"px"
        element.style.top = y-size/2+"px"
        element.style.textAlign = align
        if (align == "center") {
            element.style.transform = "translate(-50%, 0)"
        }
        if (align == "right") {
            element.style.transform = "translate(-100%, 0)"
        }
        element.style.color = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]})`
        element.style.font = `${size}px ${this.font}`
        element.style.webkitFontSmoothing = "antialiased"
        if (wrap != -1) {
            element.style.maxWidth = wrap+"px"
        } else {
            element.style.whiteSpace = "nowrap"
        }
        element.innerHTML = text
    }
    img(x, y, width, height, src, clip="none") {
        let img
        if (clip != "none") img = this.getImg(src)
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
        element.style.left = x-width/2+"px"
        element.style.top = y-height/2+"px"
        element.style.width = width+"px"
        element.style.height = height+"px"
        element.style.backgroundImage = `url(${src})`
        element.style.imageRendering = "pixelated"
        element.style.backgroundSize = "100% 100%"
        if (clip != "none") {
            element.style.backgroundPosition = `${clip[0]/(img.width-clip[2])*100}% ${clip[1]/(img.height-clip[3])*100}%`
            element.style.backgroundSize = `${img.width/clip[2]*100}% ${img.height/clip[3]*100}%`
            element.style.backgroundRepeat = "no-repeat"
        }
    }
}

var ui = new UI()