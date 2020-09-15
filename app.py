import os
import json
from flask import Flask, request, jsonify, redirect, url_for, render_template, send_file, send_from_directory, Blueprint
from datastore.schema import Session, User


app = Flask(__name__, template_folder='./dist')
session = Session()


# host static files at "/api/static"
static_folder = Blueprint('static', __name__, static_url_path='/api/static', static_folder='./static')
app.register_blueprint(static_folder)


# host dist at ""
dist_folder = Blueprint('dist', __name__, static_url_path='', static_folder='./dist')
app.register_blueprint(dist_folder)


# --------------------------------------------------------------------------------
# CONSTANTS
# --------------------------------------------------------------------------------

DOWNLOAD_DIRECTORY = "static/images"
DIST_DIRECTORY = "dist"

# Heroku sets "NODE_ENV" to "production"
IS_PRODUCTION = os.environ.get('NODE_ENV') == 'production'
DEBUG = True if not IS_PRODUCTION else False
PORT = 5000 if not IS_PRODUCTION else os.environ.get('PORT')

# --------------------------------------------------------------------------------
# FUNCTIONS
# --------------------------------------------------------------------------------

# --- add in your functions here
# --- or remove this section and import another file

# --------------------------------------------------------------------------------
# ROUTES
# --------------------------------------------------------------------------------


class Response():
  def __init__(self, success=False, data=None, error=None, message=None):
    self.success = success 
    self.data = data 
    self.error = error 
    self.message = message 

  def to_json(self):
    return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


# --- NOTE: webpack config proxy is set up to reroute any "/api/..." requests to this backend.
# --- It's advised that you prefix any new routes with "/api"



@app.route('/api/fetchUserTasks', methods=['GET'])
def fetch_user_tasks():
  response = Response()
  name = request.args.get('name')

  try:
    user = session.query(User).filter_by(name=name).first()
    data = {'id': user.id, 'task1': user.task1, 'task2': user.task2, 'task3': user.task3, 'task4': user.task4, 'task5': user.task5 }
    response = Response(success=True, data=data, message="Successfully found user tasks")
  except Exception as e:
    response = Response(error=e, message='Error fetching all users')
  finally:
      session.close()

  return response.to_json()



@app.errorhandler(404)
def page_not_found(e):
  ''' GET
    - if the route doesn't exist, return index.html
    - useful if using React Router
  '''

  IS_PRODUCTION = True
  if (IS_PRODUCTION):
    return render_template('index.html')
  else:
    return render_template('index.html')

# --------------------------------------------------------------------------------
# START THE APP
# --------------------------------------------------------------------------------

if __name__ == '__main__':
  print('::: {}'.format(PORT))
  app.run(debug=DEBUG, host='0.0.0.0', port=PORT)