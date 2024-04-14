# OSPMS

Frontend of Open Source Project Management System . The OSPMS is a powerful and flexible tool designed to help individuals and teams efficiently manage their projects in an open-source environment. It provides a comprehensive suite of features to streamline project planning, tracking, collaboration.

## Getting Started

To start the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://gitlab.mindfire.co.in/foss-management/foss-pm-fe.git

2. Navigate to the project directory
   ```bash
   cd foss-pm-fe

3. Install the packages
    ```bash
    npm i

4. Start the project
    ```bash
    npm run dev

## Features

Roles of user:- admin , employee

1. Login using github username.
2. Admin can add , update , delete users.
3. Employee can add , delete open source project request.
4. Admin can accept and reject requests.
5. When request is accepted automatically github repo will be created.
6. Organizations are fetched directly from github profile.
7. Dashboard for every project having details of : contributors , issues , forks , commits , pull requests.
8. Dashboard for every request having details of request and notes section to add message.
9. Employee can add contributors on any request on request addition.
10. Total contributors page showcasing contributors from all the projects.

## Technologies Used

1. **[Vite](https://vitejs.dev/)**: Fast, opinionated web dev build tool that serves your code via native ES modules.
2. **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
3. **[ESLint](https://eslint.org/)**: Pluggable JavaScript linter to find and fix problems in your code.
4. **[Zustand](https://github.com/pmndrs/zustand)**: A small, fast and scalable barebones state-management solution.
5. **[Shadcn/ui](https://github.com/shadcn/ui)**: UI library for designing components.
6. **[Ant Design](https://ant.design/)**: A design system for enterprise-level products.
7. **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.

