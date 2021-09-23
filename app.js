const main = function () {
  //========================== declare variables ==================================================
  const game_mode = ["pig", "big-pig"]; // game mode
  let current_game_mode = game_mode[0]; // current game mode
  let game_on; // decides if game is to execute
  let win_points; // define win points
  let total_scores = []; // array to store each player's total score
  let currentScore; // players current score
  let activePlayer; // token to indicate active player's turn
  let players_playing = 2; // determine the number of players in game
  let max_players = 4; // max possible number of players
  let chance_player = []; // array to store each player's chance for gamble event
  let players_name = []; // array to store player's name.

  // class for background/text colour change.
  const class_bg_yellow = "bg-yellow";
  const class_bg_grey = "bg-grey";
  const class_text_teal = "text-teal";
  const class_text_violet = "text-violet";

  //----------------------------- General CSS modification functions ---------------------------
  // add and remove class to change bg colour. (Intro screen)
  const addAndRemoveColour = function (element, class_add, class_remove) {
    element.addClass(class_add);
    element.removeClass(class_remove);
  };

  //============================= Initialize game functions ===================================
  // Hide required displays in intro page and starting game
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

  // general function to set player's desired names.
  const setName = function (name, input) {
    $(name).text($(input).val());
    const player_name = $(name).text();
    return player_name;
  };

  // give each player preset names if not specifically defined by players.
  for (let i = 0; i < max_players; i++) {
    let newName = setName($(`#name-player${i}`), `#player${i}-name`);
    players_name.push(newName);
  }

  // triggered by event listeners - on change.
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

  // hide and show player details in intro page.
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

  const selectionColourChange = function (cur_players, max) {
    for (let i = 1; i < max; i++) {
      if (i !== cur_players - 1) {
        addAndRemoveColour($(`.player${i}`), class_bg_grey, class_bg_yellow);
      } else {
        addAndRemoveColour($(`.player${i}`), class_bg_yellow, class_bg_grey);
      }
    }
  };

  // triggered by event listeners - on click --> select number of players
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

    // hide intro/about page, shift to game screen
    // shows players winning points, and text to inform player's regarding the turns.
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
        $(`.player-${i}`).removeClass("opacity-adjust"); // restore opacity, in an event if a player wins.
      }
    }
    activePlayer = 0;
    $("#announce").text("May the odds be in your favour");
    currentScore = 0;
    // For players involved in current game, restore their informations back to DEFAULT.
    for (let i = 0; i < players_playing; i++) {
      $(`#total-score-player${i}`).text("0");
      $(`.current-player${i}`).text("0");
      $(`.player-${i}`).removeAttr("id", "player-active");
    }
    total_scores = [];
    chance_player = [];
    // passes turn back to player 1.
    $(`.player-${activePlayer}`).attr("id", "player-active");

    // cover back dices up accordingly.
    $("#prestart-image1").show();
    if (current_game_mode === game_mode[1]) {
      $("#prestart-image2").show();
    }

    // return to intro page.
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

  // display to player that their gamble has paid off!
  const gambleSuccessful = function () {
    $(".gamble-success").show();
    $(`#total-score-player${activePlayer}`).addClass(class_text_teal);
    setTimeout(function () {
      $(".gamble-success").hide();
      $(`#total-score-player${activePlayer}`).removeClass(class_text_teal);
    }, 1500);
  };
  // display to player that their gamble has failed!
  const gambleFailed = function () {
    $(".gamble-failed").show();
    $(`#total-score-player${activePlayer}`).addClass(class_text_violet);
    setTimeout(function () {
      $(".gamble-failed").hide();
      $(`#total-score-player${activePlayer}`).removeClass(class_text_violet);
    }, 1500);
  };

  // function --> determine value of dice roll.
  const determineDiceValue = function (range, qty) {
    let dice = Math.trunc(Math.random() * range + 1);
    $(`#dice${qty}`).attr("src", `./dice/dice-${dice}.jpg`);
    $(`#prestart-image${qty}`).hide();
    return dice;
  };

  // if player chose to gamble.
  const gambleAccepted = function () {
    const chance_roll = determineDiceValue(4);
    // rolls 1 to 4, if not 1, players get 10 points added to their total score.
    if (chance_roll !== 1) {
      total_scores[activePlayer] += 10;
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );
      $(".flashpointevent").hide();
      gambleSuccessful();
      // check for winning condition if player has add 10 points to their score.
      if (total_scores[`${activePlayer}`] >= win_points) {
        winCondition(players_name, activePlayer, players_playing);
      }
    }
    // if a 1 is rolled, players lose the gamble, and have their total score halved.
    else {
      total_scores[activePlayer] = Math.trunc(total_scores[activePlayer] / 2);
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );
      $(".flashpointevent").hide();
      gambleFailed();
    }
  };

  // if player choses NOT to gamble.
  const gambleDeclined = function () {
    $(".flashpointevent").hide();
  };

  // trigger gamble event.
  const flashpointEvent = function () {
    chance_player[activePlayer] = 0; // set to 0 so the similar player will not be able to gamble again.
    $(".flashpointevent").show();
  };

  // display win message, make players who lost more translucent, so it is obvious who is the winner.
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

  // display (feedback) for the active player is shifted to next.
  const turnPass = function () {
    currentScore = 0;
    $(`.current-player${activePlayer}`).text("0");
    $(`.player-${activePlayer}`).removeAttr("id", "player-active");
    $(`.player-${activePlayer + 1}`).attr("id", "player-active");
    activePlayer += 1;
    $("#announce").text(`${players_name[activePlayer]}'s Turn!`);
  };
  // resets display back to player 1.
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
    // as long as current player's index is not players_playing - 1, it means we haven't reach the last player,
    // thus the turn switch is the same, + 1.
    if (currentActive !== players_playing - 1) {
      turnPass();
    } else {
      resetToPlayer1();
    }
  };

  //======================== In-game button functions ================================================

  // event listener - on lick --> pass.

  const playerPass = function () {
    // check if game is still on, we dont want players to be able to pass turns even after the game has ended.
    if (game_on) {
      // add the player's current score to their total score.
      total_scores[`${activePlayer}`] += currentScore;
      // update their total score in DOM
      $(`#total-score-player${activePlayer}`).text(
        `${total_scores[activePlayer]}`
      );

      // check winning condition.
      if (total_scores[`${activePlayer}`] >= win_points) {
        winCondition(players_name, activePlayer, players_playing);
      }
      // if no win, then switch to next player!
      else {
        switchPlayerFunction(players_playing, activePlayer);
      }
    }
  };

  // event listener - on click --> roll.
  const diceRoll = function () {
    // check if game is still on, we dont want players to be able to roll dice even after the game has ended.
    if (game_on) {
      // check if game is in - 'pig mode'
      if (current_game_mode === game_mode[0]) {
        // roll dice, call roll dice function to obtain a dice value.
        let dice_value = determineDiceValue(6, 1);
        // as long as they DON'T roll a 1, they get to keep their current points.
        if (dice_value !== 1) {
          currentScore += dice_value;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
          // check if this specific player is eligible to enter gamble event.
          // gamble event will trigger if they still have a chance, and their TOTAL points is half of the winning point.
          if (
            total_scores[activePlayer] >= win_points / 2 &&
            chance_player[activePlayer] > 0
          ) {
            flashpointEvent();
          }
        }
        // if player rolls a 1, their turn is forfeited, and their current points lost, and on to the next player!
        else {
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
        }
      }
      // check if game is in - 'two pig mode'
      else if (current_game_mode === game_mode[1]) {
        // roll both dices.
        let dice_value = determineDiceValue(6, 1);
        let dice_value2 = determineDiceValue(6, 2);
        // if both dices are NOT 1, player gets to keep their current score and continue the game.
        if (dice_value !== 1 && dice_value2 !== 1) {
          currentScore += dice_value + dice_value2;
          $(`.current-player${activePlayer}`).text(`${currentScore}`);
          if (
            total_scores[activePlayer] >= win_points / 2 &&
            chance_player[activePlayer] > 0
          ) {
            flashpointEvent();
          }
        }
        // if both shows a 1 --> player loses their TOTAL score.
        else if (dice_value === 1 && dice_value2 === 1) {
          total_scores[activePlayer] = 0;
          $(`#total-score-player${activePlayer}`).text("0");
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
          $("#boom").text("💥 BOOM! 💥 SCORE RESET!");
        }
        // if only one dice shows a 1 --> player loses their turn and the current score.
        else if (dice_value === 1 || dice_value2 === 1) {
          rolledAOne();
          switchPlayerFunction(players_playing, activePlayer);
        }
      }
    }
  };

  //=============================== USER INPUTS/ EVENT LISTENERS ================================

  initializeGame();
  console.log("game start");
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

// const diceVal = function (range, qty) {
//   let diceshow = Math.trunc(Math.random() * range + 1);
//   $(`#dice${qty}`).attr("src", `./dice/dice-${diceshow}.jpg`);
//   $(`#prestart-image${qty}`).hide();
//   return diceshow;
// };

// const determineDiceValue = function (range, qty) {
//   const myInterval = setInterval(diceVal, 100, range, qty);

//   setTimeout(function () {
//     clearInterval(myInterval);
//   }, 1000);
// };
