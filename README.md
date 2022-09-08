# tryout-board-4IAR

codes for 4iar with tryout board.

Have several versions of it, but didn't decide what version to use.
* `./4IAR_original` : original standalone version of 4iar
* `./4IAR_tryout_empty_board` : opens empty board. the progress on the board maintained until lose/win/draw.
* `./4IAR_tryout_empty_board_onlyonce` : same as above but you can open only once.
* `./4IAR_tryout_at_the_moment` : opens board with the current board position. 
* `./4IAR_tryout_at_the_moment_onlyonce` : same as above but you can open only once.

The latest discussion on what version to use:

* Current versions just open tryout board whenever participants want.
* (Dongjae) My personal experience with these versions of 4iar is that I don't need this tryout board in general. Of course I lost many times, but lost because I didnt realize what's coming (what I overlooked).
* (Dongjae) So I think we need N-alternative forced choice version of it which requires very deep search (planning) to know the answer. You can easily manipulate (or choose the specific situation from data) required planning depth with some difficulty metric such as entropy of rewards of future states.
