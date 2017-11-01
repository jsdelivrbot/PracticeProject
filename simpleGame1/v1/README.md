# v1

## Goal
Translating v0 version code to object oriented code.

  

## js Structure
```
Model
    background data
    player data
    obstables data (obstacle, obstacleManager)

Controller
    player data, obstacles data is refreshed.
    keyboard eventListener added

Renderer
    it renders the viewarea at 60 frames.
```

## checkList



### Model

- [ ] Player constructor setting
- [ ] Player method - jump, toggleJump
- [ ] Obstacle constructor setting
- [ ] Obstacle method - move, crashCheck, areaCheck
- [ ] ObstacleManager constructor setting
- [ ] ObstacleManager method - add, removeFirst, move, getOne, makeRandomObstacle





### Controller
- [ ] Controller constructor setting
- [ ] Controller method - run, addObstacle, removeObstacle, removeObstacle
- [ ] Controller method - jump, crashCheck, firstObstacleCheck, showObt
- [ ] Controller EventListener 




### Renderer

- [ ] Renderer constructor settig
- [ ] Render method - render
- [ ] Render display implementation