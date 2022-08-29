
import './App.css';
import {useState,useEffect} from "react"
import Square from './Components/Square';
import {Patterns} from "./Patterns";

function App() {

const [board,SetBoard]=useState(["","","","","","","","",""]);
const [player,SetPlayer]=useState("O");
const [result,SetResult]=useState({winner :"none", state:"none"});

useEffect(()=>{
  //ilk beraberlik durumu kontrol edilir bunun nedeni kazanan son hamlede bulunuyorsa berabere vermemesini sağlamak
  checkScoreless();

  checkWinnerPlayer();

  //Bir sonraki oyuncunun x mi o mu olacağını belirler
  if(player=="X"){
    SetPlayer("O");
  }else{
    SetPlayer("X");
  }
},[board]);


//Oyun sonucunun ekranda gösterilmesini sağlar
useEffect(() => {
  if (result.state != "none") {
    alert(`Oyun sonu.. Kazanan Oyuncu: ${result.winner}`);
    restart();
  }
}, [result]);

//Kare seçimi gerçekleşir.
const chooseSquare=(square)=>{
  SetBoard(
    board.map((val,idx)=>{
    if(idx==square && val=="" ){
      return player;
    }
    return val;
  })
  );
  
};

//Kazanan oyuncunun belirlenmesi sağlanır.
const checkWinnerPlayer=()=>{
  Patterns.forEach((currPattern)=>{
    const firstPlayer=board[currPattern[0]];
    if(firstPlayer=="")
    {
      return;
    }
    let foundWinningPlayer=true;
    currPattern.forEach((idx)=>{
      if(board[idx]!=firstPlayer){
        foundWinningPlayer=false;
      }
    });
if(foundWinningPlayer){
  SetResult({winner:player,state:"Kazanan"});

}

  });
};


//Beraberlik durumununu kontrol eder.
const checkScoreless=()=>{
  let full=true;
  board.forEach((square)=>{
  if(square ==""){
    full=false;
    }
  });
  if(full){
    SetResult({winner:"Yok",state:"Berabere"});
    }


};

//Oyunun yeniden başlatılmasını sağlanır. Board ve oyuncu ilk konumuna alınır.
const restart = () => {
  SetBoard(["", "", "", "", "", "", "", "", ""]);
  SetPlayer("O");
};


//Css dosyasında belirlenen özelliklerde 3*3 lük kare oluşturulması sağlanır.
  return <div className="App">
    <div className="board">
    <div className="row">
      <Square val={board[0]} chooseSquare={()=>{chooseSquare(0)}}/>
      <Square val={board[1]} chooseSquare={()=>{chooseSquare(1)}}/>
      <Square val={board[2]} chooseSquare={()=>{chooseSquare(2)}}/>
    </div>
    <div className="row">
    <Square val={board[3]} chooseSquare={()=>{chooseSquare(3)}}/>
      <Square val={board[4]} chooseSquare={()=>{chooseSquare(4)}}/>
      <Square val={board[5]} chooseSquare={()=>{chooseSquare(5)}}/>
    </div>
    <div className="row">
    <Square val={board[6]} chooseSquare={()=>{chooseSquare(6)}}/>
      <Square val={board[7]} chooseSquare={()=>{chooseSquare(7)}}/>
      <Square val={board[8]} chooseSquare={()=>{chooseSquare(8)}}/>
    </div>

    </div>
    
  </div>;
}

export default App;
