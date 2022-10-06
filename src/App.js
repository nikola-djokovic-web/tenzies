import React from "react";
import Die from "./Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  const width = window.innerWidth
  const height = window.innerHeight

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValues = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValues){
      setTenzies(true)
      console.log('you won');
    }
  },[dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
      for(let i=0; i < 10; i++){
        newDice.push(generateNewDie())
      }
      console.log(newDice);
      return newDice
  }

  function rollDice(id){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld
        ? die :
        generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id){
   setDice(oldDice => oldDice.map(die => {
    return die.id === id 
      ? {...die, isHeld: !die.isHeld}
      : die
   }))
  }

  return (   
      <main>
        <h1>Tenzies</h1>
        <p>Roll untill all dice are the same. Click each die to freeze it and its current value between rolls.</p>
        <div className="dice-container">
          {dice.map(die => (
            <Die className='die' holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld}/>
          ))}
        </div>
        <button className="roll-btn" onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        {tenzies && <Confetti
          width={width}
          height={height}
        />}
      </main>
    
  );
}

export default App;
