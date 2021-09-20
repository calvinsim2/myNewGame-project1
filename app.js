const main = function () {
  const game_mode = ["pig", "big-pig"];
  let current_game_mode = game_mode[0];
  let game_on;
  let win_points;
  let total_scores;
  let currentScore;
  let activePlayer;
  let players_playing = 2;

  const showAbout = function () {
    $("#about-description").show();
    $("#show-intro-page").hide();
  };

  const offAbout = function () {
    $("#about-description").hide();
    $("#show-intro-page").show();
  };

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
  // bring user into game page, hides intro and about page.
  // set initial conditions.
  const startGame = function () {
    $("#show-game-page").show();
    $("#show-intro-page").hide();
    $("#about-description").hide();
    game_on = true;
    win_points = 10;
    total_scores = [0, 0, 0, 0];
    currentScore = 0;
    activePlayer = 0;
  };

  // reset scores for all players.
  // - jS set back to default conditions
  // - css set back to player 1
  // - move player back to selection page.
  const restartGame = function () {
    game_on = false;
    for (let i = 0; i < 4; i++) {
      if (i !== activePlayer) {
        $(`.player-${i}`).fadeIn(400, function () {
          $(`.player-${i}`).css("opacity", "1");
        });
      }
    }
    activePlayer = 0;
    $("#announce").text("May the odds be in your favour").css("color", "black");
    total_scores = [0, 0, 0, 0];
    currentScore = 0;
    for (let i = 0; i < 4; i++) {
      $(`#total-score-player${i}`).text("0");
      $(`.current-player${i}`).text("0");
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
  // notification if 1 is rolled.
  const rolledAOne = function () {
    $("#boom").show();
    setTimeout(() => {
      $("#boom").hide();
      $("#boom").text("💥 BOOM! 💥");
    }, 2000);
  };

  //=============== SWITCHING TURN FUNCTIONS =====================================================

  // ---- define the actual switching logic --------------------
  const switchbacktoPlayer1 = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-0`).attr("id", "player-active");
    $("#announce").text("Player 1 Turn!").css("color", "red");
    activePlayer = 0;
  };
  const switchtoPlayer2 = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-${activePlayer + 1}`).attr("id", "player-active");
    $("#announce").text("Player 2 Turn!").css("color", "gold");
    activePlayer += 1;
  };
  const switchtoPlayer3 = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-${activePlayer + 1}`).attr("id", "player-active");
    $("#announce").text("Player 3 Turn!").css("color", "lawngreen");
    activePlayer += 1;
  };
  const switchtoPlayer4 = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-${activePlayer + 1}`).attr("id", "player-active");
    $("#announce").text("Player 4 Turn!").css("color", "mediumblue");
    activePlayer += 1;
  };

  // ---- define switching logic for DIFFERENT GAME MODES --------------------
  const switchPlayerfor2 = function () {
    if (activePlayer === 0) {
      switchtoPlayer2();
    } else {
      currentScore = 0;
      switchbacktoPlayer1();
    }
  };

  const switchPlayerfor3 = function () {
    if (activePlayer === 0) {
      switchtoPlayer2();
    } else if (activePlayer === 1) {
      switchtoPlayer3();
    } else if (activePlayer === 2) {
      currentScore = 0;
      switchbacktoPlayer1();
    }
  };

  const switchPlayerfor4 = function () {
    if (activePlayer === 0) {
      switchtoPlayer2();
    } else if (activePlayer === 1) {
      switchtoPlayer3();
    } else if (activePlayer === 2) {
      switchtoPlayer4();
    } else if (activePlayer === 3) {
      switchbacktoPlayer1();
    }
  };

  //----------- Determine which switching logic is to be executed ----------------------------
  const switchPlayer = function () {
    if (players_playing === 2) {
      switchPlayerfor2();
    } else if (players_playing === 3) {
      switchPlayerfor3();
    } else {
      switchPlayerfor4();
    }
  };

  //======================== In-game button functions ================================================
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
        for (let i = 0; i < 4; i++) {
          if (i !== activePlayer) {
            $(`.player-${i}`).fadeTo(400, 0.4);
          }
        }
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

  $(".about").on("click", showAbout);
  $(".off-about").on("click", offAbout);
  $("#about-description").hide();
};

$(main);

//========================================================================================================================
// alibaba test codes come here.

// const playerPass = function () {
//   if (game_on) {
//     total_scores[`${activePlayer}`] += currentScore;
//     $(`#total-score-player${activePlayer}`).text(
//       `${total_scores[activePlayer]}`
//     );

//     if (total_scores[`${activePlayer}`] >= win_points) {
//       $("#announce").text(
//         `🎉 Player ${activePlayer + 1} wins! Congatulations! 🎉`
//       );
//       currentScore = 0;
//       game_on = false;
//     } else {
//       switchPlayer();
//     }
//   }
// };
