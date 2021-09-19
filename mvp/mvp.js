const main = function () {
  let game_on = true;
  const win_points = 100;
  let total_scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;

  const switchPlayer = function () {
    if (activePlayer === 0) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(".player-0").removeAttr("id", "player-active");
      $(".player-1").attr("id", "player-active");
      $("#announce").text("Player 2 Turn!").css("color", "gold");
      activePlayer = 1;
    } else {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(".player-0").attr("id", "player-active");
      $(".player-1").removeAttr("id", "player-active");
      $("#announce").text("Player 1 Turn!").css("color", "red");
      activePlayer = 0;
    }
  };

  const playerPass = function () {
    if (game_on) {
      total_scores[`${activePlayer}`] += currentScore;
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );

      if (total_scores[`${activePlayer}`] >= win_points) {
        $("#announce").text(
          `🎉 Player ${activePlayer + 1} wins! Congatulations! 🎉`
        );
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

      $("#dice1").attr("src", `../dice/dice-${dice_value}.jpg`);
      $("#prestart-image").remove();
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
