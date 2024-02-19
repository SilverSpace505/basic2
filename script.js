
var time = 0
var lastTime = 0
var delta = 0

function update(timestamp) {
    requestAnimationFrame(update)
    
    delta = (timestamp - lastTime) / 1000
    lastTime = timestamp
    time += delta

    ui.rect(200+Math.sin(time)*50, 200, 100, 100, [0, 255, 0, 1])

    ui.endFrame()
}

requestAnimationFrame(update)