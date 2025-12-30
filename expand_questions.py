# Script to expand questions.json with all Grammar and Vocabulary questions
import json

# Load current questions
with open('questions.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find Grammar section
grammar_section = next(t for t in data['questionTypes'] if t['id'] == 'grammar')

# Add Unit 1 Grammar: Adverbs of frequency
grammar_section['questionGroups'].append({
    "id": "u1_grammar_adverbs",
    "unit": "Unit 1: All About Me",
    "title": "Adverbs of Frequency",
    "instructions": "Rewrite the sentences using the adverbs.",
    "questions": [
        {
            "id": "u1_adv_q1",
            "question": "I get up at 6 a.m. (every morning)",
            "type": "fill-in",
            "answer": "I get up at 6 a.m. every morning",
            "explanation": "Place time expressions at the end of the sentence."
        },
        {
            "id": "u1_adv_q2",
            "question": "It's easy for me to make new friends. (usually)",
            "type": "fill-in",
            "answer": "It's usually easy for me to make new friends",
            "explanation": "Usually comes before the main verb or after 'to be'."
        },
        {
            "id": "u1_adv_q3",
            "question": "Kevin goes to his chess club. (once a week)",
            "type": "fill-in",
            "answer": "Kevin goes to his chess club once a week",
            "explanation": "Frequency expressions go at the end."
        },
        {
            "id": "u1_adv_q4",
            "question": "Lena goes to the gym. (a lot)",
            "type": "fill-in",
            "answer": "Lena goes to the gym a lot",
            "explanation": "'A lot' goes at the end of the sentence."
        },
        {
            "id": "u1_adv_q5",
            "question": "I forget to do my homework. (rarely)",
            "type": "fill-in",
            "answer": "I rarely forget to do my homework",
            "explanation": "Rarely comes before the main verb."
        },
        {
            "id": "u1_adv_q6",
            "question": "They are pleased to see me. (always)",
            "type": "fill-in",
            "answer": "They are always pleased to see me",
            "explanation": "Always comes after 'to be'."
        }
    ]
})

# Add Unit 2 Grammar: Past Simple
grammar_section['questionGroups'].append({
    "id": "u2_grammar_past",
    "unit": "Unit 2: Memory",
    "title": "Past Simple",
    "instructions": "Write the past tense form of the verbs.",
    "questions": [
        {"id": "u2_past_q1", "question": "have →", "type": "fill-in", "answer": "had", "explanation": "Irregular verb"},
        {"id": "u2_past_q2", "question": "study →", "type": "fill-in", "answer": "studied", "explanation": "Regular verb: y → ied"},
        {"id": "u2_past_q3", "question": "hate →", "type": "fill-in", "answer": "hated", "explanation": "Regular verb: add -d"},
        {"id": "u2_past_q4", "question": "forget →", "type": "fill-in", "answer": "forgot", "explanation": "Irregular verb"},
        {"id": "u2_past_q5", "question": "plan →", "type": "fill-in", "answer": "planned", "explanation": "Double the consonant + ed"},
        {"id": "u2_past_q6", "question": "relax →", "type": "fill-in", "answer": "relaxed", "explanation": "Regular verb: add -ed"},
        {"id": "u2_past_q7", "question": "drink →", "type": "fill-in", "answer": "drank", "explanation": "Irregular verb"},
        {"id": "u2_past_q8", "question": "take →", "type": "fill-in", "answer": "took", "explanation": "Irregular verb"}
    ]
})

# Add Unit 3 Grammar: Past Simple and Past Continuous
grammar_section['questionGroups'].append({
    "id": "u3_grammar_past_cont",
    "unit": "Unit 3: Food for Thought",
    "title": "Past Simple and Past Continuous",
    "instructions": "Choose the correct option.",
    "questions": [
        {
            "id": "u3_pc_q1",
            "question": "She didn't check her phone while she ________ breakfast.",
            "type": "multiple-choice",
            "options": ["was eating", "ate"],
            "answer": "was eating",
            "explanation": "Use past continuous for the longer background action."
        },
        {
            "id": "u3_pc_q2",
            "question": "Was she working as a chef when you both ________?",
            "type": "multiple-choice",
            "options": ["met", "were meeting"],
            "answer": "met",
            "explanation": "Use past simple for the shorter completed action."
        },
        {
            "id": "u3_pc_q3",
            "question": "They were running when they ________ her in the street.",
            "type": "multiple-choice",
            "options": ["saw", "were seeing"],
            "answer": "saw",
            "explanation": "Use past simple for the interrupting action."
        }
    ]
})

# Add Unit 3 Grammar: Indefinite Pronouns
grammar_section['questionGroups'].append({
    "id": "u3_grammar_pronouns",
    "unit": "Unit 3: Food for Thought",
    "title": "Indefinite Pronouns",
    "instructions": "Choose the correct option.",
    "questions": [
        {
            "id": "u3_ip_q1",
            "question": "Did you buy ________ at the market?",
            "type": "multiple-choice",
            "options": ["anything", "nobody"],
            "answer": "anything",
            "explanation": "Use 'anything' in questions."
        },
        {
            "id": "u3_ip_q2",
            "question": "Would you like ________ to drink?",
            "type": "multiple-choice",
            "options": ["something", "somebody"],
            "answer": "something",
            "explanation": "Use 'something' in offers."
        },
        {
            "id": "u3_ip_q3",
            "question": "I want a big party with ________ there.",
            "type": "multiple-choice",
            "options": ["everyone", "nobody"],
            "answer": "everyone",
            "explanation": "'Everyone' means all people."
        },
        {
            "id": "u3_ip_q4",
            "question": "________ knew the answer to that question.",
            "type": "multiple-choice",
            "options": ["Nobody", "Anybody"],
            "answer": "Nobody",
            "explanation": "'Nobody' means no person."
        }
    ]
})

# Add Unit 4 Grammar: Future Plans
grammar_section['questionGroups'].append({
    "id": "u4_grammar_future",
    "unit": "Unit 4: Goals and Ambition",
    "title": "Future Plans (going to & Present Continuous)",
    "instructions": "Choose the best option.",
    "questions": [
        {
            "id": "u4_fut_q1",
            "question": "A: Do you have any plans for the summer?\nB: Yes, I've decided ________ my sister.",
            "type": "multiple-choice",
            "options": ["I'm going to visit", "I'm visiting"],
            "answer": "I'm going to visit",
            "explanation": "Use 'going to' for decisions already made."
        },
        {
            "id": "u4_fut_q2",
            "question": "He ________ to study at university next year.",
            "type": "multiple-choice",
            "options": ["is going", "'s going to study"],
            "answer": "'s going to study",
            "explanation": "Use 'going to' for future plans."
        }
    ]
})

# Add Unit 4 Grammar: will and won't
grammar_section['questionGroups'].append({
    "id": "u4_grammar_will",
    "unit": "Unit 4: Goals and Ambition",
    "title": "Will and Won't",
    "instructions": "Complete with will/won't and the verbs.",
    "questions": [
        {
            "id": "u4_will_q1",
            "question": "B: I ________ some on the way home. (get)",
            "type": "fill-in",
            "answer": "'ll get",
            "explanation": "Use 'will' for spontaneous decisions."
        },
        {
            "id": "u4_will_q2",
            "question": "B: OK. I ________ a look. (have)",
            "type": "fill-in",
            "answer": "'ll have",
            "explanation": "Will + base form of verb."
        },
        {
            "id": "u4_will_q3",
            "question": "A: I ________ the fridge. (check)",
            "type": "fill-in",
            "answer": "'ll check",
            "explanation": "Will for immediate future action."
        },
        {
            "id": "u4_will_q4",
            "question": "B: Don't worry. I ________! (not forget)",
            "type": "fill-in",
            "answer": "won't forget",
            "explanation": "Won't = will not."
        }
    ]
})

# Add Unit 5 Grammar: Comparatives and Superlatives
grammar_section['questionGroups'].append({
    "id": "u5_grammar_comp",
    "unit": "Unit 5: Home and Away",
    "title": "Comparatives and Superlatives",
    "instructions": "Choose the correct option.",
    "questions": [
        {
            "id": "u5_comp_q1",
            "question": "This book is ________ than the film.",
            "type": "multiple-choice",
            "options": ["more interesting", "interestinger", "most interesting"],
            "answer": "more interesting",
            "explanation": "Long adjectives use 'more' for comparative."
        },
        {
            "id": "u5_comp_q2",
            "question": "She's ________ student in the class.",
            "type": "multiple-choice",
            "options": ["the best", "better", "good"],
            "answer": "the best",
            "explanation": "Use superlative 'the best' for the highest degree."
        },
        {
            "id": "u5_comp_q3",
            "question": "This flat is ________ than our old house.",
            "type": "multiple-choice",
            "options": ["more expensive", "expensiver", "most expensive"],
            "answer": "more expensive",
            "explanation": "Long adjectives use 'more' for comparative."
        }
    ]
})

# Find Vocabulary section
vocab_section = next(t for t in data['questionTypes'] if t['id'] == 'vocabulary')

# Add Unit 2 Vocabulary: School Subjects
vocab_section['questionGroups'].append({
    "id": "u2_vocab_subjects",
    "unit": "Unit 2: Memory",
    "title": "School Subjects",
    "questions": [
        {
            "id": "u2_sub_q1",
            "question": "I'm terrible at ________. I have to use my phone to add most bills.",
            "type": "multiple-choice",
            "options": ["maths", "geography", "history"],
            "answer": "maths",
            "explanation": "Maths involves calculations and numbers."
        },
        {
            "id": "u2_sub_q2",
            "question": "I'd love to join ________ club. I think I'm a good actor!",
            "type": "multiple-choice",
            "options": ["an art", "a drama", "a PE"],
            "answer": "a drama",
            "explanation": "Drama club is for acting."
        },
        {
            "id": "u2_sub_q3",
            "question": "I'm good at ________ because I travelled a lot as a child.",
            "type": "multiple-choice",
            "options": ["geography", "history", "chemistry"],
            "answer": "geography",
            "explanation": "Geography is about places around the world."
        }
    ]
})

# Add Unit 3 Vocabulary: Food
vocab_section['questionGroups'].append({
    "id": "u3_vocab_food",
    "unit": "Unit 3: Food for Thought",
    "title": "Food Vocabulary",
    "questions": [
        {
            "id": "u3_food_q1",
            "question": "This cake is ________. I love the cream on the top.",
            "type": "multiple-choice",
            "options": ["delicious", "vegan", "raw"],
            "answer": "delicious",
            "explanation": "Delicious means very tasty."
        },
        {
            "id": "u3_food_q2",
            "question": "Do you have any ________? Maybe to peanuts, eggs or seafood?",
            "type": "multiple-choice",
            "options": ["allergies", "dishes", "recipes"],
            "answer": "allergies",
            "explanation": "Allergies are bad reactions to certain foods."
        },
        {
            "id": "u3_food_q3",
            "question": "The restaurant ________ amazing pasta dishes.",
            "type": "multiple-choice",
            "options": ["serves", "prepares", "cooks"],
            "answer": "serves",
            "explanation": "Restaurants 'serve' food to customers."
        }
    ]
})

# Add Unit 4 Vocabulary: Motivation
vocab_section['questionGroups'].append({
    "id": "u4_vocab_motivation",
    "unit": "Unit 4: Goals and Ambition",
    "title": "Motivation Words",
    "questions": [
        {
            "id": "u4_mot_q1",
            "question": "The teacher gave me ________ for my good work.",
            "type": "multiple-choice",
            "options": ["praise", "punishment", "challenge"],
            "answer": "praise",
            "explanation": "Praise means positive feedback."
        },
        {
            "id": "u4_mot_q2",
            "question": "My parents always ________ me to try new things.",
            "type": "multiple-choice",
            "options": ["encourage", "punish", "reward"],
            "answer": "encourage",
            "explanation": "Encourage means to give support and confidence."
        },
        {
            "id": "u4_mot_q3",
            "question": "She won first ________ in the competition.",
            "type": "multiple-choice",
            "options": ["prize", "reward", "purpose"],
            "answer": "prize",
            "explanation": "A prize is an award for winning."
        }
    ]
})

# Save expanded questions
with open('questions_expanded.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Count total questions
total = sum(len(g['questions']) for t in data['questionTypes'] for g in t['questionGroups'])
print(f"✅ Expanded to {total} total questions!")
print(f"   - Reading: {sum(len(g['questions']) for g in data['questionTypes'][0]['questionGroups'])}")
print(f"   - Grammar: {sum(len(g['questions']) for g in data['questionTypes'][1]['questionGroups'])}")
print(f"   - Vocabulary: {sum(len(g['questions']) for g in data['questionTypes'][2]['questionGroups'])}")
