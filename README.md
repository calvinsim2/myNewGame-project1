// PIG GAME -- SEI 32 PROJECT 1

- Description

Although the game name as a 'Pig' word in it, it doesn't involves any pigs unfortunately. 😂
Pig game is a great game to be played with friends, and it doesn't involve any skill, just luck!
This game do not require the use of any special tools or equipments, just a dice and something
to record your score!

- How to play

A player have two categories of scores, current and total.

Current score - This score is only temporary, and it will be resetted to 0 as soon as their turn ends!
Total score - This score is permanent, and the victor is dependent on this score, in classical games, the
winning score is 100 points.

During a player's turn, they are faced with two options :

- Roll
- Pass

Roll - If a player chooses to roll the dice, if the dice value is any value other than a 1, the scores are
accumulated into their current score. The player can then decide to roll again, or pass their turn.
Should a 1 be rolled, the player loses their turn and any current score they had accumulated on that turn!

Pass - If a player chooses to pass, any accumulated current score will be passed into their total scores.

- Game Modes

Pig mode (Classic Mode) - The classic mode of pig's game, only one dice is used in the game.

Two-Pig mode - In this mode, there are two dices being used. In two-pig mode, player's decision are the same as
explained in the classic mode.
However, in two-pig-mode, should a player rolls a 1 in EITHER of their dice, they will lose their
current accumulated score in their turn, and loses their turn.
If the player rolls a DOUBLE 1, their TOTAL score will be resetted to 0! Ouch!

- Gamble Events

Gamble event will come into play when a player's total score reaches at least HALF of the winning points, and each
player is entitled to only ONE gamble event.
In order for the gamble mode to be active, the player's total score should be in the aforementioned range, and they
have to choose to roll, for this event to trigger, should they roll a 1, the gamble event will not occur and instead
they lose their turn, but the gamble event for that particular player will not be considered as activated, thus they
are still eligible to gamble on their next turn.
During gamble event, player can decide if they want to gamble to gain an additional of 10 TOTAL points, should they
lose the gamble, they will lose HALF of their TOTAL points.

//===================== PROJECT POST MORTEM =============================================================

Approach and Process

1. What in my process and approach to this project would I do differently next time?

For my current project, I only made a few points regarding the goals of the project. In my future projects,
I will strive to break the goals down into further small parts, thus they can be more precise and easier to attain.

2. What in my process and approach to this project went well that I would repeat next time?

Prior to the actual coding of this project, I did a flowchart and wireframe to help me plan out for this project,
and thus I am able to work on my project with an objective in mind.

Code and Code Design

1. What in my code and program design in the project would I do differently next time?

For my current project, as it is my first time doing, generally most of my functions manipulate global variables
directly, which is not a very good practice. In addition, some of my codes are not DRY enough.
In my future projects, I will take note to ensure codes are DRY, and also they are maintainable before I proceed
further with the game logics and DOM.

2. What in my code and program design in the project went well? Is there anything I would do the same next time?

Utilising a general function and for loops to insert number of players and turn switching.

//=======================================================================================================

For each, please include code examples.

- Code snippet up to 20 lines.

--> general function to dictate turn switching, its short and efficient.
// activeplayer start from 0
// let max player playing be x
// last player = x - 1.
// as long as current player's index is not players_playing - 1, it means we haven't reach the last player,
// thus the turn switch is the same, + 1.

const switchPlayerFunction = function (players_playing, currentActive) {

    if (currentActive !== players_playing - 1) {
      turnPass();
    } else {
      resetToPlayer1();
    }

};

--> general function to set player's desired names.
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

- Code design documents or architecture drawings / diagrams.

Refer to drawio and png attached in 'other' files.

//=======================================================================================================

SEI Post Mortem

1. What habits did I use during this unit that helped me?

Always think about what this code, built-in functions, and data types it will take in/return prior
to writing the code.
Use console.log to troubleshoot!

2. What habits did I have during this unit that I can improve on?

Trying to simplify codes, make it more DRY. Build functions that do not directly affect global variables,
instead, opt to write more general functions, which is crucial habit to have as it helps in the maintainability
of the code in future.

3. How is the overall level of the course during this unit? (instruction, course materials, etc.)

The course is good and still manageable, but I strongly believe that for the fundamentals stage, students be given
more time to practice on them, as without this strong fundamentals, we will definitely struggle in future, a good
example is in this project, as I am still weak on functions, I struggled to build some of the logics!
