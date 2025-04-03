
from fuzzywuzzy import process
import spacy

# Load the English language model
nlp = spacy.load("en_core_web_sm")



def correct_sentence(sentence, agriculture_keywords):
    doc = nlp(sentence)
    corrected_sentence = []
    for token in doc:
        # Check if the token is a misspelled word
        if token.text.lower() not in agriculture_keywords and token.is_alpha and not token.is_stop:
            # Find the closest match from agriculture_keywords using fuzzywuzzy
            closest_match, _ = process.extractOne(token.text.lower(), agriculture_keywords)
            # If similarity is above a threshold, replace with the closest match, otherwise keep the original word
            if process.extractOne(token.text.lower(), agriculture_keywords)[1] > 70:
                corrected_sentence.append(closest_match)
            else:
                corrected_sentence.append(token.text)
        else:
            corrected_sentence.append(token.text)
    return " ".join(corrected_sentence)



