# NE-flappybird-with-raw-data

Evolving ANN which uses raw pixel data of game screen, with neuroevolution algorithm to play flappybird game.

## Concept

The game screen of 500 x 500 resolution is scaled down to 28 x 28 image and then passed to the ANN, which then decides whether to jump or not.

The point is that, we never tell ANN to which area of the game it should focus, we want it to learn that itself.