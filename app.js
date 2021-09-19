const main = function () {
  let game_on;
  let win_points;
  let total_scores;
  let currentScore;
  let activePlayer;

  const startGame = function () {
    $("#show-game-page").show();
    $("#show-intro-page").hide();
    game_on = true;
    win_points = 100;
    total_scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
  };

  const restartGame = function () {
    game_on = false;

    total_scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    $("#announce").text("May the odds be in your favour").css("color", "black");
    $("#total-score-player0").text("0");
    $("#total-score-player1").text("0");
    $(".current-player0").text("0");
    $(".current-player1").text("0");
    $("#show-game-page").hide();
    $("#show-intro-page").show();
  };

  //================= IN-GAME FUNCTIONS================================================
  const rolledAOne = function () {
    $("#boom").show();
    setTimeout(() => {
      $("#boom").hide();
    }, 2000);
  };
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

      $("#dice1").attr("src", `./dice/dice-${dice_value}.jpg`);
      $("#prestart-image").remove();
      if (dice_value !== 1) {
        currentScore += dice_value;
        $(`.current-player${activePlayer}`).text(`${currentScore}`);
      } else {
        rolledAOne();
        switchPlayer();
      }
    }
  };

  const gameMode = function () {
    // event listener --> input string no.
    /// string no --> function --> determines game mode.
    // game mode stored in array.
  };
  //==========================================

  $("#show-game-page").hide();
  $("#boom").hide();
  $(".start-game").on("click", startGame);
  $("#player-reset").on("click", restartGame);
  $("#player-roll").on("click", diceRoll);
  $("#player-pass").on("click", playerPass);
};

$(main);