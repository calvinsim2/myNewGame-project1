const main = function () {
  const game_mode = ["pig", "big-pig"];
  let current_game_mode = game_mode[0];
  let game_on;
  let win_points;
  let total_scores = [];
  let currentScore;
  let activePlayer;
  let players_playing = 2;
  let max_players = 4;
  let chance_player = [];

  // let players_name = ["Player 1", "Player 2", "Player 3", "Player 4"];
  let players_name = ["Player 1", "Player 2", "Player 3", "Player 4"];

  // class for background/text colour change.
  const class_bg_yellow = "bg-yellow";
  const class_bg_grey = "bg-grey";
  const class_text_teal = "text-teal";
  const class_text_violet = "text-violet";

  //----------------------------- General CSS modification functions ---------------------------
  const addAndRemoveColour = function (element, class_add, class_remove) {
    element.addClass(class_add);
    element.removeClass(class_remove);
  };

  //============================= Initialize game functions ===================================
  // Hide/Show required displays in intro page and starting game

  const initializeGame = function () {
    $("#prestart-image2").hide();
    $("#dice2").hide();
    $("#about-description").hide();
    $("#show-game-page").hide();
    $("#boom").hide();
    $(".flashpointevent").hide();
    $(".gamble-success").hide();
    $(".gamble-failed").hide();
  };
  // =========================display About(How to play) for users =====================================
  const showAbout = function () {
    $("#show-intro-page").hide();
    $("#about-description").fadeIn(1000);
  };

  const offAbout = function () {
    $("#show-intro-page").fadeIn(1000);
    $("#about-description").hide();
  };

  // ========================= Rename players =====================================

  const setName = function (name, input) {
    $(name).text($(input).val());
    const player_name = $(name).text();
    return player_name;
  };
  const setPlayer1Name = function () {
    players_name[0] = setName($("#name-player0"), "#player0-name");
  };
  const setPlayer2Name = function () {
    players_name[1] = setName($("#name-player1"), "#player1-name");
  };
  const setPlayer3Name = function () {
    players_name[2] = setName($("#name-player2"), "#player2-name");
  };
  const setPlayer4Name = function () {
    players_name[3] = setName($("#name-player3"), "#player3-name");
  };

  //================ GAME MODE ===========================================================

  //-- function to add and remove html class to amend bg colour.

  const pigMode = function () {
    $("#prestart-image2").hide();
    $("#dice2").hide();
    addAndRemoveColour($(".pig-mode"), class_bg_yellow, class_bg_grey);
    addAndRemoveColour($(".two-dice-pig-mode"), class_bg_grey, class_bg_yellow);
    current_game_mode = game_mode[0];
  };
  const twoDicePigMode = function () {
    $("#prestart-image2").show();
    $("#dice2").show();
    addAndRemoveColour($(".pig-mode"), class_bg_grey, class_bg_yellow);
    addAndRemoveColour($(".two-dice-pig-mode"), class_bg_yellow, class_bg_grey);
    current_game_mode = game_mode[1];
  };

  //============== NUMBER OF PLAYERS SELECTION ===========================================

  const hidePlayerDetails = function (jq1, jq2, jq3) {
    jq1.hide();
    jq2.hide();
    jq3.hide();
  };

  const showPlayerDetails = function (jq1, jq2, jq3) {
    jq1.show();
    jq2.show();
    jq3.show();
  };

  // color yellow shown ---> always equal to player_playing - 1
  // use player_playing to decide .
  // triggered by event listeners
  const selectionColourChange = function (cur_players, max) {
    for (let i = 1; i < max; i++) {
      if (i !== cur_players - 1) {
        addAndRemoveColour($(`.player${i}`), class_bg_grey, class_bg_yellow);
      } else {
        addAndRemoveColour($(`.player${i}`), class_bg_yellow, class_bg_grey);
      }
    }
  };

  const choose2player = function () {
    hidePlayerDetails($(".player-2"), $(".select-name2"), $("#player2-name"));
    hidePlayerDetails($(".player-3"), $(".select-name3"), $("#player3-name"));
    players_playing = 2;
    selectionColourChange(players_playing, max_players);
  };

  const choose3player = function () {
    showPlayerDetails($(".player-2"), $(".select-name2"), $("#player2-name"));
    hidePlayerDetails($(".player-3"), $(".select-name3"), $("#player3-name"));
    players_playing = 3;
    selectionColourChange(players_playing, max_players);
  };

  const choose4player = function () {
    showPlayerDetails($(".player-2"), $(".select-name2"), $("#player2-name"));
    showPlayerDetails($(".player-3"), $(".select-name3"), $("#player3-name"));
    players_playing = 4;
    selectionColourChange(players_playing, max_players);
  };

  //================ START & RESET GAME ==================================================
  // bring user into game page, hides intro and about page.

  const startGame = function () {
    game_on = true;
    win_points = 100;
    currentScore = 0;
    activePlayer = 0;
    // insert total scores for playing players
    for (let i = 0; i < players_playing; i++) {
      total_scores.push(0);
    }
    // insert chances for playing players
    for (let i = 0; i < players_playing; i++) {
      chance_player.push(1);
    }

    $("#show-intro-page").hide();
    $("#about-description").hide();
    $("#show-game-page").fadeIn(1000);
    $(".winning-points").text(win_points);
    $("#announce").text(`${players_name[activePlayer]}'s Turn!`);
  };
  // reset scores for all players.
  // - jS set back to default conditions
  // - css set back to player 1
  // - move player back to selection page.
  const restartGame = function () {
    game_on = false;
    for (let i = 0; i < players_playing; i++) {
      if (i !== activePlayer) {
        $(`.player-${i}`).removeClass("opacity-adjust");
      }
    }
    activePlayer = 0;
    $("#announce").text("May the odds be in your favour");
    currentScore = 0;
    for (let i = 0; i < players_playing; i++) {
      $(`#total-score-player${i}`).text("0");
      $(`.current-player${i}`).text("0");
      $(`.player-${i}`).removeAttr("id", "player-active");
    }
    total_scores = [];
    chance_player = [];
    $(`.player-${activePlayer}`).attr("id", "player-active");
    $("#prestart-image1").show();
    if (current_game_mode === game_mode[1]) {
      $("#prestart-image2").show();
    }

    $("#show-game-page").hide();
    $("#show-intro-page").fadeIn(1000);
  };

  //================= IN-GAME FUNCTIONS================================================
  // notification if 1 is rolled.

  const rolledAOne = function () {
    $("#boom").show();
    setTimeout(function () {
      $("#boom").hide();
      $("#boom").text("💥 BOOM! 💥");
    }, 1500);
  };

  const gambleSuccessful = function () {
    $(".gamble-success").show();
    $(`#total-score-player${activePlayer}`).addClass(class_text_teal);
    setTimeout(function () {
      $(".gamble-success").hide();
      $(`#total-score-player${activePlayer}`).removeClass(class_text_teal);
    }, 1500);
  };
  const gambleFailed = function () {
    $(".gamble-failed").show();
    $(`#total-score-player${activePlayer}`).addClass(class_text_violet);
    setTimeout(function () {
      $(".gamble-failed").hide();
      $(`#total-score-player${activePlayer}`).removeClass(class_text_violet);
    }, 1500);
  };

  const determineDiceValue = function (range, qty) {
    let dice = Math.trunc(Math.random() * range + 1);
    $(`#dice${qty}`).attr("src", `./dice/dice-${dice}.jpg`);
    $(`#prestart-image${qty}`).hide();
    return dice;
  };

  // setInterval(function to do, time per execution)

  const gambleAccepted = function () {
    const chance_roll = determineDiceValue(4);
    if (chance_roll !== 1) {
      total_scores[activePlayer] += 10;
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );
      $(".flashpointevent").hide();
      gambleSuccessful();
      if (total_scores[`${activePlayer}`] >= win_points) {
        winCondition(players_name, activePlayer, players_playing);
      }
    } else {
      total_scores[activePlayer] = Math.trunc(total_scores[activePlayer] / 2);
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );
      $(".flashpointevent").hide();
      gambleFailed();
    }
  };
  const gambleDeclined = function () {
    $(".flashpointevent").hide();
  };
  const flashpointEvent = function () {
    chance_player[activePlayer] = 0;
    $(".flashpointevent").show();
  };

  const winCondition = function (name, current_player, numberOfPlayer) {
    $("#announce").text(`🎉 ${name[current_player]} wins! Congatulations! 🎉`);
    for (let i = 0; i < numberOfPlayer; i++) {
      if (i !== current_player) {
        $(`.player-${i}`).addClass("opacity-adjust");
      }
    }
    currentScore = 0;
    game_on = false;
  };

  //=============== SWITCHING TURN FUNCTIONS =====================================================

  const turnPass = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-${activePlayer + 1}`).attr("id", "player-active");
    activePlayer += 1;
    $("#announce").text(`${players_name[activePlayer]}'s Turn!`);
  };

  const resetToPlayer1 = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    activePlayer = 0;
    $("#announce").text(`${players_name[activePlayer]}'s Turn!`);
    $(`.player-${activePlayer}`).attr("id", "player-active");
  };

  // activeplayer start from 0
  // let max player playing be x
  // last player = x - 1.
  const switchPlayerFunction = function (players_playing, currentActive) {
    if (currentActive !== players_playing - 1) {
      turnPass();
    } else {
      resetToPlayer1();
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
        winCondition(players_name, activePlayer, players_playing);
      } else {
        switchPlayerFunction(players_playing, activePlayer);
      }
    }
  };

  const diceRoll = function () {
    if (game_on) {
      if (current_game_mode === game_mode[0]) {
        let dice_value = determineDiceValue(6, 1);
        if (dice_value !== 1) {
          currentScore += dice_value;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
          if (
            total_scores[activePlayer] >= win_points / 2 &&
            chance_player[activePlayer] > 0
          ) {
            flashpointEvent();
          }
        } else {
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
        }
      } else if (current_game_mode === game_mode[1]) {
        let dice_value = determineDiceValue(6, 1);
        let dice_value2 = determineDiceValue(6, 2);
        if (dice_value !== 1 && dice_value2 !== 1) {
          currentScore += dice_value + dice_value2;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
          if (
            total_scores[activePlayer] >= win_points / 2 &&
            chance_player[activePlayer] > 0
          ) {
            flashpointEvent(); // possible to add additional complexity
          }
        } else if (dice_value === 1 && dice_value2 === 1) {
          total_scores[activePlayer] = 0;
          $(`#total-score-player${activePlayer}`).text("0");
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
          $("#boom").text("💥 BOOM! 💥 SCORE RESET!");
        } else if (dice_value === 1 || dice_value2 === 1) {
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
        }
      }
    }
  };

  //=============================== USER INPUTS/ EVENT LISTENERS ================================

  initializeGame();
  // event listener - check if player decide to change their names
  $("#player0-name").on("change", setPlayer1Name);
  $("#player1-name").on("change", setPlayer2Name);
  $("#player2-name").on("change", setPlayer3Name);
  $("#player3-name").on("change", setPlayer4Name);

  // event listener - select game Mode.
  $(".pig-mode").on("click", pigMode);
  $(".two-dice-pig-mode").on("click", twoDicePigMode);

  // event listener - select number of players.
  $(".player1").on("click", choose2player);
  $(".player2").on("click", choose3player);
  $(".player3").on("click", choose4player);

  hidePlayerDetails($(".player-2"), $(".select-name2"), $("#player2-name"));
  hidePlayerDetails($(".player-3"), $(".select-name3"), $("#player3-name"));

  // event listener - to show about (how to play).
  $(".about").on("click", showAbout);
  $(".off-about").on("click", offAbout);

  // event listener - begin game.
  $(".start-game").on("click", startGame);

  // event listener - during game.
  $("#player-reset").on("click", restartGame);
  $("#player-roll").on("click", diceRoll);
  $("#player-pass").on("click", playerPass);

  // event listener - gambling.
  $(".accept-gamble").on("click", gambleAccepted);
  $(".decline-gamble").on("click", gambleDeclined);
};

$(main);

//========================================================================================================================
// alibaba test codes come here.
