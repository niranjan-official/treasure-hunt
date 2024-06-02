qr-finding-game/
│
├── app/
│   ├── create/
│   │   ├── page.js
│   │   ├── CreateGameForm.js
│   ├── game/
│   │   ├── [gameId]/
│   │   │   ├── page.js
│   │   │   ├── QRScanner.js
│   │   │   ├── QuestionForm.js
│   │   │   ├── Timer.js
│   │   ├── page.js
│   ├── api/
│   │   ├── games/
│   │   │   ├── route.js
│   │   │   ├── [gameId]/
│   │   │   │   ├── route.js
│   │   │   │   ├── paths/
│   │   │   │   │   ├── route.js
│   │   └── auth/
│   │       ├── [...clerk].js
│   │       └── getUser.js
│   ├── layout.js
│   ├── globals.css
│   └── page.js
│
├── components/
│   ├── GameList.js
│   ├── GameDetail.js
│   ├── Navigation.js
│   └── QRPath.js
│
├── utils/
│   ├── generatePath.js
│
├── firebase.js
├── .env.local
├── next.config.js
├── package.json
└── README.md