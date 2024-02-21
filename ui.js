
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
    eorder = 0
    page
    setup() {
        document.body.style.overflow = "hidden"
        this.page = document.getElementById("page")
    }
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
            this.page.appendChild(element)
            this.eid++
            return element
        } else {
            this.eid++
            return this.elements[id]
        }
    }
    getOrder() {
        this.eorder++
        return (this.eorder - 1)
    }
    endFrame() {
        this.eorder = 0
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
        // let list = Array.from(this.page.children)
        // let orders = []
        // for (let node of list) {
        //     orders.push(node.order)
        // }
        // list = list.sort((a, b) => a.order.toString() - b.order.toString())
        // for (let i = 0; i < list.length; i++) {
        //     this.page.appendChild(list[i])
        // }
    }
    rect(x, y, width, height, colour, outlineSize=0, outlineColour=[0,0,0,0]) {
        let element = this.getElement()
        if (element.nodeName != "DIV") {
            let nElement = document.createElement("div")
            ui.page.replaceChild(nElement, element)
            element = nElement
            this.elements[this.eid-1] = element
        }

        element.style = ""
        element.style.zIndex = this.getOrder()
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
                ui.page.replaceChild(nElement, oElement)
                oElement = nElement
                this.elements[this.eid-1] = oElement
            }

            oElement.style = ""
            oElement.style.zIndex = this.getOrder()
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
            ui.page.replaceChild(nElement, element)
            element = nElement
            this.elements[this.eid-1] = element
        }

        element.style = ""
        element.style.zIndex = this.getOrder()
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
            ui.page.replaceChild(nElement, element)
            element = nElement
            this.elements[this.eid-1] = element
        }

        element.style = ""
        element.style.zIndex = this.getOrder()
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

    get Object2D() {
        return class {
            x
            y
            width
            height
            constructor(x=0, y=0, width=0, height=0) {
                this.x = x
                this.y = y
                this.width = width
                this.height = height
            }
            set(x, y, width, height) {
                this.x = x
                this.y = y
                this.width = width
                this.height = height
            }
            collidingRect(rect) {
                return (
                    this.x+this.width/2 > rect.x-rect.width/2 &&
                    this.x-this.width/2 < rect.x+rect.width/2 &&
                    this.y+this.height/2 > rect.y-rect.height/2 &&
                    this.y-this.height/2 < rect.y+rect.height/2
                )
            }
            hasPoint(x, y) {
                return (
                    x > this.x-this.width/2 && x < this.x+this.width/2 &&
                    y > this.y-this.height/2 && y < this.y+this.height/2
                )
            }
        }
    }

    get TextBox() {
        return class extends ui.Object2D {
            text = ""
            placeholder = ""
            colour = [0, 0, 0, 1]
            outlineColour = [0, 0, 0, 1]
            element
            visible = false
            textColour = [255, 255, 255, 1]
            textOutlineColour = [0, 0, 0, 1]
            textOutlineSize = "auto"
            outlineSize = 0
            lastPos = [1, 0]
            constructor(placeholder="", colour=[150, 150, 150, 1]) {
                super()
                this.placeholder = placeholder
                this.colour = colour
                this.element = document.createElement("input")
                this.element.style.display = "none"
                ui.page.appendChild(this.element)
            }
            draw() {

                let element = ui.getElement()
                if (element.nodeName != "INPUT") {
                    let nElement = document.createElement("input")
                    ui.page.replaceChild(nElement, element)
                    element = nElement
                    ui.elements[ui.eid-1] = element
                }
                element.spellcheck = false
                element.style = ""
                element.style.zIndex = ui.getOrder()
                element.style.position = "absolute"
                element.style.margin = 0
                element.style.left = this.x+"px"
                element.style.top = this.y+"px"
                element.style.width = this.width+"px"
                element.style.height = this.height+"px"
                element.style.pointerEvents = "none"
                element.style.backgroundColor = `rgba(${this.colour[0]}, ${this.colour[1]}, ${this.colour[2]}, ${this.colour[3]})`
                element.style.boxSizing = "border-box"
                
                element.value = this.element.value
                element.style.font = `${this.height*0.6}px ${ui.font}`
                element.style.lineHeight = 2             
                element.style.border = `${this.outlineSize}px solid black`
                
                element.style.color = `rgba(${this.textOutlineColour[0]}, ${this.textOutlineColour[1]}, ${this.textOutlineColour[2]}, ${this.textOutlineColour[3]})`
                let outlineSize = this.textOutlineSize
                if (this.textOutlineSize == "auto") {
                    outlineSize = this.height*0.6/ui.autoOutline
                }
                // element.style.paddingLeft = this.height*0.6/5+"px"
                element.scrollLeft = this.element.scrollLeft
                element.style.webkitTextStroke = `${outlineSize}px rgba(${this.textOutlineColour[0]}, ${this.textOutlineColour[1]}, ${this.textOutlineColour[2]}, ${this.textOutlineColour[3]})`

                this.visible = true
                this.element.spellcheck = false
                this.element.style = ""
                this.element.style.zIndex = ui.getOrder()
                this.element.style.display = ""
                this.element.style.left = this.x+"px"
                this.element.style.top = this.y+"px"
                this.element.style.width = this.width+"px"
                this.element.style.height = this.height+"px"
                this.element.width = this.width
                this.element.height = this.height
                this.element.style.position = "absolute"
                this.element.style.margin = 0
                // this.element.style.paddingLeft = this.height*0.6/5+"px"
                this.element.style.font = `${this.height*0.6}px ${ui.font}`
                // this.element.style.outline = "none"
                
                this.element.style.boxSizing = "border-box"
                this.element.style.border = `${this.outlineSize}px solid black`
                this.element.style.backgroundColor = "rgba(0, 0, 0, 0)"
                
                this.element.style.color = `rgba(${this.textColour[0]}, ${this.textColour[1]}, ${this.textColour[2]}, ${this.textColour[3]})`               
                
            }
        }
    }
}

var ui = new UI()