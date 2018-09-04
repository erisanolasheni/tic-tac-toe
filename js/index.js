/*
 * Name: Cross & Noughts Game with JavaScript
 * Author: Erisan Olasheni
 * Github Profile: https://github.com/erisanolasheni
 * Facebook: Erisan Olasheni
*/

var game = {
  select: selector => {
    return document.querySelector(selector);
  },
  selectAll: selector => {
    return document.querySelectorAll(selector);
  },
  currentPlayer: "x",
  playerXMeta: {
    name: "Player 1",
    label: "x",
    score: 0
  },
  playerOMeta: {
    name: "Player 2",
    label: "o",
    score: 0
  },
  gameParentElem: ".game-console",
  boxElem: ".game-console li",
  play: e => {
    // Check if box is already ticked
    let thisBox = e;
    // alert(thisBox.classList)
    if (!thisBox.classList.contains("ticked")) {
      // Player is about to play
      thisBox.classList.add(game.currentPlayer);
      thisBox.classList.add("ticked");

      //   Count the game
      game.count(game.currentPlayer, thisBox);
    }
  },
  count: (player, thisBox) => {
    //   Check if player 1

    if (player == "x") {
      game.XplayedPositionRecords.push(game.getElemPos(thisBox));

      // Log XplayedPositionRecords to console to confirm the values

      // console.log(game.XplayedPositionRecords);
    } else {
      game.OplayedPositionRecords.push(game.getElemPos(thisBox));

      // Log OplayedPositionRecords to console to confirm the values

      // console.log(game.OplayedPositionRecords);
    }

    if (!game.winner()) {
      // First check if the boxes are all Filled
      if (
        game.selectAll(".ticked").length == game.selectAll(game.boxElem).length
      ) {
        // Game is over
        // therefore reset game
        game.resetGame(game.playerXMeta.score, game.playerOMeta.score);
        game.clearBox();
      }
      // TogglePlayer
      game.togglePlayer();
    } else {
      // alert(game.currentPlayer.toUpperCase()+" Wins!");
      game.resetGame(game.playerXMeta.score, game.playerOMeta.score);
      game.togglePlayer();
    }
  },
  togglePlayer: () => {
    let players = ["x", "o"];
    let nextTurnIds = ["player1-label", "player2-label"];

    let playerIndex = players.indexOf(game.currentPlayer);

    game.currentPlayer = players[1 - playerIndex];

    // Toggle Next Turn
    game.select("#"+nextTurnIds[playerIndex]).classList.remove("nextTurn");

    game.select("#"+nextTurnIds[1 - playerIndex]).classList.add("nextTurn");
  },
  resetGame: (playerXScore, playerYScore) => {
    game.playerXMeta.score = playerXScore;
    game.playerOMeta.score = playerYScore;

    // Reset position records
    game.XplayedPositionRecords = [];
    game.OplayedPositionRecords = [];

    // Clear the boxes
    game.clearBox();

    // Clear the scores
    game.select("#p1-count").innerText = playerXScore;
    game.select("#p2-count").innerText = playerYScore;

    game.select("#player2-label").classList.remove("nextTurn")
    game.select("#player1-label").classList.add("nextTurn")
  },
  clearBox: () => {
    let thisBox = game.selectAll(game.boxElem);

    //   Remove all classes for playing the game
    for (let v of thisBox) {
      v.classList.remove("ticked");
      v.classList.remove("x");
      v.classList.remove("o");
    }
  },
  getElemPos: child => {
    try {
      return parseInt(child.attributes["data-index"].value);
    } catch (E) {
      console.error("Error occured, ", E);
      return -1;
    }
  },
  XplayedPositionRecords: [],
  OplayedPositionRecords: [],
  winner: () => {
    let XWinner = null;
    let YWinner = null;

    // game.checkWins(game.XplayedPositionRecords)

    if (game.checkWins(game.XplayedPositionRecords)) {
      // Player X Wins
      XWinner = true;
    } else if (game.checkWins(game.OplayedPositionRecords)) {
      // Player Y wins
      YWinner = true;
    }

    // Assign scores and result games

    if (XWinner) {
      game.playerXMeta.score += 1;

      // Display score on board
      game.select("#p1-count").innerText = game.playerXMeta.score;
      return true;
    } else if (YWinner) {
      game.playerOMeta.score += 1;

      // Display score on board
      game.select("#p2-count").innerText = game.playerOMeta.score;
      return true;
    }

    return false;
  },
  checkWins: arrayToCheck => {
    // Define the elements truthy positions

    let truthyPositions = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ];

    // Loop through the truthyPositions to place a check on the child arrays
    let iCount = 0;
    // console.log("---------------------")
    for (let v of truthyPositions) {
      // Reset iCount back to 0
      iCount = 0;
      for (let t of arrayToCheck) {
        // console.log("Elems", v, t, arrayToCheck);
        if (v.includes(t)) ++iCount;

        // console.log("iCount", iCount);
      }

      // If we found upto 3 ticked on the truthyPositions
      if (iCount == 3) break;
    }
    return iCount == 3;
  }
};
