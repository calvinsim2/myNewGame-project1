const main = function () {
  const game_mode = ["pig", "big-pig"];
  let current_game_mode = game_mode[0];
  let game_on;
  let win_points;
  let total_scores;
  let currentScore;
  let activePlayer;

  //================ GAME MODE ===========================================================
  const pigMode = function () {
    $("#prestart-image2").hide();
    $("#dice2").hide();
    $(".pig-mode").css("background", "yellow");
    $(".bigpig-mode").css("background", "#b0c4de");
    current_game_mode = game_mode[0];
  };
  const bigPigMode = function () {
    $("#prestart-image2").show();
    $("#dice2").show();
    $(".bigpig-mode").css("background", "yellow");
    $(".pig-mode").css("background", "#b0c4de");
    current_game_mode = game_mode[1];
  };

  //============== NUMBER OF PLAYERS SELECTION ===========================================

  //================ START & RESET GAME ==================================================
  const startGame = function () {
    $("#show-game-page").show();
    $("#show-intro-page").hide();
    game_on = true;
    win_points = 100;
    total_scores = [0, 0, 0, 0];
    currentScore = 0;
    activePlayer = 0;
  };

  const restartGame = function () {
    game_on = false;
    activePlayer = 0;
    $("#announce").text("May the odds be in your favour").css("color", "black");

    // reset scores for all players.
    total_scores = [0, 0, 0, 0];
    currentScore = 0;
    for (let i = 0; i < 4; i++) {
      $(`#total-score-player${i}`).text("0");
      $(`#current-player${i}`).text("0");
    }
    $("#prestart-image").show();
    $("#show-game-page").hide();
    $("#show-intro-page").show();
  };

  //================= IN-GAME FUNCTIONS================================================
  const rolledAOne = function () {
    $("#boom").show();
    setTimeout(() => {
      $("#boom").hide();
      $("#boom").text("💥 BOOM! 💥");
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
      if (current_game_mode === "pig") {
        let dice_value = Math.trunc(Math.random() * 6 + 1);
        $("#dice1").attr("src", `./dice/dice-${dice_value}.jpg`);
        $("#prestart-image").hide();
        if (dice_value !== 1) {
          currentScore += dice_value;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
        } else {
          rolledAOne();
          switchPlayer();
        }
      } else if (current_game_mode === "big-pig") {
        let dice_value = Math.trunc(Math.random() * 6 + 1);
        let dice_value2 = Math.trunc(Math.random() * 6 + 1);
        $("#dice1").attr("src", `./dice/dice-${dice_value}.jpg`);
        $("#dice2").attr("src", `./dice/dice-${dice_value2}.jpg`);
        $("#prestart-image").hide();
        $("#prestart-image2").hide();
        if (dice_value !== 1 && dice_value2 !== 1) {
          currentScore += dice_value + dice_value2;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
        } else if (dice_value === 1 && dice_value2 === 1) {
          total_scores[activePlayer] = 0;
          $(`#total-score-player${activePlayer}`).text("0");
          rolledAOne();
          switchPlayer();
          $("#boom").text("💥 BOOM! 💥 SCORE RESET!");
        } else if (dice_value === 1 || dice_value2 === 1) {
          rolledAOne();
          switchPlayer();
        }
      }
    }
  };

  //=============================== USER INPUTS ================================

  // select game Mode.
  $(".pig-mode").on("click", pigMode);
  $(".bigpig-mode").on("click", bigPigMode);

  // select number of players.
  $("");
  // begin game.
  $("#show-game-page").hide();
  $("#boom").hide();
  $(".start-game").on("click", startGame);
  // during game.
  $("#player-reset").on("click", restartGame);
  $("#player-roll").on("click", diceRoll);
  $("#player-pass").on("click", playerPass);
};

$(main);
