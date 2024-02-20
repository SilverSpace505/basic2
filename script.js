
var time = 0
var lastTime = 0
var delta = 0

ui.setFont("custom", "font.ttf")
ui.textShadow.bottom = "auto"

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

    ui.endFrame()
}

requestAnimationFrame(update)