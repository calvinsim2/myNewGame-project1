// "use strict";

// lets declare all variables we think we need for this game!

const main = function () {
  let game_on = true;
  const win_points = 100;
  let total_scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;

  const switchPlayer = function () {
    if (activePlayer === 0) {
      console.log("change 0 to 1!");
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      activePlayer = 1;
    } else {
      console.log("change 1 to 0!");
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      activePlayer = 0;
    }
  };

  const playerPass = function () {
    if (game_on) {
      console.log(activePlayer);
      total_scores[`${activePlayer}`] += currentScore;
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );
      if (total_scores[`${activePlayer}`] >= win_points) {
        $(".announce").text(`Player ${activePlayer + 1} wins!`);
        currentScore = 0;
        game_on = false;
      } else {
        switchPlayer();
      }
    }
  };

  const diceRoll = function () {
    if (game_on) {
      let dice_value = Math.trunc(Math.random() * 6 + 1);

      $("#dice1").attr("src", `./dice/dice-${dice_value}.jpg`);
      if (dice_value !== 1) {
        currentScore += dice_value;
        $(`.current-player${activePlayer}`).text(`${currentScore}`);
      } else {
        switchPlayer();
      }
    }
  };

  $("#player-roll").on("click", diceRoll);
  $("#player-pass").on("click", playerPass);
};

$(main);
