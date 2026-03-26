import axios from 'axios';
import React, { use } from 'react'
import QuestionListContainer from './QuestionListContainer';
import { toast } from 'sonner';
import { Loader2, LoaderIcon } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/app/provider';

function QuestionsList({formData}) {

    const [loading, setLoading] = React.useState(true);
    const [questionList, setQuestionList] = React.useState([]);
    const {user} = useUser();
    const [saveLoading, setSaveLoading] = React.useState(false);
    const [interview_id, setInterviewId] = React.useState();

    React.useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData]);

    const onFinish = async() => {
        const interview_id = uuidv4();
        setSaveLoading(true);
        console.log("User:", user);
        console.log("FormData:", formData);
        console.log("QuestionList:", questionList);  
 
        const { data, error } = await supabase
        .from('Interview')
        .insert([
            {
            jobTitle: formData.jobTitle,
            jobDescription: formData.jobDescription,  // note: typo in your DB column
            interviewDuration: formData.interviewDuration,
            type: formData.interviewType?.join(", "),
            questionList: questionList,
            userEmail: user?.Email,
            interview_id: interview_id
            }
        ])
        .select()
        
        console.log("Supabase Insert Result:", data);
        console.log("Supabase Error:", error);
        setSaveLoading(false);
    }       
    
    const onCreateLink = (interview_id) => {
        setInterviewId(interview_id);
        setStep(step+1);
        // You can also navigate to the interview page here if needed
    }  
    const GenerateQuestionList = async() => {
        setLoading(true);
        try{
        const result = await axios.post("/API/ai-model",{
            ...formData
        })
        console.log("RESULT", result.data );
        const rawContent = result.data.questions?.content;
        console.log("Raw Content:", rawContent);

    
        const jsonString = rawContent.substring(rawContent.indexOf("["));
        const Content = JSON.parse(jsonString);

        setQuestionList(Content);
        setLoading(false);
        } catch (error) {
            toast("Server error while generating question list. Please try again later.");
            console.error("Error generating question list:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            {loading && <div className='mt-5 p-5 bg-blue-50 rounded-xl border border-gray-100 border-primary flex items-center gap-3'>
                <LoaderIcon className='animate-spin' />
                <div>
                <h2 className='font-medium'>Generating Questions...</h2>
                <p className='text-primary'>This may take a moment. Please wait.</p>
                </div>
                </div>}

                {questionList.length > 0 && 
                    <div>
                        <QuestionListContainer questionList={questionList} />
                    </div>
                }
                
                {!loading && questionList.length > 0 && (
                    <div className='flex justify-end mt-5'>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={() => onFinish()} disabled={saveLoading(true)} onCreateLink={(interview_id) => onCreateLink(interview_id)}>
                            {saveLoading && <Loader2 className='animate-spin'/>} Finish
                        </button>
                    </div>
                )}
        </div>
    )
}

export default QuestionsList