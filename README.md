# Barbaros' Summer School
Barbaros' Summer School is a web visual novel with implemented minigames on the way which aims to improve player's English skills.

## How to play
1. Open the web app and scroll down to see the available chapters.
2. Only the first chapter will be available by the default.
3. Successfully finish the first chapter in order to play the next.

## Chapters
- Chapters are made of two things: *Speech* and *Minigames*
    - While a speech is in progress. You see 3 elements: The speaker, speech bubble and your remaining hearts.
    - While a minigame is in progress. You can see varied menus depending on the type of the minigame.
- Every chapter has its own story and components located in the `/game` folder called `/game/chapterX.js`. 
- To unlock a further chapter, you need to finish the chapter before it first.
- You get 3 hearts at the start of every chapter. When you incorrectly answer a minigame, you lose a heart. When you lose all 3 hearts, you get 2 options to Retry the current chapter or Return to the menu

### Minigames
- **Quiz**: There is a question and 4 answer choices. Only one answer is correct.
- **Grammar**: There is a sentence with a missing word. Complete the sentence by typing the correct word.
- **Listening**: There is a listening track, a question and 4 answer choices. Only one answer is correct.
- **Form A Sentence**: There are enough words to form a grammatically correct sentence. Organize them to form the sentence.

### Technical
- This project uses classes and modular scripting simultaneously
- On the main menu, there are rotating pictures of the characters and the bacgkrounds which can be found in the chapters
- The unlocked chapters are saved through `localStorage`

### Notes
This project was made for my Bilsem research project, to be used as an example
I had so much fun working on this project even though its just 2 chapters
Its also based on a dream of mine :>
