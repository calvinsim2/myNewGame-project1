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

  // class for background colour change.
  const class_bg_yellow = "bg-yellow";
  const class_bg_grey = "bg-grey";

  //----------------------------- General CSS modification functions ---------------------------
  const addAndRemoveColour = function (element, class_add, class_remove) {
    element.addClass(class_add);
    element.removeClass(class_remove);
  };
  // =========================display About(How to play) for users =====================================
  const showAbout = function () {
    $("#about-description").show();
    $("#show-intro-page").hide();
  };

  const offAbout = function () {
    $("#about-description").hide();
    $("#show-intro-page").show();
  };

  // ========================= Rename players =====================================
  const setPlayer1Name = function () {
    $("#name-player0").text($("#player0-name").val());
    const player1_name = $("#name-player0").text();
    players_name[0] = player1_name;
  };
  const setPlayer2Name = function () {
    $("#name-player1").text($("#player1-name").val());
    const player2_name = $("#name-player1").text();
    players_name[1] = player2_name;
  };
  const setPlayer3Name = function () {
    $("#name-player2").text($("#player2-name").val());
    const player3_name = $("#name-player2").text();
    players_name[2] = player3_name;
  };
  const setPlayer4Name = function () {
    $("#name-player3").text($("#player3-name").val());
    const player4_name = $("#name-player3").text();
    players_name[3] = player4_name;
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

    $("#show-game-page").show();
    $("#show-intro-page").hide();
    $("#about-description").hide();
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
        $(`.player-${i}`).css("opacity", "1");
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
    $("#prestart-image").show();
    if (current_game_mode === game_mode[1]) {
      $("#prestart-image2").show();
    }

    $("#show-game-page").hide();
    $("#show-intro-page").show();
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

  //----------- Call switching function ----------------------------
  const switchPlayer = function () {
    switchPlayerFunction(players_playing, activePlayer);
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
          `🎉 ${players_name[activePlayer]} wins! Congatulations! 🎉`
        );
        for (let i = 0; i < players_playing; i++) {
          if (i !== activePlayer) {
            $(`.player-${i}`).css("opacity", "0.4");
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
      if (current_game_mode === game_mode[0]) {
        let dice_value = Math.trunc(Math.random() * 6 + 1);
        $("#dice1").attr("src", `./dice/dice-${dice_value}.jpg`);
        $("#prestart-image").hide();
        if (dice_value !== 1) {
          currentScore += dice_value;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
          // trigger flashpoint event here.
        } else {
          rolledAOne();
          switchPlayer();
        }
      } else if (current_game_mode === game_mode[1]) {
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

  // event listener - check if player decide to change their names
  $("#player0-name").on("change", setPlayer1Name);
  $("#player1-name").on("change", setPlayer2Name);
  $("#player2-name").on("change", setPlayer3Name);
  $("#player3-name").on("change", setPlayer4Name);
  // event listener - select game Mode.
  $("#prestart-image2").hide();
  $("#dice2").hide();
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
  $("#about-description").hide();

  // event listener - begin game.
  $("#show-game-page").hide();
  $("#boom").hide();
  $(".start-game").on("click", startGame);
  // event listener - during game.
  $("#player-reset").on("click", restartGame);
  $("#player-roll").on("click", diceRoll);
  $("#player-pass").on("click", playerPass);
};

$(main);

//========================================================================================================================
// alibaba test codes come here.

// if (
//   total_scores[activePlayer] >= win_points / 2 &&
//   chance_player[activePlayer] > 0
// ) {
//   flashpointEvent();
// }

// const gambleAccepted = function (player_total) {
//   const chance_roll = Math.trunc(Math.random() * 4 + 1);
//   if (chance_roll !== 1) {
//     player_total += 10;
//     return player_total;
//   } else {
//     player_total = player_total / 2;
//     return player_total;
//   }
// };
// const gambleDeclined = function () {
//   $(".flashpointevent").hide();
// };

// const flashpointEvent = function () {
//   chance_player[activePlayer] = 0;
//   $(".flashpointevent").show();
//   $(".accept-gamble").on("click", gambleAccepted);
//   $(".decline-gamble").on("click", gambleDeclined);
// };
