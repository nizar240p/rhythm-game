function show() {
    let input = document.getElementById('name')
    let playBtn = document.getElementById('playBtn')

    if(input.value != '') {
        playBtn.style.display = 'block'
    } else {
        playBtn.style.display = 'none'
    }
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 

var

dLane,
fLane,
jLane,
kLane,

dVirus = [],
fVirus = [],
jVirus = [],
kVirus = [],

dangerArea,
border,
dfjkKey,
failArea,

playerName,
myScore,
myFail

function startGame() {
    myGameArea.start()

    dLane = new component(60, 600, 'gray', 345, 0)
    fLane = new component(60, 600, 'gray', 415, 0)
    jLane = new component(60, 600, 'gray', 485, 0)
    kLane = new component(60, 600, 'gray', 555, 0)

    dangerArea = new component(270, 50, 'rgba(255, 0, 0, 0.5)', 345, 440)
    border = new component(270, 10, 'black', 345, 490)
    dfjkKey = new component(270, 100, 'images/d.png', 345, 500, 'image')
    failArea = new component(270, 20, 'lightgray', 345, 550)

    playerName = new component('30px', 'Consolas', 'white', 10, 40, 'text')
    myScore = new component('30px', 'Consolas', 'white', 10, 80, 'text')
    myFail = new component('30px', 'Consolas', 'white', 10, 120, 'text')
}

var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        document.getElementById('start').style.display = 'none'
        this.canvas.width = 960 // 480
        this.canvas.height = 600
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || [])
            myGameArea.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false
        })

        console.log(document.getElementById('name').value)
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function() {
        clearInterval(this.interval)
        this.canvas.style.display = 'none'
        document.getElementById('end').style.display = 'block'
    }
}

function component(width, height, color, x, y, type) {
    this.type = type
    if(this.type == 'image') {
        this.image = new Image()
        this.image.src = color
    }
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context
        if(this.type == 'text') {
            ctx.font = this.width + ' ' + this.height
            ctx.fillStyle = color
            ctx.fillText(this.text, this.x, this.y)
        } else if(this.type == 'image') {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        } else {
            ctx.fillStyle = color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var otherleft = otherobj.x
        var otherright = otherobj.x + (otherobj.width)
        var othertop = otherobj.y
        var otherbottom = otherobj.y + (otherobj.height)
        var crash = true
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
        }
        return crash
    }
}

var score = 0
var fail = 0

function updateGameArea() {
    for(i = 0; i < dVirus.length; i++) {
        if(dVirus[i].crashWith(dangerArea) && (myGameArea.keys && myGameArea.keys[68])) {
            dVirus[i].y += myGameArea.canvas.height
            score++
            myGameArea.keys[68] = false
        }

        if(dVirus[i].crashWith(failArea)) {
            dVirus[i].y += myGameArea.canvas.height
            fail++
        }
    }
    for(i = 0; i < fVirus.length; i++) {
        if(fVirus[i].crashWith(dangerArea) && (myGameArea.keys && myGameArea.keys[70])) {
            fVirus[i].y += myGameArea.canvas.height
            score++
            myGameArea.keys[70] = false
        }

        if(fVirus[i].crashWith(failArea)) {
            fVirus[i].y += myGameArea.canvas.height
            fail++
        }
    }
    for(i = 0; i < jVirus.length; i++) {
        if(jVirus[i].crashWith(dangerArea) && (myGameArea.keys && myGameArea.keys[74])) {
            jVirus[i].y += myGameArea.canvas.height
            score++
            myGameArea.keys[74] = false
        }

        if(jVirus[i].crashWith(failArea)) {
            jVirus[i].y += myGameArea.canvas.height
            fail++
        }
    }
    for(i = 0; i < kVirus.length; i++) {
        if(kVirus[i].crashWith(dangerArea) && (myGameArea.keys && myGameArea.keys[75])) {
            kVirus[i].y += myGameArea.canvas.height
            score++
            myGameArea.keys[75] = false
        }

        if(kVirus[i].crashWith(failArea)) {
            kVirus[i].y += myGameArea.canvas.height
            fail++
        }
    }

    if(fail >= 5) {
        myGameArea.stop()
    }

    myGameArea.clear()
    myGameArea.frameNo++

    dLane.update()
    fLane.update()
    jLane.update()
    kLane.update()

    dangerArea.update()
    failArea.update()

    if(myGameArea.frameNo == 1 || everyinterval(10)) {
        var random = Math.floor(Math.random() * 4)

        if(random == 0) {
            dVirus.push(new component(50, 50, 'images/corona-virus.png', 350, -50, 'image'))
        } else if(random == 1) {
            fVirus.push(new component(50, 50, 'images/corona-virus.png', 420, -50, 'image'))
        } else if(random == 2) {
            jVirus.push(new component(50, 50, 'images/corona-virus.png', 490, -50, 'image'))
        } else if(random == 3) {
            kVirus.push(new component(50, 50, 'images/corona-virus.png', 560, -50, 'image'))
        }
    }

    var z = 5

    for(i = 0; i < dVirus.length; i++) {
        dVirus[i].y += z
        dVirus[i].update()
    }
    for(i = 0; i < fVirus.length; i++) {
        fVirus[i].y += z
        fVirus[i].update()
    }
    for(i = 0; i < jVirus.length; i++) {
        jVirus[i].y += z
        jVirus[i].update()
    }
    for(i = 0; i < kVirus.length; i++) {
        kVirus[i].y += z
        kVirus[i].update()
    }

    border.update()
    dfjkKey.update()

    playerName.text = 'NAME: ' + document.getElementById('name').value
    playerName.update()

    myScore.text = 'SCORE: ' + score
    myScore.update()

    myFail.text = 'FAIL: ' + fail
    myFail.update()
}

function everyinterval(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {
        return true
    }
    return false
}