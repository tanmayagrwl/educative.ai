import { Textarea } from '@/components/ui/textarea';
import ky from 'ky';
import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { toast } from 'sonner';
import { Button } from './ui/button';

const getSummary = async (content: string) => {
  const resp = await ky.post(
    `${import.meta.env.VITE_BASE_URL}/describe`,
    {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      timeout: false,
    }
  );
  const data = (await resp.json()) as { description: string };
  return data.description;
};

function DoubtSolver() {
  const [micOn, setMicOn] = useState(true);
  const handleClick = () => {
    setMicOn(!micOn);
  };

  const description_toast = 'description-toast';

  const [description, setDescription] = useState('');
  const [relatedTopics, setRelatedTopics] = useState<string>('');
  const [ktranscript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSubmit = async () => {
    toast.loading('Summarizing...', { id: description_toast });
    const [description, topics] = await Promise.all([
      getSummary(ktranscript),
      getSummary(
        `Get me some topics related as bullet points to ${ktranscript}`
      ),
    ]);
    setDescription(description);
    setRelatedTopics(topics);
    toast.dismiss(description_toast);
  };

  return (
    <div className="w-full flex  h-full pt-16">
      <div className=" flex flex-col lg:flex-row items-center w-full p-4 gap-x-4 overflow-scroll">
        <div className="h-full w-full p-4 bg-gray-100 rounded-2xl px-4   flex-[3] flex-col gap-4">
          <div className="flex flex-col h-[90%] lg:h-[45%]  w-full bg-gray-300 rounded-2xl">
            <div className="w-full bg-gray-200 p-2 rounded-t-2xl flex justify-between">
              Transcription
              <div className="flex gap-4">
                {listening ? (
                  <Button
                    onClick={() => {
                      SpeechRecognition.stopListening();
                      handleClick();
                    }}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      SpeechRecognition.startListening();
                      handleClick();
                    }}
                  >
                    Start
                  </Button>
                )}
                <Button onClick={resetTranscript}>Reset</Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
            <div className="p-4 bg-transparent outline-none">
              {transcript || 'Start speaking to get the result'}
            </div>
          </div>
          <div className="flex h-[90%] lg:h-[50%] w-full justify-between mt-9 rounded-2xl ">
            <div className="w-[48%] h-full bg-gray-300 rounded-2xl overflow-scroll">
              <div className="w-full bg-gray-200 p-2 rounded-t-2xl flex justify-between">
                {' '}
                Answer description
              </div>
              <div className="p-4">
                {description || 'Start speaking to get the result'}
              </div>
            </div>
            <div className="w-[48%] h-full bg-gray-300 rounded-2xl overflow-scroll">
              <div className="w-full bg-gray-200 p-2 rounded-t-2xl flex justify-between">
                {' '}
                Related Topics
              </div>
              <div className="p-4">
                {relatedTopics || 'Start speaking to get the result'}
              </div>
            </div>
          </div>
        </div>

        <div className="h-full  w-full bg-gray-100 rounded-2xl  flex-1 ">
          <div className=" bg-gray-200 p-2 rounded-t-2xl flex justify-between">
            {' '}
            Write your notes
          </div>
          <div className="p-2  flex items-center justify-center  flex-col gap-2">
            <Textarea
              className="p-2 h-[70vh]"
              value={notes}
              onChange={e => {
                setNotes(e.currentTarget.value);
              }}
            />
            <Button
              className="w-16"
              onClick={() => {
                const blob = new Blob([notes], { type: 'text/plain' });

                const downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.download = 'notes.txt';
                downloadLink.click();

                window.URL.revokeObjectURL(downloadLink.href);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoubtSolver;
