//Zandile 

//Show the instructions before the game begins
alert(
  "Welcome to ESCAPE THE EVIL AI!\n\n" +

  "You find yourself in a dark room with a flashing computer screen.\n" +
  "A robotic voice echoes from the speakers:\n\n" +

  "'Hello, human! I have trapped you inside my digital fortress!\n" +
  "There are rooms to explore, clues to discover and choices to make.\n" +
  "But be careful - your earlier decisions may change what happens next!\n" + 
  "Only your logic can help you escape!'"
);

alert(
  "You must explore three locations:\n" +
  "1. The Security Room\n"+
  "2. The Power Room\n" +
  "3. The Exit Chamber\n\n" +

  "Each room contains clues or choices that could help you escape.\n\n" +
  "Your mission is to find the access key, restore the power if " +
  "necessary, and reach the exit before the evil AI catches you."
);

alert(
  "NOTE:\n" +
  "Use the numbered choices in each prompt.\n" +
  "You can return to the Security Room and revisit places.\n" + 
  "Your progress will be remembered.\n\n" +

  "TO START:\n" + 
  "Right-click, select Inspect, then select Console.\n" + 
  "Press Cancel in any prompt to end the game."
);


  //Luis
  //My part: Power Room, Exit Chamber, endings and restart.
  //It reuses hasAccessKey and powerRestored (declared below in Obadea's part)

  //Extra progress variables for the Power Room and Exit Chamber.
let hasFuse = false;
let aiAlert = 0;
const MAX_ALERTS = 3;

 //Ends the game safely. The Security Room loop (Obadea's code) asks for one
 //last prompt; with this stub it receives "Cancel" and closes with its own
 //"Game over" message, so nothing keeps running and no error appears.

function stopGame() {
  window.prompt = function () { return null; };
  console.log("Game Stopped!");
}

//Resets all items and decisions for a new game.

function resetGame() {
  hasAccessKey = false;
  powerRestored = false;
  hasFuse = false;
  aiAlert = 0;
  console.log("NEW GAME: All your progress is right now in 0");
}

function endGame(message = "Game Over...") {
  console.log("ENDING: " + message.split("\n")[0]);
  alert(message);

  if (confirm("Do you want to play again?")) {
    resetGame();
    alert(
      "The fortress resets itself...\n" +
      "You wake up again in the Security Room. Everything is back to the start."
    );
  } else {
    stopGame();
  }
}

//ROOM 2: Power Room

function powerRoom() {
  console.log("Location: Power Room");
  alert(
    "You're in the Power Room. \n" +
    "A huge generator stands in the middle of the room and a toolbox sits " +
    "next to it. A corridor leads to the Exit Chamber."
  );

  while (true) {
    let choice = prompt(
      "POWER ROOM - What do you want to do?:\n" +
      "1. Inspect the generator\n" +
      "2. Search the toolbox\n" +
      "3. Go to the Exit Chamber\n" +
      "4. Return to the Security Room"
    );

    //Pressing Cancel ends the game.
    if (choice === null) {
      stopGame();
      return;
    }

    choice = choice.trim();

    if (choice === "1") {
      if (powerRestored) {
        alert("The generator is already running. The power is ON.");
      } else if (hasFuse) {
        powerRestored = true;
        console.log("The generator was repaired. Power restored.");
        alert(
          "You install the fuse in the generator.\n" +
          "It roars to life - the lights turn on!\n\n" +
          "Progress saved: power restored."
        );
      } else {
        alert(
          "The generator is dead. A FUSE is missing.\n" +
          "Maybe you can find one somewhere nearby..."
        );
      }
    } else if (choice === "2") {
      if (hasFuse || powerRestored) {
        alert("You already searched the toolbox - it is empty now.");
      } else {
        hasFuse = true;
        console.log("The fuse was found in the toolbox.");
        alert(
          "You search the toolbox and find a FUSE!\n\n" +
          "Progress saved: fuse collected."
        );
      }
    } else if (choice === "3") {
      //exitChamber() returns true when the game has finished
      if (exitChamber()) {
        return;
      }
    } else if (choice === "4") {
      alert("You go back to the Security Room.");
      return;
    } else {
      alert("Invalid choice. Type 1, 2, 3 or 4.");
    }
  }
}

//ROOM 3: Exit Chamber
//Returns true if the game has ended, false if the player goes back.

