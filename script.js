
var time = 0
var lastTime = 0
var delta = 0

var targetSize = {x: 1500, y: 1000}

ui.setup()
ui.setFont("custom", "font.ttf")
ui.textShadow.bottom = "auto"

var testing = new ui.TextBox("type here...")
var coolBtn = new ui.Button("rect", "Click Me", [0, 255, 0, 1])

function update(timestamp) {
    requestAnimationFrame(update)
    ui.startFrame()

    if (ui.resizeStop <= 0) {
        let w = window.innerWidth
        let h = window.innerHeight

        let aspect = w / targetSize.x
        
        su = aspect
        if (su > h / targetSize.y) {
            su = h / targetSize.y
        }
    }
    
    
    delta = (timestamp - lastTime) / 1000
    lastTime = timestamp
    time += delta

    ui.textShadow.colour = [0, 150, 255, 1]
    ui.textShadow.multiply = 1
    ui.text(20*su, 95*su, 150*su, "Basic 2")
    ui.textShadow.colour = [255, 0, 0, 1]
    ui.text(20*su, 200*su, 40*su, "Elements: "+ui.elements.length)
    ui.textShadow.colour = "auto"
    ui.textShadow.multiply = 0.5

    ui.text(600*su+Math.sin(time)*50*su, 700*su, 100*su, "Silver", {align: "center"})
    ui.setFont("custom-speedwing", "speedwing-font.ttf")
    ui.text(600*su+Math.sin(time+1)*50*su, 800*su, 100*su, "Speedwing", {align: "center"})
    ui.setFont("custom")

    ui.text(100*su, 300*su+Math.sin(time+1)*10*su, 30*su, "This, is a very cool piece of text lol, This, is a very cool piece of text lol, This, is a very cool piece of text lol, This, is a very cool piece of text lol, and it wraps too!", {wrap: 500*su})

    ui.img(800*su, 175*su, 250*su+Math.sin(time+2)*50*su, 250*su+Math.sin(time+2)*50*su, "tileset.png", [0, 0, 64, 64])

    ui.rect(800*su, 525*su, 100*su, 100*su, [255, 0, 0, 1])

    ui.img(200*su, 600*su, 200*su, 200*su, "image-test.webp")

    testing.set(800*su, 100*su, 400*su, 50*su)
    testing.outlineSize = 5*su
    testing.draw()

    // coolBtn.set(800, 100)

    ui.endFrame()
}

requestAnimationFrame(update)