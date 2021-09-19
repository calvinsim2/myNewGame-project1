const main = function () {
  const game_mode = ["pig", "big-pig"];
  let current_game_mode = game_mode[0];
  let game_on;
  let win_points;
  let total_scores;
  let currentScore;
  let activePlayer;
  let players_playing = 2;

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

  const choose2player = function () {
    $(".player-2").hide();
    $(".player-3").hide();
    $(".player2").css("background", "yellow");
    $(".player3").css("background", "#b0c4de");
    $(".player4").css("background", "#b0c4de");
    players_playing = 2;
  };

  const choose3player = function () {
    $(".player-2").show();
    $(".player-3").hide();
    $(".player2").css("background", "#b0c4de");
    $(".player3").css("background", "yellow");
    $(".player4").css("background", "#b0c4de");
    players_playing = 3;
  };

  const choose4player = function () {
    $(".player-2").show();
    $(".player-3").show();
    $(".player2").css("background", "#b0c4de");
    $(".player3").css("background", "#b0c4de");
    $(".player4").css("background", "yellow");
    players_playing = 4;
  };

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
      $(`.player-${i}`).removeAttr("id", "player-active");
    }
    $(".player-0").attr("id", "player-active");
    $("#prestart-image").show();
    if (current_game_mode === "big-pig") {
      $("#prestart-image2").show();
    }

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

  //==== Player switch functions =====================================================

  const switchPlayerfor2 = function () {
    if (activePlayer === 0) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 2 Turn!").css("color", "gold");
      activePlayer += 1;
    } else {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(".player-0").attr("id", "player-active");
      $(".player-1").removeAttr("id", "player-active");
      $("#announce").text("Player 1 Turn!").css("color", "red");
      activePlayer = 0;
    }
  };

  const switchPlayerfor3 = function () {
    if (activePlayer === 0) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 2 Turn!").css("color", "gold");
      activePlayer += 1;
    } else if (activePlayer === 1) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 3 Turn!").css("color", "lawngreen");
      activePlayer += 1;
    } else if (activePlayer === 2) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-0`).attr("id", "player-active");
      $("#announce").text("Player 1 Turn!").css("color", "red");
      activePlayer = 0;
    }
  };

  const switchPlayerfor4 = function () {
    if (activePlayer === 0) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 2 Turn!").css("color", "gold");
      activePlayer += 1;
    } else if (activePlayer === 1) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 3 Turn!").css("color", "lawngreen");
      activePlayer += 1;
    } else if (activePlayer === 2) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-${activePlayer + 1}`).attr("id", "player-active");
      $("#announce").text("Player 4 Turn!").css("color", "mediumblue");
      activePlayer += 1;
    } else if (activePlayer === 3) {
      currentScore = 0;
      $(`.current-player${activePlayer}`).text("0");
      $(`.player-${activePlayer}`).removeAttr("id", "player-active");
      $(`.player-0`).attr("id", "player-active");
      $("#announce").text("Player 1 Turn!").css("color", "red");
      activePlayer = 0;
    }
  };

  const switchPlayer = function () {
    if (players_playing === 2) {
      switchPlayerfor2();
    } else if (players_playing === 3) {
      switchPlayerfor3();
    } else {
      switchPlayerfor4();
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
  $("#prestart-image2").hide();
  $("#dice2").hide();
  $(".pig-mode").on("click", pigMode);
  $(".bigpig-mode").on("click", bigPigMode);

  // select number of players.
  $(".player2").on("click", choose2player);
  $(".player3").on("click", choose3player);
  $(".player4").on("click", choose4player);
  $(".player-2").hide();
  $(".player-3").hide();
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
