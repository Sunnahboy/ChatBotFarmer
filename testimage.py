import google.generativeai as genai
import PIL.Image
import os
api_key = os.getenv('GENAI_API_KEY1')

def process_image_and_generate_content(image_file):
    try:
        genai.configure(api_key=api_key)
        # Initialize the GenerativeModel with the correct model name
        model = genai.GenerativeModel('gemini-1.5-pro-latest')

        # Open the image using PIL
        img = PIL.Image.open(image_file)

        # Generate content based on prompts
        response = model.generate_content(["If the image depicts agricultural scenes, "
                                           "you can describe it and then discuss these action "
                                           "steps to help the farmer improve their crops. If not related to agriculture,"
                                           " you could respond with, This image doesn't seem to be related to agriculture."
                                           " Could you provide another?" , img])

        # Return the generated content as a dictionary with the description
        text = {'description': response.text}
        return text
    except Exception as e:
        # In case of any error, return an error message
        return {'error': str(e)}
