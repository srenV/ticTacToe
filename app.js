const gameBoard = document.getElementById('gameBoard')
const outerPlayerSpan = document.getElementById('outerPlayerSpan')
const playAgainButton = document.getElementById('playAgainButton')
const playAgainDialog = document.getElementById('playAgainDialog')

//the circle player starts the game
let turn = 'circle'
let gameOver = false


//creates a 2D array row -> ['col', 'col', 'col']
//                   row -> ['col', 'col', 'col']
//                   row -> ['col', 'col', 'col']
// create 3 rows ['row']
for (let row = 0; row < 3; row++) {
    // create 3 columns in each iteration of the row loop ['col', 'col', 'col']
    for (let col = 0; col < 3; col++) {
        // creates a div blueprint and adding the 'field' class to it ['<div class="field"></div>, <div class="field"></div>, <div class="field"></div>]
        const field = document.createElement('div')
        field.classList.add('field')
            //adding EL's
            field.addEventListener('click', () => {
                if(gameOver){
                    field.removeEventListener('click')
                    return
                }else{
                //if the field is empty
                if(field.classList.length == 1){
                    //and the turn is by the circle player, adds the circle class
                    if(turn === 'circle'){
                        field.classList.add('circle')
                        if(checkWin(turn)){
                            outerPlayerSpan.textContent = 'Circle Wins!'
                            gameOver = true
                        }
                        turn = 'cross'
                    //otherwise add the cross class
                    }else{
                        field.classList.add('cross')
                        if(checkWin(turn)){
                            outerPlayerSpan.textContent = 'Cross Wins!'
                            gameOver = true
                        }
                        turn = 'circle'
                    }
                }
            }
            })
            // append every field from the 2D array to the gameBoard div
            gameBoard.appendChild(field)
    }   
}
// All possible winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]            
];

//Checks if a player wins in the click EL
function checkWin(currentClass){
    //creates for each iteration 3 variables (a, b, c) and fills them with the values of the
    //winningCombinations array
    const allFields = document.querySelectorAll('.field')
    for (let index = 0; index < winningCombinations.length; index++) {
        const [a, b, c] = winningCombinations[index]
        //checks if the index of the variables has the current player (cross or circle) 
        //in the first iteration it checks [a ,b, c] => [0, 1, 2]
        //the game is over if all of them have the same player class
        if(allFields[a].classList.contains(currentClass) &&
           allFields[b].classList.contains(currentClass) &&
           allFields[c].classList.contains(currentClass)){

            playAgainDialog.showModal()
            return true
        }
    }
    
    //the button removes all player classes and resets the gameBoard by doing that
    playAgainButton.addEventListener('click', () => {
        allFields.forEach((field) => {
            if(field.classList.contains('circle')){
                field.classList.remove('circle')
            }else{
                field.classList.remove('cross')
            }
            //setting gameOver to false so that a new game can be started
            playAgainDialog.close()
            gameOver = false
        })    
    })
    outerPlayerSpan.textContent = 'Draw!'
    //the game is also over when no winner is found after all fields have a playerclass and
    //none of the winningCombinations returns a winner
    
    return false
}




