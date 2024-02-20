
var time = 0
var lastTime = 0
var delta = 0

// testing 123 49fsnieufnesifniusndfew

ui.setFont("custom", "font.ttf")

function update(timestamp) {
    requestAnimationFrame(update)
    
    delta = (timestamp - lastTime) / 1000
    lastTime = timestamp
    time += delta

    for (let i = 0; i < 1; i++) {
        ui.text(500+Math.sin(time)*50, 500, 100, "Silver")
    }

    // ui.text(500+Math.sin(time)*50, 500, 20, "This, is a very cool peice of text lol")

    ui.endFrame()
}

requestAnimationFrame(update)