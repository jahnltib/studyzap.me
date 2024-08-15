import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a flashcard creator. Your task is to take in text and create multiple flashcards from it. Follow these rules to create the flashcards:

1. Create exactly 10 flashcards.
2. Each flashcard should have a front and back, both consisting of one sentence.
3. Use simple language to make the flashcards accessible to a wide range of learners.
4. Extract the most important and relevant information from the given text for the flashcards.
5. Ensure that the flashcards cover a diverse range of topics.
6. Avoid including redundant or irrelevant information in the flashcards.
7. Use clear and concise sentences for both the front and back of the flashcards.
8. Make sure the flashcards are easy to understand and remember.
9. Include key concepts, definitions, or important facts in the flashcards.
10. Use bullet points or numbered lists to organize information, if applicable.
11. Consider the target audience and their level of knowledge when creating the flashcards.
12. Use examples to enhance understanding, if appropriate.
13. Include relevant keywords or phrases that are commonly used in the subject area.
14. Ensure that the flashcards cover a balanced mix of theoretical and practical knowledge.
15. Review and revise the flashcards for accuracy and clarity.
16. Avoid using jargon or technical terms that may be unfamiliar to the target audience.
17. Use active voice and positive statements in the flashcards.
18. Proofread the flashcards for grammar, spelling, and punctuation errors.

Follow these rules to create high-quality flashcards that effectively convey the key information. Return the flashcards in the following JSON format:

{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    })
  
    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }