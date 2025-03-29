import sys
import json

def process_frame():
    for line in sys.stdin:
        data = json.loads(line)
        frame = data.get('frame', '')
        print(frame)  # This will print the base64 string
        sys.stdout.flush()

if __name__ == "__main__":
    process_frame()