function exitChamber() {
  console.log("Location: Exit Chamber");
  alert(
    "You're in the Exit Chamber.\n" +
    "A massive steel door blocks your way out. There is a card reader next to it\n" +
    "and a big red emergency lever. \n" +
    "Alert level of the evil AI: " + aiAlert + "/" + MAX_ALERTS
  );

  while (true) {
    let choice = prompt(
      "EXIT CHAMBER - What do you want to do?\n" +
      "1. Use the access key on the door\n" +
      "2. Pull the red emergency lever\n" +
      "3. Go back to the Power Room"
    );

    //Pressing Cancel ends the game
    if (choice === null) {
      stopGame();
      return true;
    }

    choice = choice.trim();

    if (choice === "1") {
      if (hasAccessKey && powerRestored) {
        endGame(
          "YOU ESCAPED!\n\n" +
          "The reader beeps, the door slides open and daylight floods in.\n" +
          "The evil AI screams: 'Impossible! How did you do it?!'\n\n" +
          "Your logic won. Congratulations!"
        );
        return true;
      }

      aiAlert++;
      console.log("The evil AI detected a mistake. Alert: " + aiAlert);

      if (!hasAccessKey) {
        alert(
          "You have no access key. The door stays locked!\n" +
          "The evil AI detects you. Alert level: " + aiAlert + "/" + MAX_ALERTS
        );
      } else {
        alert(
          "You have the key, but the reader is dead - there is no power!\n" +
          "The evil AI detects you. Alert level: " + aiAlert + "/" + MAX_ALERTS
        );
      }

      if (aiAlert >= MAX_ALERTS) {
        endGame(
          "CAUGHT!\n\n" +
          "The evil AI has detected you too many times!\n" +
          "The walls are closing and the fortress will lock you forever..."
        );
        return true;
      }
    } else if (choice === "2") {
      //Unsuccessful ending (BAD DECISION!)
      endGame(
        "BAD DECISION!\n" +
        "You made a fatal mistake in the fortress and the game is over"
      );
      return true;
    } else if (choice === "3") {
      alert("You go back to the Power Room!");
      return false;
    } else {
      alert("Invalid choice. Type 1, 2 or 3.");
    }
  }
}

 //Obadea

//Shared game progress - remembered across rooms.
//Luis: use these variables in the Power Room and Exit Chamber, do not redeclare them.
//powerRestored should be set to true when the generator is repaired.
let hasAccessKey = false;
let powerRestored = false;

//Room 1: Security Room
function securityRoom() {
  alert(
    "You are in the Security Room.\n\n" +
    "You discover a computer and a locked cabinet."
  );

  while (true) {
    let choice = prompt(
      "What do you want to do?\n\n" +
      "1. Search the cabinet\n" +
      "2. Check the computer\n" +
      "3. Leave for another room"
    );

    //Pressing Cancel ends the game
    if (choice === null) {
      alert("Game over. Thanks for playing!");
      return;
    }

    choice = choice.trim();

    if (choice === "1") {
      if (hasAccessKey) {
        alert("You already searched the cabinet - you have the access key.");
      } else {
        hasAccessKey = true;
        alert(
          "You force the locked cabinet open and find... the ACCESS KEY!\n\n" +
          "Progress saved: access key collected."
        );
      }
    } else if (choice === "2") {
      alert(
        "The computer screen flickers and shows a clue about the exit:\n\n" +
        "'The Exit Chamber lies beyond the Power Room.\n" +
        "The exit door opens only for one who carries the access key\n" +
        "and restores the power.'"
      );
    } else if (choice === "3") {
      leaveSecurityRoom();
    } else {
      alert("Invalid choice. Type 1, 2 or 3.");
    }
  }
}

//Hand-off point: when Luis's Power Room is ready it is called here automatically.
function leaveSecurityRoom() {
  if (typeof powerRoom === "function") {
    powerRoom();
  } else {
    alert(
      "The passage to the Power Room is still sealed.\n" +
      "(The Power Room is not built yet.)\n\n" +
      "You stay in the Security Room."
    );
  }
}

//The game starts here in the Security Room.
//Luis: declare your rooms as functions (powerRoom, exitChamber) and they will
//be reached from here - function declarations can appear anywhere in this file.
securityRoom();
