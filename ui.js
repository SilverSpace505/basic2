
class UI {
    elements = []
    stableElements = {}
    eid = 0
    autoOutline = 4.5
    textOutlines = {}
    font = "sans-serif,serif"
    styleE
    textShadow = {top: 0, bottom: 0, left: 0, right: 0, colour: "auto", multiply: 0.5}
    images = {}
    eorder = 0
    page
    parent
    customFonts = []
    setup() {
        document.body.style.overflow = "hidden"
        this.page = document.getElementById("page")
        this.parent = this.page
        this.addStyle(`
            input::selection {
                background-color: rgba(0,150,255,0.25);
            }
        `)
        let viewportMeta = document.createElement("meta")
        viewportMeta.name = "viewport"
        viewportMeta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        document.head.appendChild(viewportMeta)
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
    addStyle(style) {
        var element = document.createElement("style")
        element.appendChild(document.createTextNode(style))
        document.head.appendChild(element)
    }
    setFont(font, path) {
        this.font = font
        if (font.includes("custom") && !this.customFonts.includes(font)) {
            this.customFonts.push(font)
            // if (this.styleE) document.head.removeChild(this.styleE)
            this.styleE = document.createElement("style")
            this.styleE.appendChild(document.createTextNode(""))
            this.styleE.innerHTML = `
                @font-face {
                    font-family: ${font};
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
            this.parent.appendChild(element)
            this.eid++
            return element
        } else {
            this.eid++
            return this.elements[id]
        }
    }
    getElement2(type="DIV", id=this.eid) {
        let element = this.getElement(id)
        if (element.nodeName != type) {
            let nElement = document.createElement(type.toLowerCase())
            element.parentNode.removeChild(element)
            ui.parent.appendChild(nElement)
            element = nElement
            this.elements[this.eid-1] = element
        }
        if (element.parentNode != this.parent) {
            this.parent.appendChild(element)
        }
        return element
    }
    getOrder() {
        this.eorder++
        return (this.eorder - 1)
    }
    startFrame() {
        document.body.style.zoom = "100%"
        window.scrollTo(0, 0)
    }
    endFrame() {
        this.eorder = 0
        document.body.style.overflow = "hidden"
        while (this.elements.length > this.eid) {
            if (this.elements[this.elements.length-1].parentNode) {
                this.elements[this.elements.length-1].parentNode.removeChild(this.elements[this.elements.length-1])
            }
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
    rect(x, y, width, height, colour, outlineSize=0, outlineColour=[0,0,0,0], round=0) {
        let element = this.getElement2("DIV")

        element.style = ""
        element.style.zIndex = this.getOrder()
        element.style.position = "absolute"
        element.style.margin = 0
        element.style.left = x-width/2-outlineSize/2+"px"
        element.style.top = y-height/2-outlineSize/2+"px"
        element.style.width = width+"px"
        element.style.height = height+"px"
        element.style.backgroundColor = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]})`
        element.style.borderRadius = round+"px"
        if (outlineSize > 0) {
            element.style.border = `${outlineSize}px solid rgba(${outlineColour[0]}, ${outlineColour[1]}, ${outlineColour[2]}, ${outlineColour[3]})`
        }
        return element
    }
    text(x, y, size, text, options={}) {
        var {colour=[255, 255, 255, 1], outlineColour=[0, 0, 0, 1], outlineSize="auto", align="left", doShadow=true, wrap=-1, selectable=true} = options
        if (outlineSize == "auto") {
            outlineSize = size/this.autoOutline
        }

        if (outlineSize > 0) {
            let oElement = this.getElement2("P")

            oElement.style = ""
            oElement.style.zIndex = this.getOrder()
            oElement.style.position = "absolute"
            oElement.style.margin = 0
            oElement.style.left = x+"px"
            oElement.style.top = y-size/2+"px"
            oElement.style.userSelect = "none"
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
            let colour2 = this.textShadow.colour
            if (colour2 == "auto") colour2 = colour
            for (let dir of dirs) {
                if (this.textShadow[dir] != 0) {
                    let amt = this.textShadow[dir]
                    if (this.textShadow[dir] == "auto") amt = outlineSize/3
                    if (dir == "bottom") {
                        ui.text(x, y+amt, size, text, {...options, colour: [colour2[0]*this.textShadow.multiply, colour2[1]*this.textShadow.multiply, colour2[2]*this.textShadow.multiply, colour2[3]], doShadow: false, selectable: false})
                    }
                }
            }
        }

        let element = this.getElement2("P")

        element.style = ""
        element.style.zIndex = this.getOrder()
        element.style.position = "absolute"
        element.style.margin = 0
        if (!selectable) {
            element.style.userSelect = "none"
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

        return element
    }
    img(x, y, width, height, src, clip="none") {
        let img
        if (clip != "none") img = this.getImg(src)
        let element = this.getElement2("DIV")

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

        return element
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

    get Button() {
        return class extends ui.Object2D {
            colour = [0, 0, 0, 0]
            text = ""
            type = "text"
            visible = false
            constructor(type, text, colour) {
                super()
                this.type = type
                this.text = text
                this.colour = colour
                this.element = document.createElement("button")
                this.element.style.display = "none"
                ui.parent.appendChild(this.element)
            }
            draw() {
                this.visible = true
                this.element.style = ""
                this.element.style.left = this.x+"px"
                this.element.style.top = this.y+"px"
                this.element.style.width = this.width+"px"
                this.element.style.height = this.height+"px"
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
            focused = false
            spos = {x: 0, y: 0}
            epos = {x: 0, y: 0}
            flashTime = 0
            lastPos = ""
            scrollLeft = 0
            scrollLeftT = 0
            constructor(placeholder="", colour=[150, 150, 150, 1]) {
                super()
                this.placeholder = placeholder
                this.colour = colour
                this.element = document.createElement("input")
                this.element.style.display = "none"
                ui.parent.appendChild(this.element)
            }
            drawText(i, off, colour) {
                let element = ui.getElement2("DIV")
                element.style = ""
                element.style.zIndex = ui.getOrder()
                element.style.position = "absolute"
                element.style.margin = 0
                element.style.left = this.x-this.width/2+"px"
                element.style.top = this.y-this.height/2+"px"
                element.style.width = this.width+"px"
                element.style.height = this.height+"px"
                element.style.pointerEvents = "none"
                if (i == 0) element.style.backgroundColor = `rgba(${this.colour[0]}, ${this.colour[1]}, ${this.colour[2]}, ${this.colour[3]})`
                element.style.boxSizing = "border-box"
                element.style.display = "flex"
                element.style.alignItems = "center"
                element.style.userSelect = "none"
                element.style.mozUserSelect = "none"
                element.style.msUserSelect = "none"
                
                element.textContent = this.element.value
                if (this.element.value == "") {
                    element.textContent = this.placeholder
                }
                element.style.font = `${this.height*0.6}px ${ui.font}`
                
                element.style.border = `${this.outlineSize}px solid rgba(0,0,0,0)`
                if (i == 1) element.style.border = `${this.outlineSize}px solid rgba(${this.outlineColour[0]}, ${this.outlineColour[1]}, ${this.outlineColour[2]}, ${this.outlineColour[3]})`
                element.style.borderRadius = this.outlineSize*2+"px"
                element.style.paddingTop = off[1]*2+"px"
                element.style.paddingLeft = this.outlineSize+off[0]*2+"px"
                element.style.whiteSpace = "pre"
                element.style.overflow = "hidden"
                
                if (i == 0) {
                    element.style.color = `rgba(${this.textOutlineColour[0]}, ${this.textOutlineColour[1]}, ${this.textOutlineColour[2]}, ${this.textOutlineColour[3]})`
                } else {
                    if (this.element.value == "") {
                        element.style.color = `rgba(${colour[0]/2}, ${colour[1]/2}, ${colour[2]/2}, ${colour[3]})`
                    } else {
                        element.style.color = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${colour[3]})`
                    }
                }
                
                let outlineSize = this.textOutlineSize
                if (this.textOutlineSize == "auto") {
                    outlineSize = this.height*0.6/ui.autoOutline
                }
                element.scrollLeft = this.element.scrollLeft
                if (i == 0) element.style.webkitTextStroke = `${outlineSize}px rgba(${this.textOutlineColour[0]}, ${this.textOutlineColour[1]}, ${this.textOutlineColour[2]}, ${this.textOutlineColour[3]})`
                return element
            }
            draw() {

                this.scrollLeftT += (this.element.scrollLeft - this.scrollLeft)
               
                let outlineSize = this.textOutlineSize
                if (this.textOutlineSize == "auto") {
                    outlineSize = this.height*0.6/ui.autoOutline
                }
                this.element.scrollLeft = this.scrollLeft
                this.element.scrollLeft += (this.scrollLeftT-this.element.scrollLeft) * Math.min(Math.max(delta*20, 0), 1)
                this.scrollLeft = this.element.scrollLeft
                
                this.flashTime += delta
                if (this.flashTime > 1) {
                    this.flashTime = 0
                }

                this.drawText(0, [0, 0], this.textColour)
                let dirs = ["top", "bottom", "left", "right"]
                let colour2 = ui.textShadow.colour
                if (colour2 == "auto") colour2 = this.textColour
                for (let dir of dirs) {
                    if (ui.textShadow[dir] != 0) {
                        let amt = ui.textShadow[dir]
                        if (ui.textShadow[dir] == "auto") amt = outlineSize/3
                        if (dir == "bottom") {
                            this.drawText(0, [0, amt], [colour2[0]*ui.textShadow.multiply, colour2[1]*ui.textShadow.multiply, colour2[2]*ui.textShadow.multiply, colour2[3]])
                            this.drawText(1, [0, amt], [colour2[0]*ui.textShadow.multiply, colour2[1]*ui.textShadow.multiply, colour2[2]*ui.textShadow.multiply, colour2[3]])

                            // ui.text(x, y+amt, size, text, {...options, colour: [colour[0]*this.textShadow.multiply, colour[1]*this.textShadow.multiply, colour[2]*this.textShadow.multiply, colour[3]], doShadow: false, selectable: false})
                        }
                    }
                }

                let tElement = this.drawText(1, [0, 0], this.textColour)

                if (this.element.selectionStart+","+this.element.selectionEnd != this.lastText) {
                    this.flashTime = -0.5
                }
                this.lastText = this.element.selectionStart+","+this.element.selectionEnd
                
                this.visible = true
                this.element.spellcheck = false
                this.element.style = ""
                // this.element.placeholder = this.placeholder
                // this.element.style.display = "block"
                this.element.style.zIndex = ui.getOrder()
                // this.element.style.display = ""
                this.element.style.left = this.x-this.width/2+"px"
                this.element.style.top = this.y-this.height/2+"px"
                this.element.style.width = this.width+"px"
                this.element.style.height = this.height+"px"
                this.element.width = this.width
                this.element.height = this.height
                this.element.style.position = "absolute"
                this.element.style.margin = 0
                this.element.style.display = "flex"
                this.element.style.alignItems = "center"
                this.element.style.userSelect = "none"
                this.element.style.padding = 0
                this.element.style.paddingLeft = this.outlineSize+"px"
                this.element.style.mozUserSelect = "none"
                this.element.style.msUserSelect = "none"
                this.element.style.caretColor = "transparent"
                this.element.style.font = `${this.height*0.6}px ${ui.font}`
                this.element.style.boxSizing = "border-box"
                this.element.style.border = `${this.outlineSize}px solid rgba(${this.outlineColour[0]}, ${this.outlineColour[1]}, ${this.outlineColour[2]}, ${this.outlineColour[3]})`
                this.element.style.borderRadius = this.outlineSize*2+"px"
                this.element.style.backgroundColor = "transparent"
                // this.element.style.color = `white` 
                this.element.style.color = "rgba(0,0,0,0)"

                let focused = document.activeElement == this.element
                if (focused) {
                    function getCaretCoordinates(element, position) {
                        var rect = element.getBoundingClientRect();
                        var span = document.createElement('span');
                        span.textContent = element.value.substring(0, position);
                        span.style.whiteSpace = 'pre';
                        span.style.font = element.style.font
                        document.body.appendChild(span);
                        var spanRect = span.getBoundingClientRect();
                        document.body.removeChild(span);
                        return {
                            y: rect.height/2 - element.scrollTop,
                            x: spanRect.width
                        }
                    }
                    
                    let spos = getCaretCoordinates(this.element, this.element.selectionStart)
                    let epos = getCaretCoordinates(this.element, this.element.selectionEnd)
                    if (focused && !this.focused) {
                        this.flashTime = 0
                        this.spos = {...spos}
                        this.epos = {...epos}
                    } else {
                        this.spos.x += (spos.x-this.spos.x) * Math.min(Math.max(delta*20, 0), 1)
                        this.epos.x += (epos.x-this.epos.x) * Math.min(Math.max(delta*20, 0), 1)
                    }
                    
                    ui.parent = tElement
                    if (this.element.selectionStart == this.element.selectionEnd) {
                        ui.rect(this.epos.x+4, this.height/2-(this.height/2-this.height*0.6/1.5), this.outlineSize, this.height*0.65, [255, 255, 255, 1-Math.sin(Math.max(this.flashTime, 0)*Math.PI)**3])
                    } else {
                        ui.rect(this.spos.x+(this.epos.x-this.spos.x)/2+2, this.height/2-(this.height/2-this.height*0.6/1.5), this.epos.x-this.spos.x, this.height*0.65, [0, 150, 255, 0.2], this.outlineSize/2, [0, 150, 255, 0.5], this.outlineSize)
                    }
                    ui.parent = ui.page
                } 
                this.focused = focused
            }
        }
    }
}

var ui = new UI()