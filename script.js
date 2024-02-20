
var time = 0
var lastTime = 0
var delta = 0

function update(timestamp) {
    requestAnimationFrame(update)
    
    delta = (timestamp - lastTime) / 1000
    lastTime = timestamp
    time += delta

    // for (let i = 0; i < 200; i++) {
    //     ui.rect(200+i*2+Math.sin(time)*50, 200, 100, 100, [0, 255, 0, 1])
    // }

    ui.text(500, 500, 20, "This, is a very cool peice of text lol")

    ui.endFrame()
}

requestAnimationFrame(update)