
var time = 0
var lastTime = 0
var delta = 0

ui.setup()
ui.setFont("custom", "font.ttf")
ui.textShadow.bottom = "auto"

var testing = new ui.TextBox("type here...")
var coolBtn = new ui.Button("rect", "Click Me", [0, 255, 0, 1])

function update(timestamp) {
    requestAnimationFrame(update)
    
    delta = (timestamp - lastTime) / 1000
    lastTime = timestamp
    time += delta

    for (let i = 0; i < 1; i++) {
        ui.text(500+Math.sin(time+i)*50, 500, 100, "Silver")
    }

    ui.text(100, 100+Math.sin(time+1)*10, 20, "This, is a very cool piece of text lol, This, is a very cool piece of text lol, This, is a very cool piece of text lol, This, is a very cool piece of text lol, and it wraps too!", {wrap: 300})

    ui.img(600, 200, 200+Math.sin(time+2)*50, 200+Math.sin(time+2)*50, "tileset.png", [0, 0, 64, 64])

    ui.rect(800, 400, 100, 100, [255, 0, 0, 1])

    testing.set(400, 400, 400, 50)
    testing.outlineSize = 5
    testing.draw()

    coolBtn.set(800, 100)

    ui.endFrame()
}

requestAnimationFrame(update)