# 사이트 연습 : 배달의 민족

## 목적

- Vue와 VueCLI를 활용해서 웹사이트를 만들어 본다.
- 배달의 민족 사이트를 Vue.js로 변형해서 만들어보면서 이해도를 높인다.
- Paas를 이용해서 외부 접근이 가능하게 해보면서 이해도를 높인다.



## 개발환경

- Paas : Heroku
- Server : Node.js + Express.js
- client : Vue.js, javascript, css, html
- buildTool : Webpack, VueCli
- database : MariaDB
- Editor : Visual Studio Code
- version control system : git



## 디렉토리 구성

```
practiceSite1
├── frontend/                   # frontend folder 
│   ├── build/                  # webpack config folder
│   ├── config/                 # project config folder      
│   └── src/
│   │    ├── assets             # module assets (processed by webpack):not used
│   │    ├── components         # ui components
│   │    ├── router             # router
│   │    ├── App.vue            # main app component
│   │    └── main.js            # app entry file
│   ├── static/                 # pure static assets (directly copied):not used
│   ├── index.html              # index.html 템플릿
│   ├── .postcssrc.js           # postcss config
│   ├── .eslintrc.js            # eslint config
│   ├── .editorconfig           # editor config
│   ├── .babelrc                # babel config
│   └── package.json
│
└── backend/
    ├── bin/                  # server starter files
    ├── public/               # front-end files : 사용하지 않아 git에는 생략됨
    ├── routes/               # all routes
    ├── views/                # server-side views : 사용하지 않아 git에는 생략됨
    ├── app.js                # app entry-point 
    ├── app.json              # heroku config file
    ├── package.json
    └── myprojectDB.sql       # DBdump file
```





## 개발환경 셋팅

1. ```git clone https://github.com/abhbtbb/PracticeProject.git```  을 해준다.
2. `practiceSite1/backend/myprojectDB.sql` 파일을 가지고 mysql에 직접 입력하거나 import 시킨다.
3. `practiceSite1/backend/routes/database.js` 에서 mysql 비밀번호와 DB이름을 입력해준다.
4. `frontend` 폴더와 `backend` 폴더에서 각각 `npm install` 을 해준다.
5. 터미널에서 `backend` 폴더에 들어온 다음 `npm start`를 해준다.
6. 터미널에서 `frontend` 폴더에 들어온다음 `npm run dev`를 해준다.
7. 웹사이트가 보여질 것이다. 안 보이면 `localhost:8080`으로 접속해본다.

