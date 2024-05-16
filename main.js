// Tic Tac Toe
// Objects
// Player Object 
function createUser(name,mark) {
    (mark === "0") ? mark = "X" : mark = "O"
    let score = 0
    incrementScore =()=>{return score+=1}
    showScore = ()=>{return score}
    return {name, mark,incrementScore,showScore}
}

// Board Object
function Board() {
    //Functions
    let boardArray = [' ',' ',' ',' ',' ',' ',' ',' ',' '] // Board in Array
    let occupiedSpaces =0
    showArray = ()=>{return boardArray}
    updateBoard = (slot, mark)=>{
        occupiedSpaces++
        return boardArray[slot] = mark
    }
    displayBoard = ()=>{
        console.log(`${boardArray[0]}|${boardArray[1]}|${boardArray[2]}\n-----\n${boardArray[3]}|${boardArray[4]}|${boardArray[5]}\n-----\n${boardArray[6]}|${boardArray[7]}|${boardArray[8]}`)
        console.log(" ")
    }
    checkWin = ()=>{
        // Check for each of the horizonals and verticals
        // Horizontal
        if ((boardArray[0] !== ' ' && boardArray[0]===boardArray[1] && boardArray[1]===boardArray[2]) || (boardArray[3] !== ' ' && boardArray[3]===boardArray[4] && boardArray[4]===boardArray[5]) || (boardArray[6] !== ' ' && boardArray[6]===boardArray[7] && boardArray[7]===boardArray[8])){
            console.log("Horizontal")
            return true
        }
        else if ((boardArray[0] !== ' ' && boardArray[0]===boardArray[3] && boardArray[3]===boardArray[6]) || (boardArray[1] !== ' ' && boardArray[1]===boardArray[4] && boardArray[4]===boardArray[7]) || (boardArray[2] !== ' ' && boardArray[2]===boardArray[5] && boardArray[5]===boardArray[8])){
            console.log("Vertical")
            return true
        }
        else if ((boardArray[0] !== ' ' && boardArray[0]===boardArray[4] && boardArray[4]===boardArray[8]) || (boardArray[2] !== ' ' && boardArray[2]===boardArray[4] && boardArray[4]===boardArray[6])){
            console.log("Diagonal")
            return true
        }else{
            return false
        }
        
    } 
    checkSlot = (slot)=>{
        if(boardArray[slot] === ' '){
            return true
        }else{return false}
    }
    checkDraw = ()=>{
        if (occupiedSpaces === 9){
            return true
        }
        }
    
    return {displayBoard, updateBoard, checkWin,checkSlot,checkDraw,showArray}
}

// Game Object
function Game() {
    // Start Game
    let player1 = createUser("John","1")
    let player2 = createUser("Peter","0")
    let board = Board()
    let players = [player1,player2]


    // while the game is not over
    while (true) {
        // determine next player turn
        let player = players[0]
        let playerTurn = true
        
        // while the turn is over
        while (playerTurn) {
            // player chooses slot to play in
            let slot = prompt(`${player.name}'s turn: Enter slot number`)
            // valid slot
            if (board.checkSlot(slot)){
                // Update Board
                board.updateBoard(slot,player.mark)
                // display it
                board.displayBoard()
                playerTurn = false
            }else{
                console.log("Slot occupied.")
            }
            
        }

        //Check win
        if (board.checkWin()){
            console.log(board.showArray())
            console.log(`${player.name} won!!!`)
            player.incrementScore()
            break
        }
        
        // Check draw
        else if (board.checkDraw()){
            console.log("Draw")
            break
        }
        
        else{
            // Switch turn
            players = [players[1],players[0]]
        }
        
            
    }
    // We can score the players
    return players
}


// Testing
players = Game()
console.log(`${players[0].name} ${players[0].showScore()} : ${players[1].showScore()} ${players[1].name}`)

