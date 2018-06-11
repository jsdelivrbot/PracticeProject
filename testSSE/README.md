# flask + celery를 이용한 비동기 처리

flask로 서비스를 작성할 때, 서버에서 시간이 걸리는 작업을 할 때가 있다.

그러면 웹 클라이언트에서 request를 보낸뒤에 계속해서 기다려야 하는데, 그러한 부분을 조금이나마 개선하기 위해서 비동기 처리를 celery를 이용해서 적용해 보았다.



front 폴더 안에는 create-react-app으로 생성된 react 프로젝트가 있으며 yarn build의 결과물인 build 디렉토리를 flask 서버가 바라본다. 즉 제대로 동작을 시키려면 yarn build한 다음에 python app.py를 실행해줘야 한다. 참고로 python은 버전 3이다.



개발환경

```
# 백엔드
Flask==0.12.2
celery==4.1.1
Werkzeug==0.14.1
flask_sqlalchemy==2.3.2

// 프론트엔드
"prop-types": "^15.6.1",
"react": "^16.4.0",
"react-dom": "^16.4.0",
"react-scripts": "1.1.4"

-- 기타
macOS High Sierra 10.13.4
Redis 4.0.9
```

