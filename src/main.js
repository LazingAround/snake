import './style.css'
console.log('Hi')
class Snake{
    constructor(){
        this.length = 3
        this.num_apples = 1
        this.body = [{x: 3, y: 5}]
        this.direction = {x: 1, y: 0}
        this.moved = {x:-1,y:0}
        this.apples = [{x: 6, y: 5}]
        this.bounds = {x: 10, y: 10}
        this.state = true
    }

    eat(){
        this.length++
    }
    updateApples(){
        for (let i = 0; i < this.num_apples - this.apples.length; i++){
            let apple = {x:Math.floor(Math.random() * 10), y:Math.floor(Math.random() * 10)}
            if (this.body.some(segment => segment.x === apple.x && segment.y === apple.y) || this.apples.some(existingApple => existingApple.x === apple.x && existingApple.y === apple.y)){
                i--
                continue
            }
            this.apples.push(apple)
        
        }
    }

    step(){
        let head = this.body[this.body.length - 1]
        head = {x:head.x + this.direction.x, y:head.y + this.direction.y}
        this.body.push(head)

        if (head.x < 0 || head.x >= this.bounds.x|| head.y < 0 || head.y >= this.bounds.y || (this.body.some(segment => segment.x === head.x && segment.y === head.y && segment !== head))){
            console.log("Game Over")
            this.state = false
            let dev_direction = document.getElementById("direction")
            dev_direction.innerHTML = `Game Over`
            clearInterval(id)
        }

        if (this.apples.some(apple => apple.x === head.x && apple.y === head.y)){
            this.eat()  
            this.apples = this.apples.filter(apple => apple.x !== head.x && apple.y !== head.y )
            this.updateApples()
        }

        if (this.body.length > this.length) {
            this.body.shift()
        }
        this.moved = {x:-this.direction.x, y:-this.direction.y}
    }

    changeDirection(newDirection){
        console.log(newDirection, this.moved)
        if (newDirection.x != this.moved.x && newDirection.y != this.moved.y){
            this.direction = newDirection
            }
    }

}
function print_list(list){
    for (let i = 0; i < list.length; i++){
        console.log(list[i])
    }
}
function direction_to_string(direction){
    if (direction.x == 1 && direction.y == 0){
        return "Right"
    }
    else if (direction.x == -1 && direction.y == 0){
        return "Left"               
    }
    else if (direction.x == 0 && direction.y == 1){
        return "Down"
    }
    else if (direction.x == 0 && direction.y == -1){
        return "Up"
    }
}
function setup(){
    snake = new Snake();
}
function keyPress(key){
    switch(key){
        case "ArrowUp":
            snake.changeDirection({x: 0, y: -1})
            break
        case "ArrowDown":
            snake.changeDirection({x: 0, y: 1})
            break
        case "ArrowLeft":
            snake.changeDirection({x: -1, y: 0})
            break
        case "ArrowRight":
            snake.changeDirection({x: 1, y: 0})
            break
    }
    let direction = snake.direction
    let dev_direction = document.getElementById("direction")
    if (snake.state){
        dev_direction.innerHTML = `Direction: ${direction_to_string(direction)}`
    }
    else{
        dev_direction.innerHTML = `Game Over`
    }
}
function gameLoop() {
    snake.step()
    if (snake.state){
    let game = document.getElementById("game")
    let apples = snake.apples
    let body = snake.body
    console.log("Game loop running")
    console.log("Body: ")
    print_list(body)
    console.log("Apples: ")
    print_list(apples)
    
    for (let i = 0; i < body.length; i++){
        let segment = body[i]
        let segmentElement = document.createElement("div")
        segmentElement.classList.add("pixel")
        segmentElement.classList.add("snake")
        segmentElement.style.left = `${segment.x * game.clientWidth * 0.1}px`
        segmentElement.style.top = `${segment.y * game.clientHeight * 0.1}px`
        game.appendChild(segmentElement)
        segments.push(segmentElement)
    }
    for (let i = 0; i < apples.length; i++){
        let apple = apples[i]
        let appleElement = document.createElement("div")
        appleElement.classList.add("pixel")
        appleElement.classList.add("apple")
        appleElement.style.left = `${apple.x * game.clientWidth * 0.1}px`
        appleElement.style.top = `${apple.y * game.clientHeight * 0.1}px`
        game.appendChild(appleElement)
        element_apples.push(appleElement)
    }
    for (let i = 0; i < segments.length - snake.length ; i++){
        console.log("Del", segments.length)
        segments[0].remove()
        segments.shift()
    }
    for (let i = 0; i < element_apples.length - snake.apples.length ; i++){
        console.log("Del", element_apples.length)
        element_apples[0].remove()
        element_apples.shift()
    }
}}
let snake = new Snake()
let segments = []
let element_apples = []
setup()
const id = setInterval(() => gameLoop(), 200);

document.addEventListener('keydown', function(event) {
    // event.key gives the actual key pressed (e.g., "a", "Enter", "ArrowUp")
    keyPress(event.key);
  });