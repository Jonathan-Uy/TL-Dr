<a name="readme-top"></a>

# TL;Dr.
TL;Dr. is a web application that helps summarize doctor notes to improve the patient handoff process, and to make discharge summaries more accessible to patients. Created by Alex Yu, Jonathan Uy, Danny Foley, and Lincoln Saha as a submission for HackMIT 2022.

<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

![Screenshot](https://github.com/Jonathan-Uy/TL-Dr/blob/main/samples/screenshot.png)

TL;Dr. reduces medical error that occurs at handoff and discharge stages of patient care. It does this by standardizing and automating the reporting procedure to provide higher quality communication from doctor-to-doctor and doctor-to-patient.

We use OpenAI's GPT-3 to summarize lengthy handoff notes into a standard format called IPASS. This is useful for hospitalists who usually work 7 on 7 off shifts: working with patients for a week before passing them to another hospitalist.

Another source of medical error is after hospital treatment, when a patient fails to properly read the discharge summary which may explain how to conduct check-ups after surgery, important things to avoid, and when to next call their doctor. This is because the summaries usually contain medical jargon and can be difficult for non-native English speakers. So, we use GPT-3's summarization and translation features to allow outpatients to better understand their discharge summaries.

Our project was awarded First Place in the Patient Safety Challenge sponsored by the Pittsburgh Regional Health Initiative at HackMIT.

### Built With

[![React][React]][React-url]
[![TypeScript][TypeScriptLang]][TS-url]
[![Express][Express]][Express-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![Python][Python]][Python-url]
[![FastAPI][FastAPI]][FastAPI-url]
[![OpenAI][OpenAI]][OpenAI-url]

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

Ensure that `node`, `npm`, and `python` are installed.

### Installation

1. Clone the repository.
   ```sh
   git clone https://github.com/Jonathan-Uy/TL-Dr.git
   ```
2. Run the following command from the root directory.
   ```sh
   # On Windows machines
   start setup.bat

   # On Mac/Linux machines
   ./setup.sh
   ```
3. Run the following command from `./api/python`.
    ```sh
    pip install -r requirements.txt
    ```
3. Enter the values in `./api/ts/.env`.
   ```
   MONGODB_URI=
   JWT_SECRET=
   OPENAI_API_KEY=
   PYTHON_API_URL=
   MAILER_PORT=
   MAILER_HOST=
   MAILER_USER=
   MAILER_PASS=
   ```

## Usage

To start the app, run the following command from the root directory.
```sh
npm run dev
```
Alternatively, the following commands can be used to run each of the services separately.
```sh
# Start the frontend
npm run app

# Start the Express backend
npm run ts

# Start the Python backend
npm run py
```

## Contributing

If you have a suggestion that would make this better, please fork the repository and create a pull request. Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

Thanks to the following people who helped greatly during the development of this project:

* Isaac Chua
* Cheralyn Johnson

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Links and images for the Built With section -->

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[TypeScriptLang]: https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/

[Express]: https://img.shields.io/badge/Express-FFFFFF?style=for-the-badge&logo=express&logoColor=black
[Express-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/

[Python]: https://img.shields.io/badge/Python-2B5B84?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[FastAPI]: https://img.shields.io/badge/FastAPI-009485?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/

[OpenAI]: https://img.shields.io/badge/OpenAI-000000?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-url]: https://openai.com/