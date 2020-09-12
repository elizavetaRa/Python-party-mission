# HEROKU PYTHON REACT

A boilerplate repo to get you up and running with React, Python, and Heroku. <br/>
[See it live](https://salty-lowlands-02435.herokuapp.com/)

<br/>

**UPDATE 08.24.2020:** using [concurrently](https://www.npmjs.com/package/concurrently) for "dev" command; <br/>
**UPDATE 08.16.2020:** added SQLAlchemy; set up `user` table; set up fetch and post routes;

<br/>

# SETUP

<br/>

### DEVELOPMENT

1. Clone this repo
2. To install Node depenedencies, run `npm install` (or `yarn install` if you prefer)
3. To install Python dependencies, run `pip install -r requirements.txt`
4. Start the development environment with `npm run dev` (or `yarn dev`)
    - to start the Flask server separately, run `npm run app` (or `yarn app`)
    - to start the Webpack server separately, run `npm run client` (or `yarn client`)

<br/>

### PRODUCTION (on Heroku)

>  ( Assuming you have a Heroku account and have pushed your latest code to github )

1. Create a new Heroku project (you can do this online or through Heroku CLI)
2. **Make sure this project has _BOTH_ Node.js and Python buildpacks**
3. Connect to Heroku project you your github repo with [Heroku's github integration](https://devcenter.heroku.com/articles/github-integration)
4. Fire off the deployment

**What the deployment actually does:** <br/> Heroku will first install all the Node and Python dependencies. Then, it will see that the `package.json` has a `heroku-postbuild` command and it will run it - this command tells webpack to build the React project into a `dist` folder. After this completes, Heroku will run the specified command in the `Procfile` (npm run production), which will serve the React app which webpack just bundled. Your app is up and running with React and Python!

<br/>

### OPTIONAL

- Turn on Automatic Deployments: when you push to master (or any other specified branch), Heroku will rebuild your project and release the new version. This usually takes about 2 minutes.

- Add a Heroku Postgres Add-On: now it's full-stack!
  - heroku saves the URL for the postgres server in the ENV variable `DATABASE_URL`
  - in `schema.py`, reference this variable at `create_engine(...)`
  - SQLAlchemy should do the rest for you

---

<br/><br/><br/>

Free to use for any personal or professional project. <br/>
Reach out if you have any questions!<br/>

Created by Joe Boylson <br/>
e: joeboylson@gmail.com <br/>

