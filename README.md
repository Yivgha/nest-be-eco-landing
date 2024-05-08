# Eco landing React App

![https://img.shields.io/badge/-Github-black?logo=github&logoColor=white&style=plastic](https://img.shields.io/badge/-Github-black?logo=github&logoColor=white&style=plastic) ![https://img.shields.io/badge/-JavaScript-FFFF00?logo=javascript&logoColor=black&style=plastic](https://img.shields.io/badge/-JavaScript-FFFF00?logo=javascript&logoColor=black&style=plastic) ![https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square) ![https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=plastic](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=plastic) ![https://img.shields.io/badge/-Node.js-228B22?logo=nodedotjs&logoColor=white&style=plastic](https://img.shields.io/badge/-Node.js-228B22?logo=nodedotjs&logoColor=white&style=plastic) ![https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white) ![https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=redux&logoColor=white](https://img.shields.io/badge/-Redux-764ABC?style=flat&logo=redux&logoColor=white)

This is pet project created with React, Redux plus Nest.js/Heroku backend and PostgreSQL database.

# Main page

Just to confirm this backend server works properly, i'm gonna show you response from different endpoints. On main page you'll see custom greeting:

![Main page](./src/assets/main_be.jpg)

# Users

If you open api on /user endpoint, you can see data about all users. Data is fake, but just in case passwords are blurred. You can create new user on /user +post method.

![User page](./src/assets/users.jpg)

# Deals

On /deals endpoint you can see all deals and basic info about them. The hardest thing to add was image, which you should upload via form and then store somewhere and reach via correct path on frontend.

![Deals page](./src/assets/deals.jpg)

On /deal/:id you can reach info about one concrete deal.

![Deal page](./src/assets/deal.jpg)

For now this is all logic added in project and you can't reach server manually, because heroku isn't free to play.
