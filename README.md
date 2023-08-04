# Lottery Technical Test

### Installation & Running
```
npm i
npm start
```

The start command will start the game using the webpack dev server.
You can also run a production build with the following command:  
`npm run build`

### Release Version
Latest build hosted here:  
https://www.orbonis.co.uk/games/lottery/

### Forces
You can use the console command `setWinningBalls([1, 2, 3, 4, 5, 6])` to force a particular win.  
You can also use the console command `setWinningBallsToSelection()` to force the win to the current selection.
This is only available on the development build of the game, so cannot be used in the release version.  
