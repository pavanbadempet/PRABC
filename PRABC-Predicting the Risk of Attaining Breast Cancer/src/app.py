from flask import Flask, render_template, request, send_file
import numpy as np
import joblib
from feature_eng import age_group_5_years, bmi_group

app = Flask(__name__, static_url_path="/static/")

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/csv/<doc_id>')
def csv(doc_id):
    print("doc_id", doc_id)
    return send_file('static/' + doc_id , mimetype='text/data')

'''
[["age_group_5_years", "first_degree_hx", "age_menarche",
  "age_first_birth", "menopaus", "bmi_group", "biophx",
  "breast_cancer_history"]]
'''

@app.route('/predict/', methods=['GET','POST'])
def predict():
    if request.method == "POST":
        #get form data form web
        age = int(request.form.get('age'))
        weight = int(request.form.get('weight'))
        height = int(request.form.get('height'))
        relative = int(request.form.get('relative'))
        menarche = int(request.form.get('menarche'))
        first_birth = int(request.form.get('first_birth'))
        menopause = int(request.form.get('menopause'))
        biophx = int(request.form.get('biophx'))
        current_hrt =  int(request.form.get('current_hrt'))
        bmi = bmi_group(weight, height)
        

        #call preprocessDataAndPredict and pass inputs
        try:
            #pass prediction to template
            #prediction = preprocessDataAndPredict(sepal_length,sepal_width, petal_length, petal_width)            
            #prediction = preprocessDataAndPredict(float(sepal_length),float(sepal_width), float(petal_length), float(petal_width))            
            prediction = preprocessDataAndPredict(age, relative, menarche, first_birth, menopause, bmi, biophx, current_hrt)
            return render_template('predict.html', prediction = prediction)
   
        except ValueError:
            return "Please Enter valid values"
  
        pass
    pass
'''
['age_group_5_years', 'first_degree_hx', 'age_menarche', 
 'age_first_birth', 'menopaus', 'bmi_group', 'biophx', 
 'current_hrt', 'breast_cancer_history']
'''
def preprocessDataAndPredict(age, relative, age_menarche, age_first_birth, menopause, bmi, biophx, current_hrt):
    
    #keep all inputs in array
    test_data = [age, relative, age_menarche, age_first_birth, menopause, bmi, biophx, current_hrt]
    
    #convert value data into numpy array
    test_data = np.array(test_data)
    print(test_data)
    
    #reshape array
    test_data = test_data.reshape(1,-1)
    
    #open file
    file = open("randomforest_model.pkl","rb")
    
    #load trained model
    trained_model = joblib.load(file)
    
    #predict
    #prediction = trained_model.predict(test_data)
    prediction = trained_model.predict_proba(test_data)
    print(prediction)
    print("type", type(prediction[0]))
    print("type", prediction[0].shape)
    res = round(prediction[0, 1], 2)
    
    return round(res*100) 
    
    pass

if __name__ == '__main__':
    app.run(debug=True)
