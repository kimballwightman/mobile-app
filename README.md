To run the simulator:

1) Run Metro
  - cd /Users/kimballwightman/Repos/mobile-app/frontend
  - npx react-native start --port=8082
2) Run the backend docker container
  - cd /Users/kimballwightman/Repos/mobile-app/backend  -  new terminal window
  - docker start backend-backend-1
3) Run the app
  - cd ..
  - npx react-native run-ios   # iOS  
  - npx react-native run-android  # Android

Probably create an automated task from task manager to spin these up all at once
