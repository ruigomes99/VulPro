<br>
<h2 align="center">Personal Project - VulPro</h2>

This repository contains an application made in NodeJS. This is an application intended to demonstrate the functioning of some vulnerabilities, as well as their mitigation.
<br>

## Table Of Contents
- [Overview](#overview)
  - [Important Files and Folders](#filesFolders)
- [Tech Stack](#tech)
- [Setup Your Workstation](#setup)
- [Configuration Options](#config)
- [Quick Start](#qstart)
- [Author](#authors)
- [Contribution](#contribution)
- [License](#license)

## Overview <a name = "overview"></a>
This project was made within the organization of Checkmarx. Its purpose is to provide support for my activities as a trainee.
The samples folder represents the JS samples used in my analysis.

### Important Files and Folders <a name = "filesFolders"></a>
All main configurations are found in "index.js" and "/routes/tests.js" files.

The "/routes/tests.js" file displays the application's routes. They also contain comments in order to identify each of the vulnerabilities present in the application. Most routes have a vulnerable and a non-vulnerable (mitigated) version, with the "/sec/" represents all safe routes.

The "public" and "views" folders was created to demonstrate the Cross-Site Request Forgery (CSRF) vulnerability:
- All ".ejs" files in the "views" folder represents a secure frontend using CSRF tokens produced in the backend.
- All ".html" files in the "public" folder represents a frontend vulnerable to CSRF.

## Tech Stack <a name = "tech"></a>
<details>
           <summary>Front-End</summary>
           <ul>
                <li>HTML5</li>
                <li>EJS</li>
                <li>JavaScript</li>
                <li>Fetch for API calls</li>
            </ul> 
</details>
<details>
           <summary>Back-End</summary>
           <ul>
                <li>NodeJs</li>
                <li>REST API</li>
                <li>Model-View-Controller</li>
                <li>MySQL</li>
            </ul> 
</details>

## Setup Your Workstation <a name = "setup"></a>
- Install Node.js and npm to your local workstation
- Install MySQL Server to your local workstation

## Configuration Options <a name = "config"></a>
- Import our [example DataBase](https://github.com/ruigomes99/VulPro/blob/main/config/MySQLDump.sql) to your local MySQL Server
- Configure your '/config/conMySQL.js' file with your MySQL credentials.

## Quick Start <a name = "qstart"></a>
1. Clone the repository:
```shell
git clone https://github.com/ruigomes99/VulPro.git
```
2. Change directory:
```shell
cd VulPro
```
3. Install dependencies:
```shell
npm install
```
4. Start the server:
```shell
npm start
```
5. View the website at: http://127.0.0.1:3000

## Author <a name = "author"></a>
 - [Rui Gomes](https://github.com/ruigomes99) (Checkmarx AppSecPT Trainee)

## Contribution <a name = "contribution"></a>
 - [Ricardo Gonçalves](mailto:ricardo.goncalves@checkmarx.com)

## License <a name = "license"></a>
- [MIT](https://choosealicense.com/licenses/mit/)