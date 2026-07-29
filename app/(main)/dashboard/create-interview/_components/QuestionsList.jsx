import axios from 'axios';
import React from 'react'
import QuestionListContainer from './QuestionListContainer';
import { toast } from 'sonner';
import { Loader2, LoaderIcon } from 'lucide-react';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/app/provider';

function QuestionsList({ formData, GoToNext, onInterviewCreated }) {

    const [loading, setLoading] = React.useState(true);
    const [questionList, setQuestionList] = React.useState([]);
    const { user } = useUser();
    const [saveLoading, setSaveLoading] = React.useState(false);

    React.useEffect(() => {
        if (formData) {
            GenerateQuestionList();
        }
    }, [formData]);

    const onFinish = async () => {
        console.log("TRIPWIRE: The finish button was definitely clicked!");
        const interview_id = uuidv4();
        setSaveLoading(true);
        try {
            const { data, error } = await supabase
                .from('Interview')
                .insert([
                    {
                        jobTitle: formData.jobTitle,
                        jobDescription: formData.jobDescription,
                        interviewDuration: formData.interviewDuration,
                        type: formData.interviewType?.join(", "),
                        questionList: questionList,
                        userEmail: user?.Email,
                        interview_id: interview_id
                    }
                ])
                .select();
                const userUpdate = await supabase
                .from('Users')
                .update({ Credits: Number(user?.Credits) - 1 })
                .eq( 'userEmail', user?.Email)
                .select();
                console.log("Supabase User Update Result:", userUpdate);

            if (error) {
                console.error("Supabase Error:", error);
                toast("Failed to save interview. Please try again.");
                return;
            }

            console.log("Supabase Insert Result:", data);
            // Send the real interview_id up to page.jsx
            onInterviewCreated(interview_id);
            // Now advance to step 3
            GoToNext();

        } catch (err) {
            console.error("Unexpected error:", err);
            toast("Something went wrong. Please try again.");
        } finally {
            setSaveLoading(false);
        }
    };

    const GenerateQuestionList = async () => {
        setLoading(true);
        try {
            const result = await axios.post("/API/ai-model", { ...formData });
            const rawContent = result.data.questions?.content;
            const jsonString = rawContent.substring(rawContent.indexOf("["));
            const Content = JSON.parse(jsonString);
            setQuestionList(Content);
        } catch (error) {
            toast("Server error while generating question list. Please try again later.");
            console.error("Error generating question list:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && (
                <div className='mt-5 p-5 bg-card rounded-xl border border-border flex items-center gap-3'>
                    <LoaderIcon className='animate-spin text-primary' />
                    <div>
                        <h2 className='font-medium text-foreground'>Generating Questions...</h2>
                        <p className='text-primary'>This may take a moment. Please wait.</p>
                    </div>
                </div>
            )}

            {questionList.length > 0 &&
                <div>
                    <QuestionListContainer questionList={questionList} />
                </div>
            }

            {!loading && questionList.length > 0 && (
                <div className='flex justify-end mt-5'>
                    <button
                        type='button'
                        className='bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors'
                        onClick={onFinish}
                        disabled={saveLoading}
                    >
                        {saveLoading && <Loader2 className='animate-spin w-4 h-4' />} Finish
                    </button>
                </div>
            )}
        </div>
    );
}

export default QuestionsList;