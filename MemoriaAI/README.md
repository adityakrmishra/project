# MemoriaAI Library (GPT with Long-term Memory)

**MemoriaAI** is a JavaScript library designed for interfacing with the MemoriaAI system, which leverages OpenAI's powerful GPT-3.5 model for chat completions and Pinecone for efficient indexing and retrieval of chat history. This library simplifies the process of creating conversational agents that can remember and respond to previous interactions intelligently.

This library tries to mimic a memory between the system and user beyond a conversation, or simply put, a pseudo-memory.

## Installation

To use MemoriaAI in your JavaScript project, you can install it using npm or yarn:

```shell
npm install @adityakrmishra/projects/memoriaAI
# or
yarn add @adityakrmishra/projects/memoriaAI
```
### Initialization
1 Import the library into your project:
```shell
import MemoriaAI from '@adityakrmishra/projects/memoriaAI';
```
2 Create an instance of the MemoriaAI client by providing your OpenAI API Key and Pinecone API Key:
```shell
const memoriaai = new MemoriaAI({
    openAIAPIKey: 'YOUR_OPENAI_API_KEY',
    pinecone: {
        environment: 'YOUR_PINECONE_ENVIRONMENT',
        apiKey: 'YOUR_PINECONE_API_KEY'
    },
    // Optionally, specify the initial OpenAI model (default: 'gpt-3.5-turbo-16k')
    model: 'gpt-3.5-turbo-16k',
});
```
### Usage
Sending Messages
You can use MemoriaAI to send messages in a conversation. Messages should be provided as an array of objects with a role and optional content:
```shell
const messages = [
  { role: 'user', content: 'Hello, MemoriaAI!' },
  { role: 'assistant', content: 'Hi there! How can I assist you?' },
];

const user = {
  uid: 'USER_ID', // Unique reference to the user interacting with the system
  firstName: 'John', // User's first name
};

const input = {
  messages,
  user,
};

// Get a response as a stream of chat chunks
const response = await memoria.getCompletionStream(input);

// The response by default is a stream
console.log(response);

```
### Notes
The MemoriaAI library facilitates intelligent conversations by remembering and referencing previous interactions.

Pinecone is used to efficiently index and retrieve chat history.

Remember to replace 'YOUR_OPENAI_API_KEY', 'YOUR_PINECONE_ENVIRONMENT', and 'YOUR_PINECONE_API_KEY' with your actual API keys.

You can customize the OpenAI model used by modifying the model property during client initialization.

And, feel free to pitch in ideas on how to improve this!
```shell
Does this look good? Any more tweaks you'd like to make?
```






















