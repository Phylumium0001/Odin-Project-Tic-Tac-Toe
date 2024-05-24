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
    let winningSlots = []
    showArray = ()=>{return boardArray}

    // updateBoard = (slot, mark)=>{
    //     occupiedSpaces++
    //     return boardArray[slot] = mark
    // }

    incrementOccupiedSpaces = ()=>{
        occupiedSpaces++
    }

    getWiningSlots = () =>{return winningSlots}

    // displayBoard = ()=>{
    //     console.log(`${boardArray[0]}|${boardArray[1]}|${boardArray[2]}\n-----\n${boardArray[3]}|${boardArray[4]}|${boardArray[5]}\n-----\n${boardArray[6]}|${boardArray[7]}|${boardArray[8]}`)
    //     console.log(" ")
    // }
    checkWin = ()=>{
        // Check for each of the horizonals and verticals
        // Horizontal

        if (boardArray[0] !== '*' && boardArray[0]===boardArray[1] && boardArray[1]===boardArray[2]){
            winningSlots = [1,2,3]
            return true
        }else if (boardArray[3] !== '*' && boardArray[3]===boardArray[4] && boardArray[4]===boardArray[5]){
            winningSlots = [4,5,6]
            return true
        }else if (boardArray[6] !== '*' && boardArray[6]===boardArray[7] && boardArray[7]===boardArray[8]){
            winningSlots = [7,8,9]
            return true
        }
        // Vertical
        else if (boardArray[0] !== '*' && boardArray[0]===boardArray[3] && boardArray[3]===boardArray[6]){
            winningSlots = [1,4,7]
            return true
        }else if((boardArray[1] !== '*' && boardArray[1]===boardArray[4] && boardArray[4]===boardArray[7])){
            winningSlots = [2,5,8]
            return true
        }else if(boardArray[2] !== '*' && boardArray[2]===boardArray[5] && boardArray[5]===boardArray[8]){
            winningSlots = [3,6,9]
            return true
        }

        else if (boardArray[0] !== '*' && boardArray[0]===boardArray[4] && boardArray[4]===boardArray[8]){
            winningSlots = [1,5,9]
            return true
        }else if(boardArray[2] !== '*' && boardArray[2]===boardArray[4] && boardArray[4]===boardArray[6]){
            winningSlots = [3,5,7]
            return true
        }
        else{
            return false
        }
        
    }
    checkSlot = (slot)=>{
        if(boardArray[slot] === '*'){
            return true
        }else{return false}
    }
    checkDraw = ()=>{
        if (occupiedSpaces === 9){
            return true
        }
        }
    updateArray = (newArray)=>{
        // console.log(`new Board array ${newArray}`)
        return boardArray = newArray
    }
    resetBoard = () =>{
        // Replace all the slots to defaults
        for (const item of boardArray) {
            item = "*"
        }
    }
    return {incrementOccupiedSpaces, checkWin,checkSlot,checkDraw,updateArray,getWiningSlots,resetBoard}
}

// DOM object
function domManipulator(board,players) {

    getBoardVals = ()=>{
        let newArray = []
        dataSlots = document.querySelectorAll('.slot')
        for (let index = 0;index < dataSlots.length;index++){
            newArray.push(dataSlots[index].textContent)
        }
        return newArray
        
    }
    addListeners = ()=>{
        dataSlots = document.querySelectorAll('.slot')
        for (let index = 0;index < dataSlots.length;index++){
            dataSlots[index].addEventListener("click",(event)=>{
                handleSlotClick(event)
            })
        }
        resetBtn = document.querySelector("#btn")
        resetBtnFunc.addEventListener("click",resetBtnFunc())
    }

    updateDocBoard = (slot)=>{
        slot = document.querySelector(`#slot${slot}`)
        slot.textContent = `${players[0].mark}`
        board.incrementOccupiedSpaces()
    }
    updateGameProgress = (text='')=>{
        p = document.querySelector("#gameState")
        text==='' ? p.textContent = `${players[0].mark}'s Turn`: p.textContent = text
    }

    // extractEventHandlers = ()=>{
    //     dataSlots = document.querySelectorAll('.slot')
    //     for (let index = 0;index < dataSlots.length;index++){
    //         dataSlots[index].
    //     }
    // }
    indicateWin = () => {
        let slots = document.querySelectorAll(".slot")
        let winSlots = board.getWiningSlots()
        winSlots.forEach(element => {
            // loop  through all the slots and find the one with the number
            console.log(element)
            for (const slot of slots) {
                if (slot.id === `slot${element}`){
                    slot.style.color = "green"
                }
            }
        });
    }
    
    // Handle slot click
    handleSlotClick = (event)=>{
        // console.log(event)
        slotNum = event.target.parentElement.dataset.slotVal
        // Update the boardArray

        previousVals = getBoardVals()
        board.updateArray(previousVals)
        

        // Check the validity of slot
        if (board.checkSlot(slotNum-1)){
            updateDocBoard(slotNum)
            previousVals = getBoardVals()
            board.updateArray(previousVals)

            // Check win
            if (board.checkWin()){
                updateGameProgress(`${players[0].mark} Wins!!!`)
                // extractEventHandlers()
                indicateWin()
    
            }
            else if (board.checkDraw()){
                updateGameProgress("Draw")
            }else{
                // Change player
                players = [players[1],players[0]]
                updateGameProgress(`${players[0].mark}'s Turn`)
            }
            
            
        }else{
            console.log("Not Valid")
        }
            
        
    }
    resetBoard = () => {
        board.resetBoard()
        slots = document.querySelectorAll(".slots")
        for (const slot of slots) {
            slots.textContent = "*"
        }
    }

    return {handleSlotClick, addListeners,resetBoard}
}

    
// Game Object
function Game() {
    // Start Game
    startGame = ()=> {
        let player1 = createUser("John","1")
        let player2 = createUser("Peter","0")
        let board = Board()
        let players = [player1,player2]

        state = domManipulator(board,players)
        state.addListeners()
    }
    
    
    resetGame = ()=>{
        domManipulator().resetBoard()
    }
    return {startGame,resetGame}

    // docGameBoardVals = state.getBoardVals()
    // board.updateArray(docGameBoardVals)

    // while (true) {
    //     // determine next player turn
    //     let player = players[0]
    //     let playerTurn = true
        
    //     // while the turn is over
    //     while (playerTurn) {
    //         // player chooses slot to play in
    //         let slot = prompt(`${player.name}'s turn: Enter slot number`)
    //         // valid slot
    //         if (board.checkSlot(slot)){
    //             // Update Board
    //             board.updateBoard(slot,player.mark)
    //             // display it
    //             board.displayBoard()
    //             playerTurn = false
    //         }else{
    //             console.log("Slot occupied.")
    //         }
            
    //     }



    //     //Check win
    //     if (board.checkWin()){
    //         console.log(board.showArray())
    //         console.log(`${player.name} won!!!`)
    //         player.incrementScore()
    //         break
    //     }
        
    //     // Check draw
    //     else if (board.checkDraw()){
    //         console.log("Draw")
    //         break
    //     }
        
    //     else{
    //         // Switch turn
    //         players = [players[1],players[0]]
    //     }
        
            
    // }
    // // We can score the players
    // return players
}

function resetBtnFunc(){
    Game().resetGame()
}

Game().startGame()

// Testing
// players = Game()
// console.log(`${players[0].name} ${players[0].showScore()} : ${players[1].showScore()} ${players[1].name}`)

