# Lottery Technical Test

### Installation & Running
```
npm i
npm start
```

The start command will start the game using the webpack dev server.
You can also run a production build with the following command:  
```
npm run build
```
>Note:  
>This is built using Node v20.5.0 
>You may encounter issues building webpack with older versions of node. 
>If you encounter errors I recommend using [Node Version Manager](https://github.com/nvm-sh/nvm) to quickly switch between versions without breaking any existing environment.

### Release Version
Latest build hosted here:  
https://www.orbonis.co.uk/games/lottery/

### Forces
You can use the console command `setWinningBalls([1, 2, 3, 4, 5, 6])` to force a particular win.  
You can also use the console command `setWinningBallsToSelection()` to force the win to the current selection.
This is only available on the development build of the game, so cannot be used in the release version.  
