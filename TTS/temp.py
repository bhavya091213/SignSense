from gradio_client import Client, handle_file

# Initialize the client with the Gradio server URL
client = Client("http://127.0.0.1:7860/")

# Define the text input and other parameters
#
text_input = "Hello, this is a test of the Gradio text-to-speech API."
language_code = "en-us"

# FIND SOME REFERENCE VOICE
speaker_audio_url = 'https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav'

# USE INCLUDED FILE
prefix_audio_url = 'https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav'

# Call the API to generate the audio
result = client.predict(
    model_choice="Zyphra/Zonos-v0.1-transformer",
    text=text_input,
    language=language_code,
    speaker_audio=handle_file(speaker_audio_url),
    prefix_audio=handle_file(prefix_audio_url),
    e1=1,
    e2=0.05,
    e3=0.05,
    e4=0.05,
    e5=0.05,
    e6=0.05,
    e7=0.1,
    e8=0.2,
    vq_single=0.78,
    fmax=24000,
    pitch_std=45,
    speaking_rate=15,
    dnsmos_ovrl=4,
    speaker_noised=False,
    cfg_scale=2,
    top_p=0,
    top_k=0,
    min_p=0,
    linear=0.5,
    confidence=0.4,
    quadratic=0,
    seed=420,
    randomize_seed=True,
    unconditional_keys=["emotion"],
    api_name="/generate_audio"
)

# Print the result
print(result)

# The result contains the file path to the generated audio and the seed used
generated_audio_path = result[0]
seed_used = result[1]

print(f"Generated audio file: {generated_audio_path}")
print(f"Seed used: {seed_used}")
