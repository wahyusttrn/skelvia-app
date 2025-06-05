# Skelvia

**Skill that Counts. Classes that Matter.**

---

## About Skelvia

Skelvia is a educational platform designed to bridge the gap between online courses, immersive bootcamps, and traditional form of education. It offers a highly curated, cohort-based learning experience where students can enroll in multiple classes with a maximum limit, ensuring focused and effective skill acquisition.

---

## Tech Stack

This app was built under monolithic architecture.
- Frontend: EJS | Tailwind | DaisyUI 
- Backend: Node.js | Express | Sequelize
- Database: PostgreSQL 
- Authentication: Express Session  
- Streaming: Integration with YouTube Embed
- Deployment: GitHub Repository

---

## First setup
(only for author's note. don't run this again)

__Modelling/Migrating__
```
npx sequelize init
npx sequelize model:create --name User --attributes fullName:string,username:string,email:string,password:string,role:string
npx sequelize model:create --name UserProfile --attributes profilePicUrl:string,aboutMe:string,sumGraduate:integer
npx sequelize model:create --name Lecture --attributes title:string,lecturerName:string,imageUrl:string,difficulty:string,price:integer,upVote:integer
npx sequelize model:create --name Challenge --attributes title:string,challengeDetail:text,LectureId:integer
npx sequelize model:create --name UserWork --attributes answer:text,ChallengeId:integer,UserId:integer
npx sequelize model:create --name UserLecture --attributes UserId:integer,LectureId:integer

npx sequelize migration:create --name add-FK-to-UserProfile
```

__Seeding__
```
npx sequelize seed:create --name seed-Users
npx sequelize seed:create --name seed-UserProfiles
npx sequelize seed:create --name seed-Lectures
npx sequelize seed:create --name seed-Challenges
npx sequelize seed:create --name seed-UserWorks
npx sequelize seed:create --name seed-UserLectures
```

---

## After Clone (??)
```
npm i
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

---

## Routes
GET '/' __(Landing page)__
GET '/login' __(Login page)__
POST '/login' __(Login page)__
GET '/register' __(Register page)__
POST '/register' __(Register page)__

GET '/profile' __(Shows my profile detail)__

GET '/lectures' __(Shows all Lectures and the Challenges title)__
GET '/lectures/:lectureId' __(Shows lecture details)__
GET '/lectures/:lectureId'/buy __(Buy lecture, add UserLectures)__

GET '/myLectures' __(Shows all my lecture)__
GET '/myLectures/:lectureId' __(Shows my lecture detail and all the Challenges)__
GET '/myLectures/:lectureId/challenges/:challengeId' __(Shows question and answer text area)__
POST '/myLectures/:lectureId/challenges/:challengeId' __(POST answer)__
GET '/myLectures/:lectureId/challenges/:challengeId/edit' __(Edit answer)__
POST '/myLectures/:lectureId/challenges/:challengeId/edit' __(POST answer)__
GET '/myLectures/:lectureId/challenges/:challengeId/delete' __(Delete answer)__