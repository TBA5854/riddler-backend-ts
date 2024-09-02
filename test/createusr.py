import requests
import json
# creates user -> joins team

def new_func(a):
    url = "http://localhost:3000/signup"
    payload = json.dumps({
  "username": f"TBA123{a}",
  "password": "12345678",
  "email": f"TBA123{a}@gmail.com",
  "description": "Hi I'm TBA58541",
  "admin": True
})
    headers = {
  'Content-Type': 'application/json',
  'Cookie': 'X-Auth-Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhM2ExN2JlOTc5ZWFjOGJlNzFhYzkyIiwiaWF0IjoxNzIxOTk5NzM5fQ.Wz7pD8kBpGV7FQCYq-u_Wj8P5CQdYPJOcD9m3TjS4Fs'
}

    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    tkn=str(response.text).split('"')[3]
    print(tkn)
    url = "http://localhost:3000/join/team1"

    payload = json.dumps({
      "otp": 1890
    })
    headers = {
      'Content-Type': 'application/json',
      'Cookie': 'X-Auth-Token='+tkn
    }

    response = requests.request("POST", url, headers=headers, data=payload)  

    print(response.text)
for i in range(1, 6):
    new_func(i)
