import React,{useState} from 'react'
import MorphingText from './eldoraui/morphingtext'
import { Send, Upload, Volume2 } from 'lucide-react'
import Input from './ui/Input'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const ChatSupport = () => {
    const texts = [
        "Chat Support",
        "AI Chatbot",
        "24/7 Assistance",
        "Instant Help",
        "Farming Solutions",
        "Expert Guidance",
    ]
    const [chat, setchat] = useState(false)
    const [messages, setmessages] = useState<Array<{type:'user' | 'assistant'; content :string}>>([]);
    const handleFileUpload = (e:React.FormEvent) =>{
        e.preventDefault();
        setchat(true);
        setmessages([
            {type: 'assistant', content: 'Hello! I\'m here to help you with your agricultural queries. What would you like to know?'}
        ])
    }
    const handleChatSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const query = (form.elements.namedItem('query') as HTMLTextAreaElement).value;
        if (query.trim()) {
            setMessages(prev => [...prev, 
              { type: 'user', content: query },
              { type: 'assistant', content: 'I understand your question about farming. Let me help you with that...' }
            ]);
            form.reset();
          }
        }; 
  return (
    <div className='max-w-4xl mx-auto p-6'>
        <div className='text-center mb-8'>
            <h1 className='text-4xl font-[700] text-gray-100 mb-2'>
                <MorphingText texts={texts} />
            </h1>
            <p className="font-[700] text-gray-50 text-3xl py-2">A Smart Companion for Plant Care and Farming</p>
            <div className="text-xl font-serif italic text-gray-50 mt-4">🌱 Helping Farmers Grow Smarter</div>
        </div>
        {!chat ? (
            <div className='bg-white rounded-xl shadow-lg p-8'>
                 <h2 className="text-2xl font-semibold text-green-700  mb-6">Upload Image or Document</h2>
                 <form onSubmit={handleFileUpload} className='space-y-6'>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-2'>
                            <Upload className='inline mr-2 h-5 w-5'/>
                            Choose a PDf Document
                        </label>
                        <Input 
                        type='file'
                         />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your query:
                    </label>
                    <Textarea placeholder='"Ask about the uploaded file...' 
                    name="query"
                    rows={3}
                    required/>
                    <Button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                         <Upload className="mr-2 h-5 w-5" />
                         Upload & Ask
                    </Button>
                    </div>
                 </form>
            </div>
        ) : (
            <div className='bg-white rounded-xl shadow-lg p-8'>
                <h2 className="text-2xl font-semibold text-gray-50 mb-6">Chat with Assistant</h2>
                <div className="h-[400px] overflow-y-auto mb-6 space-y-4 p-4 border border-gray-200 rounded-lg">
                    {messages.map((message,index) =>(
                        <div key={index}
                        className={`flex  ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-4 rounded-lg ${
                        message.type === 'user'
                      ? 'bg-green-100 text-green-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className='flex items-center gap-2'>
                    <p>{message.content}</p>
                    {message.type === 'assistant' && (
                      <Button
                        className="ml-2 p-2 text-gray-600 hover:text-green-600 transition-colors"
                        title="Play Audio"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                    </div>
                  </div>
                        </div>
                    ))}
                </div>
                <form action="" onSubmit={handleChatSubmit}  className="space-y-4">
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-2'>
                        Enter your query:
                        </label>
                        <Textarea placeholder="Ask a follow-up question..."
                        name="query"
                        rows={3}
                        required/>
                    </div>
                    <Button 
                     type="submit"
                     className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                        <Send  className="mr-2 h-5 w-5"/>
                        Bhejo Message
                     </Button>
                </form>
            </div>
        )}

    </div>
  )
}

export default ChatSupport