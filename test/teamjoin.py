import requests
import json

url = "http://localhost:3000/login"
a=""
def new_func(url, a):
    a=str(a)[1:]
    payload = json.dumps({
  "password": "12345678",
  "email": "TBA"+a+"@gmail.com"
})
    headers = {
  'Content-Type': 'application/json',
  'Cookie': 'X-Auth-Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhM2ExN2JlOTc5ZWFjOGJlNzFhYzkyIiwiaWF0IjoxNzIyMDAxNTU3fQ.8d7K-mYkNQrjnqjO68ital1qZMIvZs2knu8IVGGsLK0'
}

    response = requests.request("POST", url, headers=headers, data=payload)
    return response

for i in [1,11,112,1123,11234,11234]:
    response = new_func(url, i)

    print(response.text)
