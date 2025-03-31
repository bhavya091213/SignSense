# SignSense
SignSense is an AI tool that converts gestures to speech.

# Problem We Tackled
- A fractionally small population of the United States is deaf, and ASL isn’t taught as widely as other languages. 
- Online services such as Zoom have no support for deaf people other than typing, which is slower than signing

# How it works:
- The users camera is sent via websocket stream encoded with base64 to the backend
- The backend script spawns a python process which extracts the key points over a 30 frame time period
- A prediction is made based on the transformations over those key points via a fully custom fabricated LSTM
- The predictions are concatenated together to form a sentence
- The sentence is processed by an LLM to fix any grammar and punctuation issues
- The revised sentence is passed to a text to speech AI which returns a .wav file

# Frontend
![frontend](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/348/961/datas/original.png)

# Backend
![image](https://github.com/user-attachments/assets/63ab7d58-c0e8-489e-af82-0c5960c8b5c8)
